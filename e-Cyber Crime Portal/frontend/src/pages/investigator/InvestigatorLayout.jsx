import React from 'react'
import { Outlet } from 'react-router-dom'

const InvestigatorLayout = () => {
  return (
    <div className="investigatorMainContainer">
      <Outlet />
    </div>
  )
}

export default InvestigatorLayout
