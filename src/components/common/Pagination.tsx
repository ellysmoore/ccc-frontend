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
      <li key="start-ellipsis" className="text-gray-500 px-3 py-1">...</li>
    );
  }

  for (let i = start; i <= Math.min(page + 4, pages); i++) {
    paginationItems.push(
      <li
        key={i}
        className={`cursor-pointer px-3 py-1 rounded ${
          i === page ? 'bg-blue-600 text-white' : 'hover:bg-gray-200'
        }`}
        onClick={() => goToPage(i)}
      >
        {i}
      </li>
    );
  }

  if (page + 4 < pages) {
    paginationItems.push(
      <li key="end-ellipsis" className="text-gray-500 px-3 py-1">...</li>
    );
  }

  return (
    <ul className="flex justify-center mt-3 space-x-1 text-sm">
      <li className={`page-item ${page === 1 ? 'disabled' : ''}`}>
        <button
          className={`${(page === 1) ? 'text-gray-400 px-3 py-1' : ''} cursor-pointer text-blue-600 hover:underline px-3 py-1`}
          onClick={() => goToPage(1)}
          disabled={page === 1}
        >
          First
        </button>
      </li>

      {paginationItems}

      <li className={`page-item ${page === pages ? 'disabled' : ''}`}>
        <button
          className={`${(page === pages) ? 'text-gray-400 px-3 py-1' : ''} cursor-pointer text-blue-600 hover:underline px-3 py-1`}
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
