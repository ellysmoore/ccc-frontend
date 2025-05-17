'use client';

import { MessageCard } from '@/app/(components)/MessageCard';
import { Pagination, PurchaseModal } from '@/components';
import { Message } from '@/types/messageType';
import Image from 'next/image';
import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export const CategoryMainSection = ({
  title,
  query,
  messages,
}: {
  title: string;
  query: string;
  messages: Message[];
}) => {
  const [page, setPage] = useState(1);
  const [pages, setPages] = useState(1);
  const [sortBy, setSortBy] = useState('Sort by Date (Desc)');
  const [openModal, setOpenModal] = useState('');
  const [showSortDropdown, setShowSortDropdown] = useState(false);

  useEffect(() => {
    setPages(1);
    setPage(1);
  }, [])
  

  const sorts = [
    { key: 'date_desc', title: 'Sort by Date (Desc)' },
    { key: 'date_asc', title: 'Sort by Date (Asc)' },
    { key: 'name_desc', title: 'Sort by Name (Desc)' },
    { key: 'name_asc', title: 'Sort by Name (Asc)' },
  ];

  const handleSortChange = (sortTitle: string) => {
    setSortBy(sortTitle);
    setShowSortDropdown(false);
    // Add actual sorting logic here if needed
  };

  const user = {
    id: '1',
    name: 'Guest',
    email: 'guest@example.com',
    is_administrator: false,
    is_super_admin: false,
  };

  return (
    <>
      <div className="h-full w-full md:w-2/3 overflow-y-auto rounded-xl bg-white border border-gray-200 shadow-md px-6 py-5 space-y-6">
        {/* Title and Sorting */}
        <div className="flex justify-between items-center flex-wrap gap-3">
          <div className="flex items-center text-gray-800 font-medium text-lg">
            <span>{title}:</span>
            <span className="ml-2 text-gray-600 font-normal">{query}</span>
          </div>

          <div className="relative">
            <button
              onClick={() => setShowSortDropdown((prev) => !prev)}
              className="border border-gray-300 text-gray-700 px-4 py-1.5 rounded-md text-sm hover:bg-gray-50"
            >
              {sortBy}
            </button>

            <AnimatePresence>
              {showSortDropdown && (
                <motion.div
                  initial={{ opacity: 0, y: -5 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -5 }}
                  className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 shadow-md rounded-md z-10"
                >
                  {sorts.map((sort, i) => (
                    <button
                      key={i}
                      onClick={() => handleSortChange(sort.title)}
                      className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    >
                      {sort.title}
                    </button>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* Banner */}
        <section>
          <div className="relative h-[230px] w-full rounded-lg overflow-hidden shadow-sm">
            <Image
              src="/images/New_sermon.jpg"
              alt="Banner"
              fill
              className="object-cover"
            />
          </div>
        </section>

        {/* Messages Grid */}
        <div className="flex flex-wrap -mx-2">
          <AnimatePresence>
            {messages.map((message) => (
              <motion.div
                key={message.id}
                className="w-full sm:w-1/2 lg:w-1/3 px-2 mb-4"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 10 }}
                transition={{ duration: 0.2 }}
              >
                <MessageCard message={message} user={user} />
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {/* Pagination */}
        <Pagination page={page} pages={pages} query="" />
      </div>

      {/* Modal */}
      <PurchaseModal
        isOpen={openModal === 'checkout'}
        onClose={() => setOpenModal('')}
        userEmail={user.email}
        title="Instant Purchase"
        handleNext={() => setOpenModal('')}
      />
    </>
  );
};
