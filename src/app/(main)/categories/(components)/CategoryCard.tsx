'use client'

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Category } from '@/types/messageType';

export default function CategoryCard({ category } : { category: Category }) {
  return (
    <div
      className="w-full relative group rounded-[12px] p-3 bg-transparent hover:bg-[#f0f0f0] transition-colors duration-300"
    >
    <Link href={`/categories/${category.id}`}
      className="w-full flex flex-row flex-start gap-[10px]"
    >
      <div className="min-w-[50%] h-[100px] relative">
        <Image
          src={`${category.banner || category.icon}`}
          alt={category.name}
          fill
          className="rounded-[12px] object-cover w-full"
        />
      </div>

      <div className="w-full flex flex-col">
        <div className="font-[500] text-f15 text-dark">
          {category.name}
        </div>

        <div className="mt-[4px] w-full flex flex-col gap-[2px] text-f14">
          <div className="w-full flex items-center text-[#667085]">
          {category.description}
          </div>
        </div>
      </div>
    </Link>
    </div>
  );
}
