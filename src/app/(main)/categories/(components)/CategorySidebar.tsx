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
    <div className="h-full w-full md:w-1/3 flex flex-col group gap-6 overflow-hidden hover:overflow-y-auto border-1 border-gray-200 shadow-md rounded-2xl bg-white px-4 py-4 md:px-5 md:py-5">
  <CategoriesList categories={categories} />

  <SermonSection
    title={
      <div className="flex items-center gap-2 text-white-100 font-medium">
        <FaAngleDoubleRight className="text-orange-500" />
        Most downloaded
      </div>
    }
  >
    {downloads.map((msg) => (
      <SermonCard key={msg.id} user={user} message={msg} />
    ))}
  </SermonSection>

  <SermonSection
    title={
      <div className="flex items-center gap-2 text-white-100 font-medium">
        <FaAngleDoubleRight className="text-orange-500" />
        Recent Sermons
      </div>
    }
  >
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