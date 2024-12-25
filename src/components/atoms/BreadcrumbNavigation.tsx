import React from "react";
import { useNavigate } from "react-router-dom";

type routeItem = {
  path?: string;
  label?: string;
};

interface Props {
  items: routeItem[];
}

export const Navigation: React.FC<Props> = ({ ...props }) => {
  const { items } = props;
  const navigate = useNavigate();
  const handleClickLink = (path: string) => {
    if (path) {
      navigate(path);
    }
  };
  return (
    <div className="ksdb-navi">
      {items.map((item, index) => {
        const isLast = items.length === index + 1;
        return !isLast ? (
          <span
            className="item"
            key={index}
            onClick={() => {
              item.path && handleClickLink(item.path);
            }}
          >{`${item.label}`}</span>
        ) : (
          <span key={index} className="last-item">
            {item.label}
          </span>
        );
      })}
    </div>
  );
};
