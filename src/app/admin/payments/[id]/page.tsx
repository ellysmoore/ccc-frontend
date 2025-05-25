'use client'

import Link from "next/link";
import { useState } from "react";
import { FaChevronLeft } from "react-icons/fa";

type PaymentDetails = {
  post_data?: string;
  user_id?: string | number;
  last_name?: string;
  first_name?: string;
  email?: string;
  amount?: number | string;
  payment_status_id?: string | number;
  response_data?: string;
  completed?: boolean;
};

const PaymentDetailsPage = () => {
  const [locals, setLocals] = useState<PaymentDetails | null>(null);

  return (
    <div className="lg:px-6">
        <div className="mb-4 flex items-center gap-[20px]">
          <Link
            className='w-[40px] h-[40px] bg-[#EAEAEA] rounded-full grid place-items-center bg-opacity-40'
            href={'/admin/payments'}
          >
            <FaChevronLeft size={13} />
          </Link>

          <h1 className="!text-2xl font-semibold text-[#222]">
            Payment
          </h1>
        </div>

        {/* Payment Details Card */}
        <div className="bg-white border border-[#D9D9D9] rounded-[12px] mb-6">
          <div className="flex items-center justify-between px-[16px] py-3 border-b border-[#D9D9D9] ">
            <h2 className="text-[18px] leading-[140%] font-semibold text-orange-600">Payment Details</h2>
          </div>

          <div className="p-[16px]">
            <section className="grid gap-[20px] w-full sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6">
                <div className="flex flex-col gap-[2px]">
                  <div className="text-left text-[13px] text-[#6B6968] w-full">Transaction Reference</div>
                  <div className="text-left text-[15px] text-[#222] w-full">{locals?.post_data}</div>
                </div>
                <div className="flex flex-col gap-[2px]">
                  <div className="text-left text-[13px] text-[#6B6968] w-full">User</div>
                  <div className="text-left text-[15px] text-[#222] w-full">
                    {/* {locals?.user_id ? (
                      <Link href={`/admin/users/${uid}`} className="text-orange-500 underline">
                        {locals?.last_name} {locals?.first_name}
                      </Link>
                    ) : (
                      "Guest"
                    )} */}
                  </div>
                </div>

                <div className="flex flex-col gap-[2px]">
                  <div className="text-left text-[13px] text-[#6B6968] w-full">Email</div>
                  <div className="text-left text-[15px] text-[#222] w-full">{locals?.email}</div>
                </div>
                <div className="flex flex-col gap-[2px]">
                  <div className="text-left text-[13px] text-[#6B6968] w-full">Amount</div>
                  <div className="text-left text-[15px] text-[#222] w-full">{locals?.amount}</div>
                </div>
                <div className="flex flex-col gap-[2px]">
                  <div className="text-left text-[13px] text-[#6B6968] w-full">Payment Status</div>
                  <div className="text-left text-[15px] text-[#222] w-full">{locals?.payment_status_id}</div>
                </div>
                <div className="flex flex-col gap-[2px]">
                  <div className="text-left text-[13px] text-[#6B6968] w-full">Response Data</div>
                  <div className="text-left text-[15px] text-[#222] w-full">{locals?.response_data}</div>
                </div>
                <div className="flex flex-col gap-[2px]">
                  <div className="text-left text-[13px] text-[#6B6968] w-full">Completed</div>
                  <div className="text-left text-[15px] text-[#222] w-full">{String(locals?.completed)}</div>
                </div>
            </section>
          </div>
        </div>
    </div>
  );
};

export default PaymentDetailsPage;