'use client'

import { Pagination } from "@/components";
import { useState } from "react";

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
      <div className="p-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6">
          <h1 className="text-2xl font-semibold text-gray-800">
            Tickets
          </h1>

          <button
            onClick={handleExport}
            className="mt-2 sm:mt-0 inline-flex items-center px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded shadow hover:bg-blue-700"
          >
            Export Tickets
          </button>
        </div>

        <div className="overflow-x-auto bg-white shadow rounded-lg">
          <table className="w-full table-auto text-sm text-left text-gray-700">
            <thead className="bg-gray-100">
              <tr>
                <th className="px-4 py-2">Serial</th>
                <th className="px-4 py-2">PIN</th>
                <th className="px-4 py-2">Credit</th>
                <th className="px-4 py-2">Usage</th>
                <th className="px-4 py-2">Time Used</th>
                <th className="px-4 py-2">Created</th>
              </tr>
            </thead>
            <tbody>
              {tickets.map((ticket, index) => (
                <tr
                  key={index}
                  className="border-t hover:bg-gray-50 transition-colors"
                >
                  <td className="px-4 py-2">{locals?.batch_no}</td>
                  <td className="px-4 py-2">{ticket.pin}</td>
                  <td className="px-4 py-2">{ticket.credit}</td>
                  <td className="px-4 py-2">{ticket.is_used ? "Used" : "Unused"}</td>
                  <td className="px-4 py-2">{ticket.time_used || "—"}</td>
                  <td className="px-4 py-2">{ticket.created}</td>
                </tr>
              ))}
            </tbody>
          </table>
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
