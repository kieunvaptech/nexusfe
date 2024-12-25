import React, { useEffect } from "react";
import { FirstItem, LastItem, Next, Prev } from "components/atoms/icons/PaginationIcon";
import { PageNumber } from "components/atoms/PageNumber";
import { uniqueId } from "lodash-es";
import PageSelection from "components/atoms/PageSelection";

const pageBeforeCurrentIndex = 2; // số page có thẻ hiện thị trước trang hiện tại, vd: 1 2 [3]
const pageAfterCurrentIndex = 2; // số page có thẻ hiện thị sau trang hiện tại, vd: [3] 4 5

/** Phân trang
 * @param {number} totalItems Tổng số bản ghi
 * @param {number} pageSize Số bản ghi 1 page
 * @param {Function} setPageSize Function callback khi thay đổi pageSize
 * @param {number} pageIndex Index của trang, bắt đầu từ 1
 * @param {Function} setPageIndex Function callback khi thay đổi pageIndex
 *
 */

interface props {
  totalItems: number;
  pageSize: number;
  setPageSize: (arg: number) => void;
  pageIndex: number;
  setPageIndex: (arg: number) => void;
}

export const Pagination: React.FC<props> = ({ totalItems, pageSize, setPageSize, pageIndex, setPageIndex }) => {
  const [prev, setPrev] = React.useState(0);
  const [next, setNext] = React.useState(0);
  const [pages, setPages] = React.useState<number[]>([]);

  React.useEffect(() => {
    setPrev(pageIndex > 1 ? pageIndex - 1 : 1);
    setNext(pageSize * pageIndex < totalItems ? pageIndex + 1 : pageIndex);
    const _pages: number[] = [];
    // push giá trị page trước index hiện tại
    for (let i = pageBeforeCurrentIndex; i > 0; i--) {
      if (pageIndex > i) {
        _pages.push(pageIndex - i);
      }
    }
    _pages.push(pageIndex);

    // push giá trị page sau index hiện tại
    for (let i = 1; i <= pageAfterCurrentIndex; i++) {
      if ((pageIndex + i - 1) * pageSize < totalItems) {
        _pages.push(pageIndex + i);
      }
    }
    setPages(_pages);
  }, [pageIndex, pageSize, totalItems]);

  useEffect(() => {
    if (pageIndex !== 1) {
      setPageIndex(1);
    }
  }, [pageSize]);

  const totalPage = Math.ceil(totalItems / pageSize);

  if (!(totalItems && pageIndex && pageSize)) {
    return null;
  }

  return (
    <div className="h-[40px] flex justify-between flex-col items-end mb-4 gap-2 md:flex-row md:items-center md:!mb-0 md:gap-0">
      <div className="text-[#444] font-[500] select-none">
        {/* Tổng cộng {totalItems} bản ghi trên tổng số {totalPage} trang */}
      </div>
      <div className="h-[40px] flex gap-[10px]">
        <FirstItem onClick={() => setPageIndex(1)} disable={pageIndex === 1} />
        <Prev onClick={() => setPageIndex(prev)} disable={pageIndex === 1} />
        <div className="flex rounded-[4px] gap-[10px]">
          {pages &&
            pages.map((item, index) => {
              return (
                <PageNumber
                  key={uniqueId()}
                  num={item}
                  active={item === pageIndex}
                  onClick={() => setPageIndex(item)}
                />
              );
            })}
        </div>
        <Next onClick={() => setPageIndex(next)} disable={totalPage === 0 || pageIndex === totalPage} />
        <LastItem onClick={() => setPageIndex(totalPage)} disable={totalPage === 0 || pageIndex === totalPage} />
        {/* <PageSelection perPage={pageSize} onChangePerPage={setPageSize} /> */}
      </div>
    </div>
  );
};
