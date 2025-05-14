'use client'

import { Button } from '@/components/Button'
import React from 'react'

const NotFoundPage = () => {
  return (
    <div className="container py-5">
      <section className="py-5">
        <div className="row mb-4 align-items-center">
          <div className="col-md-4"></div>
          <div className="col-md-4">
            <h1 className="text-primary text-center">Page Not Found</h1>
            <div className="py-5 flex justify-center text-center">
              <Button 
                href='/'
                label='GO HOME'
                containerClassName='!w-fit'
              />
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default NotFoundPage