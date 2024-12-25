import React from "react";

interface Props {
  handleClick?: (arg: React.MouseEvent<HTMLElement>) => void;
}

export const RightArrowTable: React.FC<Props> = ({ handleClick }) => {
  return (
    <div
      onClick={handleClick}
      style={{
        display: "inline-block",
        marginRight: 10,
        cursor: "pointer",
      }}
    >
      <svg
        width="14"
        height="15"
        viewBox="0 0 14 15"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M10.9422 7.94211C10.9422 7.69121 10.8475 7.44033 10.6586 7.24903L4.71145 1.22934C4.33314 0.846406 3.71976 0.846406 3.3416 1.22934C2.96344 1.61211 2.96344 2.23285 3.3416 2.61581L8.60399 7.94211L3.34179 13.2685C2.96363 13.6514 2.96363 14.2721 3.34179 14.6548C3.71995 15.0379 4.33332 15.0379 4.71163 14.6548L10.6588 8.6352C10.8477 8.44381 10.9422 8.19293 10.9422 7.94211Z"
          fill="#444444"
        />
      </svg>
    </div>
  );
};
