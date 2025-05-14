'use client'

import { InputElement } from '@/components/forms/InputElement';
import { Category } from '@/types/messageType';
import Link from 'next/link';
import { useState } from 'react';
import { SermonSection } from '../../message/(components)';
import { FaAngleDoubleRight } from 'react-icons/fa';

export const CategoriesList = ({ categories = [] } : { categories: Category[] }) => {
  const [search, setSearch] = useState('');

  return (
    <SermonSection title={
      <div className='flex items-center gap-[5px]'>
        <FaAngleDoubleRight />
        Categories
      </div>
    }>
      <div className='w-full flex flex-col gap-[6px]'>
        <InputElement 
          value={search}
          name='categories'
          type='text'
          onChangeEvent={(e) => setSearch(e.target.value)}
          placeholder='Search Categories'
        />
        {categories.map((category, index) => (
          <div
          key={category.id || index}
          className="cursor-pointer hover:border-orange-400 border-transparent border group rounded-lg bg-white shadow px-2 py-3 hover:bg-orange-50 transition"
        >
          <Link
            href={`/categories/${category.id}`}
            className="text-gray-800 group-hover:text-orange-500 font-semibold flex items-center gap-x-2"
          >
            <FaAngleDoubleRight />
            <span>{category.name}</span>
          </Link>
        </div>
        ))}
      </div>
    </SermonSection>
  );
}
