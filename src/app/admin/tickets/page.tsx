'use client'

import { Pagination } from "@/components";
import { Button } from "@/components/Button";
import Link from "next/link";
import { useState } from "react";
import { FaChevronLeft } from "react-icons/fa";

// type Ticket = {
//   pin: string;
//   credit: number;
//   is_used: boolean;
//   time_used: string;
//   created: string;
// };

export default function TicketsPage() {
  const locals = null;
  const [page, setPage] = useState(1);
  const [pages, setPages] = useState(1);
  const [tickets, setTickets] = useState([
    {
      pin: "1234567890",
      credit: 1000,
      is_used: true,
      time_used: "2024-05-01 10:45",
      created: "2024-04-20 14:30",
    },
    {
      pin: "0987654321",
      credit: 500,
      is_used: false,
      time_used: "",
      created: "2024-04-21 12:00",
    },
  ]);

  const handleExport = () => {};

  return (
    <>
      <div className="lg:px-6">
        <section className="mb-4 flex md:flex-row flex-col items-center gap-[20px]">
          <div className="flex items-center gap-[20px]">
            <Link
              className='w-[40px] h-[40px] bg-[#EAEAEA] rounded-full grid place-items-center bg-opacity-40'
              href={'/admin/tickets'}
            >
              <FaChevronLeft size={13} />
            </Link>

            <h1 className="!text-2xl font-semibold text-[#222]">
              Tickets
            </h1>
          </div>

          <Button
            onClick={handleExport}
            containerClassName="!w-fit"
            label={
              <div className="w-fit flex items-center gap-[5px]">
                Export Tickets
              </div>
            }
          />
        </section>

        <div className='w-full flex flex-col'>
          <div className='w-full h-full bg-white rounded-[12px] border border-[#D9D9D9] mt-4'>
            <div className='border-b border-[#D9D9D9] relative min-h-[120px] !overflow-x-auto w-full'>
              <table className="min-w-max w-full">
                <thead>
                  <tr className='border-b border-[#D9D9D9]'>
                    <th className='text-[#6B6968] md:!min-w-0 !min-w-[50px] !text-left font-medium text-sm py-[14px] pl-[19px]'>Serial</th>
                <th className='text-[#6B6968] md:!min-w-0 !min-w-[150px] !text-left font-medium text-sm py-[14px]'>PIN</th>
                <th className='text-[#6B6968] md:!min-w-0 !min-w-[150px] !text-left font-medium text-sm py-[14px]'>Credit</th>
                <th className='text-[#6B6968] md:!min-w-0 !min-w-[150px] !text-left font-medium text-sm py-[14px]'>Usage</th>
                <th className='text-[#6B6968] md:!min-w-0 !min-w-[150px] !text-left font-medium text-sm py-[14px]'>Time Used</th>
                <th className='text-[#6B6968] md:!min-w-0 !min-w-[150px] !text-left font-medium text-sm py-[14px]'>Created</th>
              </tr>
            </thead>
            <tbody>
              {tickets.map((ticket, index) => (
                <tr
                  key={index}
                  className='border-b border-[#F5F5F5] smooth'
                    >
                      <td className='md:!min-w-0 !min-w-[50px] pl-5 pt-[14px] pb-[13px] text-sm text-dark font-medium'>{index + 1}</td>
                  <td className='md:!min-w-0 !min-w-[150px] pt-[14px] pb-[13px] text-sm text-dark font-medium'>{ticket.pin}</td>
                  <td className='md:!min-w-0 !min-w-[150px] pt-[14px] pb-[13px] text-sm text-dark font-medium'>{ticket.credit}</td>
                  <td className='md:!min-w-0 !min-w-[150px] pt-[14px] pb-[13px] text-sm text-dark font-medium'>{ticket.is_used ? "Used" : "Unused"}</td>
                  <td className='md:!min-w-0 !min-w-[150px] pt-[14px] pb-[13px] text-sm text-dark font-medium'>{ticket.time_used || "—"}</td>
                  <td className='md:!min-w-0 !min-w-[150px] pt-[14px] pb-[13px] text-sm text-dark font-medium'>{ticket.created}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        </div>
        </div>

        <Pagination 
          query={''}
          page={page}
          pages={pages}
        />
      </div>
    </>
  );
}
