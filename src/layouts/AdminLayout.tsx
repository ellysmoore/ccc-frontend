'use client'

import AdminSidebar from '@/components/common/AdminSidebar';
import AdminTopbar from '@/components/common/AdminTopbar';
import { User } from '@/types';
import Link from 'next/link';
import React, { ReactNode } from 'react'
import { FaAngleUp } from 'react-icons/fa';

const AdminLayout = ({
  children
} : MainLayoutProps) => {
  // TODO: GET USER
  const user: User = {
    email: 'example@gmail.com',
    is_administrator: false,
    is_super_admin: false
  };

  const handleToggle = () => {};

  return (
    <div id='page-top' className="flex min-h-screen bg-gray-100">
      <AdminSidebar />
      <div className="flex flex-col flex-1">
        <AdminTopbar onToggleSidebar={handleToggle} user={user} />
        <main className="p-4">{children}</main>
      </div>

      <Link
        href={'#page-top'}
        className="fixed bottom-5 right-5 z-50 flex h-10 w-10 items-center justify-center rounded-full bg-orange-600 text-white shadow-lg hover:bg-orange-700"
        aria-label="Scroll to top"
      >
        <FaAngleUp className="h-5 w-5" />
      </Link>
    </div>
  )
}

export interface MainLayoutProps {
  children: ReactNode;
}

export default AdminLayout