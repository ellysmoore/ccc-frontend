'use client'

import React, { useState } from 'react';
import Link from 'next/link';
import { FaChevronLeft, FaEye, FaWallet } from 'react-icons/fa';
import { AdminFundWalletModal } from '@/components/AdminFundWalletModal';
import { Button } from '@/components/Button';

type User = {
  first_name: string;
  last_name: string;
  email: string;
  mobile: string;
  balance: number;
  last_login: string;
  is_active: boolean;
  is_administrator: boolean;
  send_newsletter: boolean;
  created: string;
  // Add any other fields as needed
};

export default function UserDetailsPage() {
  // eslint-disable-next-line
  const [user, setUser] = useState<User | null>(null);
  // eslint-disable-next-line
  const [downloads, setDownloads] = useState<any[] | null>(null);
  // eslint-disable-next-line
  const [payments, setPayments] = useState<any[] | null>(null);

  const [showModal, setShowModal] = useState('');

  const userDetails = [
    ['First Name', user?.first_name],
    ['Last Name', user?.last_name],
    ['Email', user?.email],
    ['Mobile', user?.mobile],
    ['Wallet Balance', user?.balance],
    ['Last Login', user?.last_login],
    ['Active', user?.is_active ? 'Yes' : 'No'],
    ['Administrator', user?.is_administrator ? 'Yes' : 'No'],
    ['Send Newsletter', user?.send_newsletter ? 'Yes' : 'No'],
    ['Created', user?.created],
  ];

  return (
    <>
      <div className="lg:px-6">
        <div className="mb-4 flex items-center gap-[20px]">
          <Link
            className='w-[40px] h-[40px] bg-[#EAEAEA] rounded-full grid place-items-center bg-opacity-40'
            href={'/admin/users'}
          >
            <FaChevronLeft size={13} />
          </Link>

          <h1 className="!text-2xl font-semibold text-[#222]">
            User
          </h1>
        </div>

        {/* User Details Card */}
        <div className="bg-white border border-[#D9D9D9] rounded-[12px] mb-6">
          <div className="flex items-center justify-between px-[16px] py-3 border-b border-[#D9D9D9] ">
            <h2 className="text-[18px] leading-[140%] font-semibold text-orange-600">User Details</h2>
            
            <Button
              onClick={() => setShowModal('fundWallet')}
              containerClassName="!w-fit !py-[6px]"
              label={
                <div className="w-fit flex items-center gap-[2px]">
                  <FaWallet className="mr-2 text-white/70" /> Fund Wallet
                </div>
              }
            />
          </div>

          <div className="p-[16px]">
            <section className="grid gap-[20px] w-full sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6">
              {userDetails.map(([label, value]) => (
                <div key={label} className="flex flex-col gap-[2px]">
                  <div className="text-left text-[13px] text-[#6B6968] w-full">{label}</div>
                  <div className="text-left text-[15px] text-[#222] w-full">{value}</div>
                </div>
              ))}
            </section>
          </div>
        </div>

        {/* Payments and Downloads */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-white border border-[#D9D9D9] rounded-[12px] mb-6">
            <div className="flex items-center justify-between px-[16px] py-3 border-b border-[#D9D9D9] ">
              <h2 className="text-[18px] leading-[140%] font-semibold text-orange-600">Payments</h2>
            </div>

            <div className='w-full h-full bg-white border border-[#D9D9D9]'>
              <div className='relative min-h-[120px] !overflow-x-auto w-full'>
                <table className="min-w-max w-full">
                  <thead>
                    <tr className='bg-gray-50 border-b border-[#D9D9D9]'>
                      <th className='text-[#6B6968] md:!min-w-0 !min-w-[50px] !text-left font-medium text-sm py-[14px] pl-[19px]'>#</th>
                      <th className='text-[#6B6968] md:!min-w-0 !min-w-[150px] !text-left font-medium text-sm py-[14px]'>Transaction Code</th>
                      <th className='text-[#6B6968] md:!min-w-0 !min-w-[150px] !text-left font-medium text-sm py-[14px]'>Amount</th>
                      <th className='text-[#6B6968] md:!min-w-0 !min-w-[150px] !text-left font-medium text-sm py-[14px]'>Status</th>
                      <th className='text-[#6B6968] md:!min-w-0 !min-w-[150px] !text-left font-medium text-sm py-[14px]'>Date</th>
                      <th className='text-[#6B6968] md:!min-w-0 !min-w-[150px] !text-left font-medium text-sm py-[14px]'>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {/* eslint-disable-next-line */}
                    {(payments || []).map((payment: any, index: number) => (
                      <tr
                        key={payment.id}
                        className='border-b border-[#F5F5F5] smooth'
                      >
                        <td className='md:!min-w-0 !min-w-[50px] pl-5 pt-[14px] pb-[13px] text-sm text-dark font-medium'>{index + 1}</td>
                        <td className='md:!min-w-0 !min-w-[150px] pt-[14px] pb-[13px] text-sm text-dark font-medium'>{payment.post_data}</td>
                        <td className='md:!min-w-0 !min-w-[150px] pt-[14px] pb-[13px] text-sm text-dark font-medium'>{payment.amount}</td>
                        <td className='md:!min-w-0 !min-w-[150px] pt-[14px] pb-[13px] text-sm text-dark font-medium'>{payment.payment_status_id}</td>
                        <td className='md:!min-w-0 !min-w-[150px] pt-[14px] pb-[13px] text-sm text-dark font-medium'>{payment.created}</td>
                        <td className="md:!min-w-0 !min-w-[150px] pt-[14px] pb-[13px] text-sm text-dark font-medium pr-[8px]">
                          <div className="w-fit flex text-[#CCC] items-center gap-[8px]">
                            <Link href={`/admin/payments/${payment.id}`} title='View'>
                              <FaEye size={17} className="text-orange-500" />
                            </Link>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          {/* Downloads */}
          <div className="bg-white border border-[#D9D9D9] rounded-[12px] mb-6">
            <div className="flex items-center justify-between px-[16px] py-3 border-b border-[#D9D9D9] ">
              <h2 className="text-[18px] leading-[140%] font-semibold text-orange-600">Downloads</h2>
            </div>

            <div className='w-full h-full bg-white border border-[#D9D9D9]'>
              <div className='relative min-h-[120px] !overflow-x-auto w-full'>
                <table className="min-w-max w-full">
                  <thead>
                    <tr className='bg-gray-50 border-b border-[#D9D9D9]'>
                      <th className='text-[#6B6968] md:!min-w-0 !min-w-[50px] !text-left font-medium text-sm py-[14px] pl-[19px]'>#</th>
                      <th className='text-[#6B6968] md:!min-w-0 !min-w-[150px] !text-left font-medium text-sm py-[14px]'>Topic</th>
                      <th className='text-[#6B6968] md:!min-w-0 !min-w-[150px] !text-left font-medium text-sm py-[14px]'>Price</th>
                      <th className='text-[#6B6968] md:!min-w-0 !min-w-[150px] !text-left font-medium text-sm py-[14px]'>Downloaded</th>
                    </tr>
                  </thead>
                  <tbody>
                    {/* eslint-disable-next-line */}
                    {(downloads || []).map((download: any, index: number) => (
                      <tr
                        key={download.id}
                        className='border-b border-[#F5F5F5] smooth'
                      >
                        <td className='md:!min-w-0 !min-w-[50px] pl-5 pt-[14px] pb-[13px] text-sm text-dark font-medium'>{index + 1}</td>
                        <td className='md:!min-w-0 !min-w-[150px] pt-[14px] pb-[13px] text-sm text-dark font-medium'>{download.topic}</td>
                        <td className='md:!min-w-0 !min-w-[150px] pt-[14px] pb-[13px] text-sm text-dark font-medium'>{download.price}</td>
                        <td className='md:!min-w-0 !min-w-[150px] pt-[14px] pb-[13px] text-sm text-dark font-medium'>{download.created}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>

      <AdminFundWalletModal 
        isOpen={showModal == 'fundWallet'}
        onClose={() => setShowModal('')}
      />
    </>
  );
}