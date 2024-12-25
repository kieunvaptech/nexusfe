import React from 'react'
import { useSelector } from 'react-redux'

export const Footer = () => {
  // `${isCollapsed ? 'left-[20px] collapsed' : 'left-[300px]'}
  return (
    <footer
      className={`left-[300px] px-[22px] ktnn-footer fixed w-full bottom-[0] h-[51px] flex`}
    >
      <div className="text-[16px] flex items-center text-[#8D8C8C] px-[20px] justify-between w-full">
        <div>Hỗ trợ: 1900 8666 12 - hotrophanmem@sav.gov.vn</div>
        <div>
          ©2021 Bản quyền thuộc <strong>Kiểm toán nhà nước</strong>
        </div>
      </div>
    </footer>
  )
}
