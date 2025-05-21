import { Loader } from '@/components/Loader'
import MainLayout from '@/layouts/MainLayout'
import { Metadata } from 'next'
import React, { ReactNode, Suspense } from 'react'

export const metadata: Metadata = {
  title: "Insights For Living | Powered by Covenant Christian Centre",
  description: "",
}

const MainIndexLayout = ({
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
      <MainLayout>
        {children}
      </MainLayout>
    </Suspense>
  )
}

export default MainIndexLayout