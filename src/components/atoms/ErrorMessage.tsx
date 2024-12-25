import React from "react";

interface props {
  message?: string;
}

export const ErrorMessage: React.FC<props> = ({ message }) => {
  const styles = {
    color: "#DC3545",
    fontSize: "16px",
  };
  return <>{message && <span style={styles}>{message}</span>}</>;
};
