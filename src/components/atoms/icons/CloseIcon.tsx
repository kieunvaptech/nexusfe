import React from "react";

interface Props {
  className?: string;
  onClick?: () => void;
  color?: string;
}
export const CloseIcon: React.FC<Props> = ({ className, onClick, color }) => {
  return (
    <div className={`ktnn-close ${className}`} onClick={onClick}>
      <svg
        width="10"
        height="10"
        viewBox="0 0 14 14"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M14 1.41L12.59 0L7 5.59L1.41 0L0 1.41L5.59 7L0 12.59L1.41 14L7 8.41L12.59 14L14 12.59L8.41 7L14 1.41Z"
          fill={color || "black"}
        />
      </svg>
    </div>
  );
};
