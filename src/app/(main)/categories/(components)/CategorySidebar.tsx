'use client'

import { CategoriesList } from './CategoriesList';
import { Category, Message } from '@/types/messageType';
import { User } from '@/types';
import { SermonCard, SermonSection } from '../../message/(components)';
import { FaAngleDoubleRight } from 'react-icons/fa';

export const CategorySidebar = ({ 
  user, 
  downloads = [], 
  recent = [], 
  categories = [] 
} : CategorySidebarProps) => {
  return (
    <div className="h-full gap-6 flex flex-col overflow-y-auto rounded-[10px] bg-[#F5F5F5] w-full md:w-1/3 py-[12px] md:py-[15px] px-[20px] md:px-[25px]">
      <CategoriesList categories={categories} />

      <SermonSection title={
        <div className='flex items-center gap-[5px]'>
          <FaAngleDoubleRight />
          Most downloaded
        </div>
      }>
        {downloads.map((msg) => (
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
          <SermonCard key={msg.id} user={user} message={msg} />
        ))}
      </SermonSection>
    </div>
  );
}

export interface CategorySidebarProps {
  user: User;
  recent: Message[];
  downloads: Message[];
  categories: Category[];
}