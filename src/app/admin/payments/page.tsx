'use client'

import { Pagination } from "@/components";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { FaEye, FaSearch } from "react-icons/fa";

// type User = {
//   id: string;
//   post_data: string;
//   balance: number;
//   amount: string;
//   payment_status_id: string;
//   created: string;
// };

export default function PaymentsPage() {
  const [page, setPage] = useState(1);
  const [pages, setPages] = useState(1);
  const [payments, setPayments] = useState([
    {
      id: "1",
      post_data: "john@example.com",
      balance: 5000,
      amount: 3000,
      payment_status_id: 'paymentID',
      created: "2024-04-20 09:00",
    },
    {
      id: "2",
      post_data: "jane@example.com",
      balance: 5000,
      amount: 3000,
      payment_status_id: 'paymentID',
      created: "2024-04-20 09:00",
    },
  ]);
  const router = useRouter();
  const [query, setQuery] = useState("");

  useEffect(() => {
    const url = new URLSearchParams(window.location.search);
    setQuery(url.get("q") || "");
  }, []);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    router.push(`/admin/payments?q=${query}`);
  };

  return (
    <>
      <div className="p-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6">
          <h1 className="text-2xl font-semibold text-gray-800">
            {query ? `Search results for "${query}"` : "Payments"}
          </h1>
        </div>

        <form onSubmit={handleSearch} className="mb-4">
          <div className="flex rounded shadow-sm overflow-hidden max-w-md">
            <input
              type="text"
              placeholder="Search..."
              className="w-full px-3 py-2 border border-gray-300 focus:outline-none"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
            <button
              type="submit"
              className="bg-blue-600 text-white px-4 hover:bg-blue-700"
            >
              <FaSearch />
            </button>
          </div>
        </form>

        <div className="overflow-x-auto bg-white shadow rounded-lg">
          <table className="w-full table-auto text-sm text-left text-gray-700">
            <thead className="bg-gray-100">
              <tr>
                <th className="px-4 py-2">#</th>
                <th className="px-4 py-2">Transaction Reference</th>
                <th className="px-4 py-2">Amount</th>
                <th className="px-4 py-2">Status</th>
                <th className="px-4 py-2">Date</th>
                <th className="px-4 py-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {payments.map((payment, index) => (
                <tr
                  key={payment.id}
                  className="border-t hover:bg-gray-50 transition-colors"
                >
                  <td className="px-4 py-2">{index + 1}</td>
                  <td className="px-4 py-2">{payment.post_data}</td>
                  <td className="px-4 py-2">{payment.amount}</td>
                  <td className="px-4 py-2">{payment.payment_status_id}</td>
                  <td className="px-4 py-2">{payment.created}</td>
                  <td className="px-4 py-2 space-x-2">
                    <Link href={`/admin/payments/${payment.id}`} title="View">
                      <FaEye className="text-blue-500" />
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <Pagination 
          query={query}
          page={page}
          pages={pages}
        />
      </div>
    </>
  );
}
