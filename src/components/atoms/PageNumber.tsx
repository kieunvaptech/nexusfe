import React from "react";

interface props {
  num: number;
  active: boolean;
  onClick: () => void;
}

export const PageNumber: React.FC<props> = (props) => {
  const { num, active, onClick } = props;

  return (
    <button
      className={`w-[36px] h-[36px] font-[700] bg-[#F8F9FA] flex-center text-[#444]
    hover:text-[#0F51AA] hover:bg-[#E5F0FA] hover:rounded-[4px] cursor-pointer select-none rounded-[4px]
    ${active ? "!text-white !bg-[#0066B2]" : ""}`}
      onClick={onClick}
    >
      {num}
    </button>
  );
};
