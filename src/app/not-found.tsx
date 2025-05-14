'use client'

import { Button } from '@/components/Button'
import React from 'react'

const NotFoundPage = () => {
  return (
    <div className="container mx-auto py-10">
      <div className="flex flex-col items-center justify-center text-center space-y-6">
        <h1 className="text-3xl font-bold text-primary">Page Not Found</h1>
        <Button 
          href="/"
          label="GO HOME"
          containerClassName="!w-fit"
        />
      </div>
    </div>
  )
}

export default NotFoundPage
