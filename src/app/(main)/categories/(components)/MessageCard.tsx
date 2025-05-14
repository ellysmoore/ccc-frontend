'use client'

import { PurchaseModal } from '@/components';
import { User } from '@/types';
import { Message } from '@/types/messageType';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';
import { FaDownload, FaMoneyBillAlt } from 'react-icons/fa';

export const MessageCard = ({ message, user } : { message: Message; user: User }) => {
  const router = useRouter();
  const [openModal, setOpenModal] = useState('');
  const isPurchased = message.is_free || message.id === message.message_id;

  return (
    <>
      <div className="row mb-4 mr-4">
        <div className="col-6">
          <div className="card border-0 shadow mb-2">
            <div className="relative">
              <Image
                src={`${message.album_art}?h=250`}
                height={120}
                width={100}
                className="w-full object-cover aspect-[4/3]"
                alt={message.topic}
              />

              <div className="absolute inset-0 bg-white bg-opacity-50 flex justify-center items-center text-black text-center p-4">
                <h6>
                  {message.is_free ? (
                    <>Download for FREE</>
                  ) : (
                    <>
                      <span className="font-bold">Download full message for </span>
                      <small>₦{message?.price}</small>
                    </>
                  )}
                  <br />
                  <small className="font-bold text-primary">{message?.size}</small>
                </h6>
              </div>
            </div>
          </div>

          <div className="container card shadow border-t-0">
            <div
              className="row h-100 text-center justify-center items-center text-secondary bg-white min-h-[40px] cursor-pointer"
              onClick={() =>
                isPurchased
                  ? router.push(`/download/${message.id}`)
                  : setOpenModal('checkout')
              }
            >
              <div className="col-12">
                {isPurchased ? <FaDownload /> : <FaMoneyBillAlt /> }
              </div>
            </div>
          </div>
        </div>

        <div className="col-6 pl-0 my-auto">
          <div className="text-center">
            <Link href={`/message/${message.id}`} className="text-dark text-sm">
              {message.topic.replace(/_/g, ' ')}
            </Link>
            <p className="text-secondary text-xs uppercase tracking-wider">{message.description}</p>
          </div>
        </div>
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
