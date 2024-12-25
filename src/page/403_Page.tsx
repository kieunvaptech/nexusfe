import { Button, Result } from "antd";
import { Footer } from "layout/Footer";
import Header from "layout/Header";
import React from "react";

const Forbidden = () => {
  const handleClickExit = () => {};

  return (
    <>
      <Header />
      <div className="pt-[110px]">
        <Result
          status="403"
          title="Truy cập thất bại."
          subTitle="Bạn không có quyền truy cập hệ thống, vui lòng liên hệ quản trị hệ thống để được hỗ trợ."
          extra={
            <Button type="primary" onClick={handleClickExit}>
              Thoát
            </Button>
          }
        />
      </div>
      <Footer />
    </>
  );
};

export default Forbidden;
