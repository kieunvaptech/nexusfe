import SearchIcon from "assets/icons/search-icon.svg";
import React from "react";

interface Props {
  onSearch: (keyword: string) => void;
}

const SearchHeader: React.FC<Props> = ({ onSearch }) => {
  const [keyword, setKeyword] = React.useState("");
  const handleSearch = (keyword: string) => {
    onSearch(keyword);
  };
  return (
    <div className="relative w-[calc(0.2*100vw)] hidden lg:block">
      <input
        className="w-full text-[14px] flex items-center pl-[11px] pr-[50px] overflow-hidden h-[40px] outline-none bg-[#e3e5e3] rounded-[20px]"
        placeholder="Tìm kiếm..."
        onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
          setKeyword(event.target.value);
        }}
        onKeyPress={(event: React.KeyboardEvent<HTMLInputElement>) => {
          if (event.key === "Enter") {
            handleSearch(keyword);
          }
        }}
      />
      <div className="absolute right-[16px] top-[9px] cursor-pointer">
        <img src={SearchIcon} alt="search-icon" title="Tìm kiếm" />
      </div>
    </div>
  );
};

export default SearchHeader;
