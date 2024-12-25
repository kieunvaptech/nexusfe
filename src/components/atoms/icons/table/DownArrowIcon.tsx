import React from "react";

interface Props {
  handleClick?: (arg: React.MouseEvent<HTMLElement>) => void;
}

export const DownArrowIcon: React.FC<Props> = ({ handleClick }) => {
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
        height="8"
        viewBox="0 0 14 8"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M7.00002 7.88418C7.25093 7.88418 7.50181 7.78953 7.6931 7.60063L13.7128 1.65347C14.0957 1.27515 14.0957 0.661781 13.7128 0.28362C13.33 -0.0945401 12.7093 -0.0945401 12.3263 0.28362L7.00002 5.546L1.67369 0.283804C1.29076 -0.0943563 0.670084 -0.0943563 0.287339 0.283804C-0.0957784 0.661965 -0.0957784 1.27534 0.287339 1.65365L6.30694 7.60082C6.49833 7.78974 6.74921 7.88418 7.00002 7.88418Z"
          fill="#444444"
        />
      </svg>
    </div>
  );
};
