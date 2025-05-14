'use client'

import React from 'react'
import { CategorySidebar } from '../(components)/CategorySidebar'
import { CategoryMainSection } from '../(components)/CategoryMainSection'
import { CATEGORIES, MESSAGE_DATA } from '@/data/dummyData'

const CategoryIndexPage = () => {
  const user = null;
  
  return (
    <div className="flex h-full flex-col-reverse md:flex-row gap-[12px] mb-2 animate-fadeIn">
      <CategorySidebar 
        user={user}
        downloads={MESSAGE_DATA}
        recent={MESSAGE_DATA}
        categories={CATEGORIES} 
      />
      <CategoryMainSection 
        title='Category'
        query='Communion Service'
        messages={MESSAGE_DATA}
      />
    </div>
  )
}

export default CategoryIndexPage