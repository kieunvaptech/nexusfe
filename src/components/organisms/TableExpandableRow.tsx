import React from "react";
import ArrowTableIcon from "components/atoms/icons/table/ArrowTableIcon";
import { uniqueId } from "lodash-es";
import { useTranslation } from "react-i18next";
import ButtonIcon from "../atoms/ButtonIcon";

export const TableWithExpandableRow = (props: any) => {
  const items = props.items || [];
  const headers = props.headers || [];
  const [expandedList, setExpandedList] = React.useState<any[]>([]);
  const actions = props.actions || [];
  const { t } = useTranslation();
  React.useEffect(() => {
    const generateExpand = (items: any, level: number) => {
      items.forEach((i: any) => {
        i.level = level;
        if (i.children) {
          expandedList[i._id] = i.expanded || false;
          generateExpand(i.children, level + 1);
        }
      });
    };
    generateExpand(items, 1);
    setExpandedList({ ...expandedList });
  }, [items]);

  const bodyTabelRef = React.useRef<HTMLDivElement | null>(null);

  React.useEffect(() => {
    if (bodyTabelRef && bodyTabelRef.current) {
      bodyTabelRef.current.style.maxHeight =
        bodyTabelRef.current.scrollHeight + "px";
    }
  }, [expandedList]);

  // lấy tập properties
  const propsList = headers.map((i: any) => i.prop);
  const getHeaderByProp = (p: any) => {
    return headers.find((i: any) => i.prop === p) || {};
  };
  const resultData = (item: any) => {
    const result: any[] = [];
    propsList.forEach((k: any) => {
      if (Object.keys(item).includes(k)) {
        result.push(k);
      }
    });
    return result;
  };
  const renderRowCol = (item: any) => {
    const result = resultData(item);
    return result.map((r, i) => {
      const hasArrow = item.children.length > 0 && i === 0;
      const levelClassName = i === 0 ? `level-${item.level}` : ""; // thụt vào với dòng đầu tiên, tùy level
      return (
        <React.Fragment key={i}>
          <div
            className={`${getHeaderByProp(r).className || "w-full"} ${hasArrow ? "cursor-pointer" : ""} ${levelClassName} ${getHeaderByProp(r).prop !== "action" ? "body__row-col" : "body__row-action"} `}
          >
            {hasArrow ? <ArrowTableIcon /> : ""}{" "}
            {!hasArrow && i === 0 ? <div className="pr-[25px]" /> : ""}
            {getHeaderByProp(r).prop !== "action"
              ? item[r]
              : renderActionColumn(actions, item)}
          </div>
        </React.Fragment>
      );
    });
  };

  const handleClickRow = (item: any, expandedList: any) => {
    if (!item._id) {
      return;
    }
    expandedList[item._id] = !expandedList[item._id];
    setExpandedList({ ...expandedList });
  };

  const renderRow = (dataTable: any) => {
    return dataTable.map((item: any) => {
      const isExpanded = item.children && expandedList[item._id];
      return (
        <React.Fragment key={uniqueId()}>
          <div
            className={`body__row ${isExpanded ? "body__row-expanded" : ""}`}
            key={uniqueId()}
            onClick={() => handleClickRow(item, expandedList)}
          >
            {renderRowCol(item)}
          </div>
          {isExpanded && renderRow(item.children)}
        </React.Fragment>
      );
    });
  };

  const renderActionColumn = (button: any, dataItem: any) => {
    return (
      <div className="flex space-x-[10px] w-full flex-center">
        {button.map((item: any, i: number) => {
          return item.visible ? (
            <ButtonIcon
              key={i}
              handleOnClick={() => item.handleOnClick(item, dataItem)}
            >
              {item.icon()}
            </ButtonIcon>
          ) : null;
        })}
      </div>
    );
  };
  if (Object.keys(expandedList).length === 0) {
    return <></>;
  }
  return (
    <div className="min-w-[650px]">
      <div className="ksdb-expandable-row-table">
        <div className="header">
          <div className="header__row">
            {headers.map((item: any, i: number) => {
              return (
                <div
                  key={i}
                  className={`${item.className || "w-full"} header__row-col`}
                >
                  {t("TABLE." + item.title)}
                </div>
              );
            })}
          </div>
        </div>
        <div
          ref={bodyTabelRef}
          className="body transition transition-[max-height] duration-200"
        >
          {renderRow(items)}
        </div>
      </div>
    </div>
  );
};
