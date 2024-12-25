import React, { ReactElement } from "react";
import { BUTTON_TYPES } from "utils/Constants";

interface props {
  children: ReactElement | string;
  onClick: () => void;
  type: number;
  typeBtn?: string;
  size?: number | string;
  hide?: boolean;
  className?: string;
}

export const Button: React.FC<props> = ({
  children,
  onClick = () => {},
  type,
  typeBtn,
  size,
  hide = false,
  ...props
}) => {
  let className = `${
    props.className || ""
  } min-w-[120px] h-[36px] flex-center px-[15px] rounded-[5px] whitespace-nowrap select-none`;
  if (!type || type === BUTTON_TYPES.NORMAL) {
    className +=
      " bg-[#fff] border-[1.5px] border-[#A1A7AD] font-[500] text-[#444]" +
      " hover:text-[#40a9ff] hover:border-[#40a9ff] ";
  }
  if (type === BUTTON_TYPES.PRIMARY) {
    className += " bg-[#007BFF] font-[500] text-[#FFF] hover:bg-[#0168A5] ";
  }

  if (hide) {
    className = "hidden";
  }

  return (
    <button type="button" {...props} className={className} onClick={onClick}>
      {children}
    </button>
  );
};
