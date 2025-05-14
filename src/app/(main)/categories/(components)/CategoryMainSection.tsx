'use client'

import { MessageCard } from "@/app/(components)/MessageCard";
import { Pagination } from "@/components";
import { PurchaseModal } from "@/components";
// import { useCartStore } from "@/store/cartStore";
import { Message } from "@/types/messageType";
import Image from "next/image";
import React, { useState } from "react";
// import { MessageCard } from "./MessageCard";

export const CategoryMainSection = ({ title, query, messages } : { title: string; query: string; messages: Message[]}) => {
  const [page, setPage] = useState(1);
  const [pages, setPages] = useState(1);
  const [sortBy, setSortBy] = useState('Sort by date');
  const sorts: { link: string; title: string }[] = [
    { link: '', title: 'Sort by Date (Desc)' },
    { link: '', title: 'Sort by Date (Acs)' },
    { link: '', title: 'Sort by Name (Desc)' },
    { link: '', title: 'Sort by Name (Acs)' }
  ];
  const [openModal, setOpenModal] = useState('');
  // const { addToCart } = useCartStore(state => state);

  interface User {
    id: string;
    name: string;
    email: string;
    is_administrator: boolean;
    is_super_admin: boolean;
  };
  
  const user: User = {
    id: "1", // Replace with appropriate default values
    name: "Guest",
    email: "guest@example.com",
    is_administrator: false,
    is_super_admin: false,
  };

  console.log(setPage, setPages, setSortBy)

  return (
    <>
      <div className="h-full overflow-y-auto rounded-[10px] bg-[#F5F5F5] w-full md:w-2/3 py-[12px] md:py-[15px] px-[20px] md:px-[25px]">
        <div className="flex justify-between items-center">
          <div className="flex items-center">
            <h5 className="text-gray-900 font-[500] text-f18">{title}:</h5>
            <h5 className="ml-2 text-gray-600 text-f18">{query}</h5>
          </div>
          <div className="relative">
            <button
              className="btn border border-gray-400 text-gray-700 px-3 py-1 rounded-md"
              id="sortDropdown"
            >
              {sortBy}
            </button>
            <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 shadow-lg z-10 hidden group-hover:block">
              {sorts.map((sort, i) => (
                <a
                  key={i}
                  href={sort.link}
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                >
                  {sort.title}
                </a>
              ))}
            </div>
          </div>
        </div>

        <hr className="my-4" />

        <section className="mb-4">
          <div className="shadow-sm rounded-[12px] relative h-[230px] w-full">
            <Image 
              src="/images/New_sermon.jpg" 
              alt="Banner" 
              className="rounded-[12px] object-cover img-fluid" 
              fill
            />
          </div>
        </section>

        <div className="flex flex-wrap -mx-2">
          {messages.map((message) => (
            <MessageCard key={message.id} message={message} user={user} />
            // <div key={index} className="w-1/2 lg:w-1/4 px-2 mb-4">
            //   <div className="card border border-gray-200 shadow-sm">
            //     <div className="relative aspect-square overflow-hidden">
            //       <Link href={`/message/${message.id}`}>
            //         <Image
            //           src={`${process.env.NEXT_PUBLIC_URL}/assets/images/${message.album_art}?h=250`}
            //           alt={message.topic}
            //           height={120}
            //           width={100}
            //           className="w-full h-full object-cover"
            //         />
            //       </Link>
            //       <div className="absolute inset-0 bg-white bg-opacity-80 flex items-center justify-center text-center">
            //         <h5 className="text-sm mx-2">
            //           {message.is_free ? (
            //             "Download for FREE"
            //           ) : (
            //             <>
            //               <span className="font-bold">Download full message for</span>
            //               <br />
            //               <small>₦{message.price}</small>
            //             </>
            //           )}
            //           <br />
            //           <small className="font-bold text-primary">{message.size}</small>
            //         </h5>
            //       </div>
            //     </div>
            //   </div>

            //   <div className="bg-white shadow-sm border border-t-0">
            //     <div className="flex items-center justify-center text-gray-600 min-h-[40px]">
            //       {message.is_free || message.id === message.message_id ? (
            //         <div
            //           onClick={() => (window.location.href = `/download/${message.id}`)}
            //           className="cursor-pointer"
            //         >
            //           <i className="fas fa-download"></i>
            //         </div>
            //       ) : !message.sample ? (
            //         <>
            //           <div
            //             className="w-1/2 text-center cursor-pointer"
            //             title="Add to cart"
            //             onClick={() => addToCart(message)}
            //           >
            //             <i className="fas fa-cart-plus"></i>
            //           </div>
            //           <div
            //             className="w-1/2 text-center cursor-pointer"
            //             title="Purchase"
            //             onClick={() => setOpenModal('checkout')}
            //           >
            //             <i className="fas fa-money-bill-alt"></i>
            //           </div>
            //         </>
            //       ) : (
            //         <>
            //           <div
            //             className="w-1/3 text-center cursor-pointer"
            //             title="Preview"
            //             data-id={message.id}
            //           >
            //             <i className="fas fa-play"></i>
            //           </div>
            //           <div
            //             className="w-1/3 text-center cursor-pointer"
            //             title="Add to cart"
            //             onClick={() => addToCart(message)}
            //           >
            //             <i className="fas fa-cart-plus"></i>
            //           </div>
            //           <div
            //             className="w-1/3 text-center cursor-pointer"
            //             title="Purchase"
            //             onClick={() => setOpenModal('checkout')}
            //           >
            //             <i className="fas fa-money-bill-alt"></i>
            //           </div>
            //         </>
            //       )}
            //     </div>
            //   </div>

            //   <div className="text-center mt-4">
            //     <a href={`/message/${message.id}`} className="text-black text-sm font-medium">
            //       {message.topic.replace(/_/g, " ")}
            //     </a>
            //     <p className="text-gray-500 text-xs uppercase tracking-wide">
            //       {message.description}
            //     </p>
            //   </div>
            // </div>
          ))}
        </div>

        <Pagination page={page} pages={pages} query={''} />
      </div>

      <PurchaseModal 
        isOpen={openModal == 'checkout'}
        onClose={() => setOpenModal('')}
        userEmail={user?.email}
        title='Instant Purchase'
        handleNext={() => setOpenModal('')}
      />
    </>
  );
}
