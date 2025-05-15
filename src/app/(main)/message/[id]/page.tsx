'use client'

import { PurchaseModal } from '@/components';
import React, { useState } from 'react'
import { SermonCard, SermonSection } from '../(components)';
import Image from 'next/image';
import Head from 'next/head';
import { FaAngleDoubleRight, FaCalendar, FaCartPlus, FaDownload, FaMoneyBillAlt, FaPlay } from 'react-icons/fa';
import Link from 'next/link';
import { Category, Message } from '@/types/messageType';
import { CATEGORIES, MESSAGE_DATA } from '@/data/dummyData';
import { MessageCard } from '@/app/(components)/MessageCard';

const MessageIndexPage = () => {
  const [openModal, setOpenModal] = useState('');
  const user = {};
  const [downloads, setDownload] = useState<Message[]>(MESSAGE_DATA);
  const [recent, setRecent] = useState<Message[]>(MESSAGE_DATA);
  const [related, setRelated] = useState<Message[]>(MESSAGE_DATA);
  const [categories, setCategories] = useState<Category[]>(CATEGORIES);
  const [message, setMessage] = useState<Message | null>(MESSAGE_DATA[0]);

  console.log(setDownload, setRecent, setRelated, setCategories, setMessage);

  const formattedTopic = message?.topic.replace(/_/g, " ");
  const ogImage = `${(message?.album_art || "").replace(/ /g, "%20")}?h=250`;


  return (
    <>
      <Head>
        <meta property="og:title" content={formattedTopic} />
        <meta property="og:image" content={ogImage} />
        <meta property="og:image:type" content="image/jpeg" />
        <meta property="og:site_name" content="Covenant Christian Centre" />
        <meta property="og:description" content={message?.description} />
      </Head>

      <>
        <div className="flex h-full flex-col md:flex-row gap-[12px]">
          {/* Main Content */}
          <div className="h-full overflow-y-auto rounded-[10px] bg-[#F5F5F5] w-full py-[12px] md:py-[15px] px-[20px] md:px-[25px] md:w-3/4 flex flex-col gap-6">
            <div className="bg-white min-h-64 rounded-[14px] shadow overflow-hidden flex flex-col md:flex-row">
              <div className="w-full md:w-1/3 relative h-64 md:h-64">
                <Image
                  src={`${message?.album_art}`}
                  alt={message?.topic || ''}
                  fill
                  className="object-cover"
                />
              </div>

              <div className="p-6 flex-1 flex flex-col">
                <h2 className="text-2xl font-bold">{message?.topic.replace(/_/g, " ")}</h2>
                <p className="my-3">{message?.description}</p>
                <div className="flex items-center gap-2 flex-wrap mt-auto">
                  {categories.map((cat: Category) => (
                    <Link 
                      key={cat?.category_id} 
                      href={`/categories/${cat.category_id}`} 
                      className={`hover:border-orange-400 hover:text-orange-500 border-transparent border hover:bg-orange-50 py-[6px] px-[12px] cursor-pointer rounded-full text-f14 bg-gray-200`}
                    >
                      {cat?.name}
                    </Link>
                    
                  ))}
                </div>

                {/* Actions */}
                <div className="mt-6 flex items-center gap-[10px] text-gray-700">
                  {false && (message?.is_free || message?.id === message?.message_id) ? (
                    <>
                      {/* TODO: HANDLE DOWNLOAD */}
                      <Link
                        href={`/download/${message?.id}`}
                        className="bg-[#FF6300] hover:bg-[#e65a00] h-[48px] w-[48px] flex items-center justify-center text-white p-2 rounded-full shadow-md transition"
                      >
                        <FaDownload size={18} />
                      </Link>

                      <button
                        onClick={() => null}
                        className="bg-[#FF6300] hover:bg-[#e65a00] h-[48px] w-[48px] flex items-center justify-center text-white p-2 rounded-full shadow-md transition"
                      >
                        <FaCalendar size={18} />
                      </button>
                    </>
                  ) : (
                    <>
                      <button
                        onClick={() => null}
                        className="bg-[#FF6300] hover:bg-[#e65a00] h-[48px] w-[48px] flex items-center justify-center text-white p-2 rounded-full shadow-md transition"
                      >
                        <FaPlay size={18} />
                      </button>
                      <button
                        onClick={() => null}
                        className="bg-[#FF6300] hover:bg-[#e65a00] h-[48px] w-[48px] flex items-center justify-center text-white p-2 rounded-full shadow-md transition"
                      >
                        <FaCartPlus size={18} />
                      </button>
                      <button
                        onClick={() => null}
                        className="bg-[#FF6300] hover:bg-[#e65a00] h-[48px] w-[48px] flex items-center justify-center text-white p-2 rounded-full shadow-md transition"
                      >
                        <FaMoneyBillAlt size={18} />
                      </button>
                      <button
                        onClick={() => null}
                        className="bg-[#FF6300] hover:bg-[#e65a00] h-[48px] w-[48px] flex items-center justify-center text-white p-2 rounded-full shadow-md transition"
                      >
                        <FaCalendar size={18} />
                      </button>
                    </>
                  )}
                </div>
              </div>
            </div>

            {/* Related */}
            <div>
              <h3 className="text-xl font-semibold mb-2">Related</h3>
              <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {related.map((msg) => (
                  // @ts-expect-error null
                  <MessageCard key={msg.id} user={user} message={msg} />
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="h-full overflow-y-auto rounded-[10px] bg-[#F5F5F5] w-full py-[12px] md:py-[15px] px-[12px] md:px-[15px] md:w-1/4 flex flex-col gap-6">
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
        </div>

        <PurchaseModal 
          isOpen={openModal == 'checkout'}
          onClose={() => setOpenModal('')}
          // @ts-expect-error null
          userEmail={user?.email}
          title='Instant Purchase'
          handleNext={() => setOpenModal('')}
        />
      </>
    </>
  )
}

export default MessageIndexPage;