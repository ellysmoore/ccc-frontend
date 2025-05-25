'use client';

import { useRouter } from 'next/navigation';
import React from 'react';

export const Pagination = ({ query = '', page, pages } : PaginationProps) => {
  const router = useRouter();

  const goToPage = (page: number) => {
    const params = new URLSearchParams();
    params.set('page', page.toString());
    if (query) params.set('q', query);
    router.push(`?${params.toString()}`);
  };

  if (!pages || pages <= 1) return null;

  const start = page > 5 ? page - 4 : 1;
  const paginationItems = [];

  if (start !== 1) {
    paginationItems.push(
      <li key="start-ellipsis" className="border border-[#D9D9D9] text-gray-500 px-3 py-2">...</li>
    );
  }

  for (let i = start; i <= Math.min(page + 4, pages); i++) {
    paginationItems.push(
      <li
        key={i}
        className={`cursor-pointer px-3 py-2 border ${
          i === page ? 'bg-orange-600 border-orange-600 text-white' : 'border-[#D9D9D9] hover:bg-gray-200'
        }`}
        onClick={() => goToPage(i)}
      >
        {i}
      </li>
    );
  }

  if (page + 4 < pages) {
    paginationItems.push(
      <li key="end-ellipsis" className="border border-[#D9D9D9] text-gray-500 px-3 py-2">...</li>
    );
  }

  return (
    <ul className="w-fit mx-auto rounded-[12px] bg-white flex justify-center mt-3 text-sm">
      <li className={`page-item ${page === 1 ? 'disabled' : ''}`}>
        <button
          className={`${(page === 1) ? 'text-gray-400 px-3 py-2' : ''} rounded-l-[12px] border border-[#D9D9D9] cursor-pointer text-orange-600 hover:underline px-3 py-2`}
          onClick={() => goToPage(1)}
          disabled={page === 1}
        >
          First
        </button>
      </li>

      {paginationItems}

      <li className={`page-item ${page === pages ? 'disabled' : ''}`}>
        <button
          className={`${(page === pages) ? 'text-gray-400 px-3 py-2' : ''} rounded-r-[12px] border border-[#D9D9D9] cursor-pointer text-orange-600 hover:underline px-3 py-2`}
          onClick={() => goToPage(pages)}
          disabled={page === pages}
        >
          Last
        </button>
      </li>
    </ul>
  );
};

export interface PaginationProps {
  page: number; 
  pages: number; 
  // eslint-disable-next-line
  query: any;
}
