import React from 'react';
import { Outlet } from 'react-router-dom';

const UserLayout = () => {
  return (
    <div className="userMainContainer">
      <Outlet />
    </div>
  );
};

export default UserLayout;
