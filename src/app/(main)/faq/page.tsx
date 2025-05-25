'use client'

import { FAQ_CATEGORIES, FAQ_DATA, MESSAGE_CODES } from '@/data/faqData';
import { useState } from 'react';
import { FaCreditCard, FaHandHoldingUsd, FaQuestion } from 'react-icons/fa';
import FaqsCard from './(components)/FaqCard';

export default function FaqAndMessageCodes() {
  const [activeCategory, setActiveCategory] = useState('general');
  const [openFaq, setOpenFaq] = useState<string>('1');

  return (
    <main className="h-full overflow-y-auto border-1 border-gray-200 shadow-md rounded-2xl w-full container mx-auto px-4 py-10">
      <section className='w-full flex flex-col'>
        <h2 className='font-[500] border-b pb-[10px] border-gray-300 w-full flex items-center text-[#0D0D12] text-f18'>
          Frequency Asked Questions
        </h2>

        <div className="grid mt-[10px] md:grid-cols-3 gap-3">
          {FAQ_CATEGORIES.map((category) => (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={`p-5 flex items-center gap-[10px] border border-[#E4E7EC] rounded-[7px] w-full text-left transition ${
                activeCategory === category ? '!text-white bg-orange-600' : 'bg-white'
              }`}
            >
              <div className={`rounded-full p-[10px] ${activeCategory === category ? 'bg-white' : 'bg-gray-200'}`}>
                {category === 'general' && <FaQuestion className={`${activeCategory === category ? 'text-orange-600' : 'text-gray-600'}`} />} 
                {category === 'payments' && <FaCreditCard className={`${activeCategory === category ? 'text-orange-600' : 'text-gray-600'}`} />} 
                {category === 'givings' && <FaHandHoldingUsd className={`${activeCategory === category ? 'text-orange-600' : 'text-gray-600'}`} />} 
              </div>
              {category.charAt(0).toUpperCase() + category.slice(1)}
            </button>
          ))}
        </div>

        <div className="mt-[20px] flex flex-col gap-[10px]">
          {
            FAQ_DATA?.map((faq: { 
              id: string; 
              category: string; 
              question: string; 
              answer: string; 
              videos: string[]
            }) => (
            faq?.category == activeCategory &&
            <FaqsCard 
              id={faq?.id}
              key={faq?.id}
              title={faq?.question}
              body={
                <div className='flex flex-col'>
                  <div>{faq?.answer}</div>
                  {
                    faq?.videos?.map((url: string) => (
                      <div key={url} className="aspect-video my-3">
                        <iframe
                          className="w-full h-full"
                          src={url}
                          allowFullScreen
                        ></iframe>
                      </div>
                    ))
                  }
                </div>
              }
              clickedId={openFaq}
              showDetails={setOpenFaq}
            />
          ))
          }
        </div>
      </section>

      <section className="w-full flex flex-col mt-12">
        <h2 className='font-[500] border-b pb-[10px] border-gray-300 w-full flex items-center text-[#0D0D12] text-f18'>
          Message Codes
        </h2>

        <div className="grid grid-cols-1 gap-4 mt-[10px]">
          {MESSAGE_CODES.map(({ code, desc, time }) => (
            <div key={code} className="bg-white flex flex-col gap-[3px] p-4 border border-gray-300 rounded-[8px] shadow-sm">
              <h5 className="text-f16 font-bold">{code}</h5>
              <p>{desc}</p>
              <small className="text-gray-500">{time}</small>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
