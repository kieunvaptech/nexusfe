import React, { ReactNode } from "react";

interface Props {
  children: ReactNode;
  handleOnClick: () => Promise<void>;
  type?: number;
  disabled?: boolean;
  className?: string;
}

const ButtonIcon: React.FC<Props> = ({
  children,
  handleOnClick,
  type,
  disabled,
  ...props
}) => {
  let clicked = false;
  const className = `${props.className || ""} select-none`;
  // prevent double click
  const handleClickButtonIcon = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (clicked || !handleOnClick) {
      return;
    }
    clicked = true;
    if (e) {
      e.preventDefault();
      e.stopPropagation();
    }
    handleOnClick()
      .then(() => {
        // success
      })
      .finally(() => {
        clicked = false;
      });
  };
  return (
    <button
      className={className}
      disabled={disabled}
      onClick={handleClickButtonIcon}
    >
      {children}
    </button>
  );
};
export default ButtonIcon;
