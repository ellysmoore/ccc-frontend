'use client'

import React, { useState } from 'react';
import Link from 'next/link';
import { FaEye, FaWallet } from 'react-icons/fa';
import { AdminFundWalletModal } from '@/components/AdminFundWalletModal';

export default function UserDetailsPage() {
  const [user, setUser] = useState(null);
  const [downloads, setDownloads] = useState(null);
  const [payments, setPayments] = useState(null);

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
      <div className="container mx-auto p-4">
        {/* User Details Card */}
        <div className="bg-white shadow rounded-lg mb-6">
          <div className="flex items-center justify-between px-6 py-4 border-b">
            <h2 className="text-lg font-semibold text-blue-600">User Details</h2>
            <button
              className="hidden sm:inline-flex items-center px-3 py-1 text-sm font-medium bg-blue-600 text-white rounded hover:bg-blue-700"
              onClick={() => setShowModal('fundWallet')}
            >
              <FaWallet className='mr-2 text-white/70' />
              Fund Wallet
            </button>
          </div>

          <div className="p-6">
            <table className="table-auto w-full text-sm">
              <tbody>
                {userDetails.map(([label, value]) => (
                  <tr key={label} className="border-t">
                    <th className="text-left py-2 font-medium text-gray-600 w-1/3">{label}</th>
                    <td className="py-2 text-gray-900">{value}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Payments and Downloads */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Payments */}
          <div className="bg-white shadow rounded-lg">
            <div className="px-6 py-4 border-b">
              <h2 className="text-lg font-semibold text-blue-600">Payments</h2>
            </div>
            <div className="p-6 overflow-auto">
              <table className="table-auto w-full text-sm">
                <thead className="bg-gray-100">
                  <tr>
                    <th>#</th>
                    <th>Transaction Code</th>
                    <th>Amount</th>
                    <th>Status</th>
                    <th>Date</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {(payments || []).map((payment: any, index: number) => (
                    <tr key={payment.id} className="border-t">
                      <td>{index + 1}</td>
                      <td>{payment.post_data}</td>
                      <td>{payment.amount}</td>
                      <td>{payment.payment_status_id}</td>
                      <td>{payment.created}</td>
                      <td>
                        <Link href={`/admin/payments/${payment.id}`} className="text-blue-600 hover:underline">
                          <FaEye />
                        </Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Downloads */}
          <div className="bg-white shadow rounded-lg">
            <div className="px-6 py-4 border-b">
              <h2 className="text-lg font-semibold text-blue-600">Downloads</h2>
            </div>
            <div className="p-6 overflow-auto">
              <table className="table-auto w-full text-sm">
                <thead className="bg-gray-100">
                  <tr>
                    <th>#</th>
                    <th>Topic</th>
                    <th>Price</th>
                    <th>Downloaded</th>
                  </tr>
                </thead>
                <tbody>
                  {(downloads || []).map((download: any, index: number) => (
                    <tr key={index} className="border-t">
                      <td>{index + 1}</td>
                      <td>{download.topic}</td>
                      <td>{download.price}</td>
                      <td>{download.created}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
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