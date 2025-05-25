'use client'

import AdminSidebar from '@/components/common/AdminSidebar';
import AdminTopbar from '@/components/common/AdminTopbar';
import { User } from '@/types';
import React, { ReactNode, useState } from 'react'
import { FaAngleUp } from 'react-icons/fa';

const AdminLayout = ({
  children
} : MainLayoutProps) => {
  const [openSideBar, setOpenSideBar] = useState(false);

  // TODO: GET USER
  const user: User = {
    email: 'example@gmail.com',
    is_administrator: false,
    is_super_admin: false
  };

  const handleScrollToTop = () => {
    scrollTo(0, 0);
  };

  const handleToggle = () => {
    setOpenSideBar(prev => !prev);
  };

  return (
    <div id='page-top' className="flex min-h-screen bg-[#F6F6F6]">
      <AdminSidebar open={openSideBar} setToggle={() => handleToggle()}  />
      <div className="flex flex-col flex-1">
        <AdminTopbar onToggleSidebar={handleToggle} user={user} />
        <main className="lg:ml-[255px] mt-[50px] p-[16px]">
          {children}
        </main>
      </div>

      <button
        onClick={handleScrollToTop}
        className="cursor-pointer fixed bottom-5 right-5 z-50 flex h-10 w-10 items-center justify-center rounded-full bg-orange-600 text-white shadow-lg hover:bg-orange-700"
        aria-label="Scroll to top"
      >
        <FaAngleUp className="h-5 w-5" />
      </button>
    </div>
  )
}

export interface MainLayoutProps {
  children: ReactNode;
}

export default AdminLayout