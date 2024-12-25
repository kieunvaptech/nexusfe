import React, { ReactNode, useState } from 'react'
import { Popover, PopoverProps } from 'antd'
interface listActionType {
  icon: ReactNode
  text: string
  action: () => void
  hide?: boolean
  iconClass?: string
}

interface props extends PopoverProps {
  children: ReactNode
  listAction: listActionType[]
}

const PopoverAction: React.FC<props> = ({ listAction, children, ...props }) => {
  const [visibleP, setVisibleP] = useState(false)
  const handleVisibleChange = (newVisible: boolean) => {
    setVisibleP(newVisible)
  }
  const popover = (
    <div>
      {listAction.map(
        (item, index) =>
          !item.hide && (
            <div
              key={index}
              className="div-more-action flex justify-around items-center gap-4"
              onClick={() => {
                setVisibleP(false)
                item.action()
              }}
            >
              <span className={`${item?.iconClass} flex-2`}>{item.icon}</span>
              <div className="flex-1"> {item.text}</div>
            </div>
          ),
      )}
    </div>
  )
  return (
    <div className="flex-center">
      <Popover
        arrowPointAtCenter
        open={visibleP}
        onOpenChange={handleVisibleChange}
        trigger="hover"
        content={popover}
        {...props}
      >
        <button>{children}</button>
      </Popover>
    </div>
  )
}

export default PopoverAction
