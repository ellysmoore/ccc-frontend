'use client'

import React, { useState } from 'react'
import { MessageCard } from './(components)';
import CategoryCard from './(components)/CategoryCard';
import { Pagination } from '@/components';
import Image from 'next/image';
import { Category, Message } from '@/types/messageType';
import { CATEGORIES, MESSAGE_DATA } from '@/data/dummyData';
import { SermonCard, SermonSection } from '../message/(components)';
import { FaAngleDoubleRight } from 'react-icons/fa';

const CategoriesIndexPage = () => {
  const [page, setPage] = useState(1);
  const [pages, setPages] = useState(1);
  const user = null;

  const downloads: Message[] = MESSAGE_DATA;
  const recent: Message[] = MESSAGE_DATA;
  const categories: Category[] = CATEGORIES;

  return (
    <div className="flex h-full flex-col md:flex-row gap-[12px] mb-2">
      <div className="h-full gap-6 flex flex-col overflow-y-auto rounded-[10px] bg-[#F5F5F5] w-full md:w-1/3 py-[12px] md:py-[15px] px-[20px] md:px-[25px]">
        <SermonSection title={
          <div className='flex items-center gap-[5px]'>
            <FaAngleDoubleRight />
            Most downloaded
          </div>
        }>
          {downloads.map((msg) => (
            // @ts-expect-error null
            <SermonCard key={msg.id} user={user} message={msg} />
          ))}
        </SermonSection>

        <SermonSection title={
          <div className='flex items-center gap-[5px]'>
            <FaAngleDoubleRight />
            Recent Sermons
          </div>
        }>
          {recent.map((msg) => (
            // @ts-expect-error null
            <SermonCard key={msg.id} user={user} message={msg} />
          ))}
        </SermonSection>
      </div>

      <div className="h-full overflow-y-auto rounded-[10px] bg-[#F5F5F5] w-full md:w-2/3 py-[12px] md:py-[15px] px-[20px] md:px-[25px]">
        <section className="mb-4">
          <div className="shadow-sm rounded-[12px] relative h-[230px] w-full">
            <Image 
              src="/images/Faith.jpg" 
              alt="Banner" 
              className="rounded-[12px] object-cover img-fluid" 
              fill
            />
          </div>
        </section>

        <div className="grid md:grid-cols-2 lg:grid-cols-3">
          {categories.map((category) => (
            <CategoryCard key={category.id} category={category} />
          ))}
        </div>

        <Pagination 
          page={page}
          pages={pages}
          query={''}
        />
      </div>
    </div>
  )
}

export default CategoriesIndexPage