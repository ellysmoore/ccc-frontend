'use client'

import React, { useEffect, useState } from 'react'
import { Message } from '@/types/messageType';
import { Loader } from '@/components/Loader';
import { Button } from '@/components/Button';
import { MessageCard } from '@/app/(components)/MessageCard';
import { MESSAGE_DATA, USER } from '@/data/dummyData';
import { User } from '@/types';

const LibraryIndexPage = () => {
  const user: User = USER;
  const [messages, setMessages] = useState<Message[]>(MESSAGE_DATA); 
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);

  const loadMessages = async () => {
    // setLoading(true);
    const res = await fetch(`/api/library?page=${page}&limit=24`);
    const data = await res.json();
    setMessages(prev => [...prev, ...data.messages]);
    setLoading(false);
  };

  useEffect(() => {
    loadMessages();
  }, [page]);

  return (
    <>
      {/* <div id="paystack-apple-pay" className="mb-4" />
      <button
        id="paystack-other-channels"
        className="mb-6 px-4 py-2 bg-gray-800 text-white rounded shadow hover:bg-gray-700"
      >
        More payment options
      </button> */}

      <div className="h-full overflow-hidden hover:overflow-y-auto border-1 border-gray-200 shadow-md rounded-2xl w-full container mx-auto px-4 py-6">
        <h2 className='font-[500] border-b pb-[10px] border-gray-300 w-full flex items-center text-[#0D0D12] text-f18'>
          Library
        </h2>

        <div 
          className="grid grid-cols-1 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-[14px] mb-6" 
          id="messages-container"
        >
          {messages.map((message) => (
            <MessageCard
              key={message.id}
              message={message}
              user={user}
            />
          ))}
        </div>

        {loading ? (
          <div className="w-full flex justify-center">
            <Loader size="medium" />
          </div>
        ) : (
          <div className="w-full flex justify-center">
            <Button 
              label='Load More'
              containerClassName="!w-fit"
              onClick={() => setPage((p) => p + 1)}
            />
          </div>
        )}
      </div>
    </>
  );
}

export default LibraryIndexPage