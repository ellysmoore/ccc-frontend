import { Loader } from '@/components/Loader'
import AdminLayout from '@/layouts/AdminLayout'
import { Metadata } from 'next'
import React, { ReactNode, Suspense } from 'react'

export const metadata: Metadata = {
  title: "ELibrary",
  description: "",
}

const AdminIndexLayout = ({
  children
} : {
  children: ReactNode
}) => {
  return (
    <Suspense fallback={
      <div className='p-[16px] md:p-[25px] w-full h-screen flex flex-col items-center justify-center '>
        <Loader size='big' />
      </div>
    }
    >
      <AdminLayout>
        {children}
      </AdminLayout>
    </Suspense>
  )
}

export default AdminIndexLayout