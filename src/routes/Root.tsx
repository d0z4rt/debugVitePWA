import React from 'react'
import { Button, Space, Tour, TourProps } from 'antd'
//import type { TourProps } from 'antd'
import { Link, Outlet } from 'react-router-dom'

import AnchorLink from 'antd/es/anchor/AnchorLink'

const Root = (): JSX.Element => {
  return (
    <>
      <p>Root</p>
      <Outlet />
    </>
  )
}

export default Root
