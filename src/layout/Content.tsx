import { Spin } from 'antd'
import React, { ReactElement } from 'react'

interface props {
  children: ReactElement
  className?: string
  loading?: boolean
}

const Content: React.FC<props> = ({ children, className, loading }) => {
  return <main>
    <Spin
        spinning={loading}
        size="default"
        style={{
          verticalAlign: 'middle',
        }}
      >
        {children}
      </Spin>
    </main>
}

export default Content
