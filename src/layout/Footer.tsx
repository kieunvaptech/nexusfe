import React from 'react'
import { useSelector } from 'react-redux'

export const Footer = () => {
  // `${isCollapsed ? 'left-[20px] collapsed' : 'left-[300px]'}
  return (
    <footer
      className={`left-[300px] px-[22px] ktnn-footer fixed w-full bottom-[0] h-[51px] flex`}
    >
      <div className="text-[16px] flex items-center text-[#8D8C8C] px-[20px] justify-between w-full">
        <div>support@nexus.com</div>
        <div>
          ©2025 Bản quyền thuộc <strong>NEXUS</strong>
        </div>
      </div>
    </footer>
  )
}
