import React, { ReactElement } from 'react'

interface props {
  children: ReactElement
  className?: string
}

const Content: React.FC<props> = ({ children, className }) => {
  return <main>{children}</main>
}

export default Content
