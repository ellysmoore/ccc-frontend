'use client'

import { Pagination } from "@/components";
import { ConfirmModal } from "@/components/ConfirmModal";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { FaBan, FaCheck, FaEdit, FaSearch, FaUserPlus } from "react-icons/fa";

// type User = {
//   uid: string;
//   first_name: string;
//   last_name: string;
//   email: string;
//   balance: number;
//   last_login: string;
//   send_newsletter: boolean;
//   is_active: boolean;
// };

export default function UsersPage() {
  const [showModal, setShowModal] = useState('');
  const [page, setPage] = useState(1);
  const [pages, setPages] = useState(1);
  const [users, setUsers] = useState([
    {
      uid: "1",
      first_name: "John",
      last_name: "Doe",
      email: "john@example.com",
      balance: 5000,
      last_login: "2024-05-01 12:30",
      send_newsletter: true,
      is_active: true,
    },
    {
      uid: "2",
      first_name: "Jane",
      last_name: "Smith",
      email: "jane@example.com",
      balance: 2000,
      last_login: "2024-04-20 09:00",
      send_newsletter: false,
      is_active: false,
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
    router.push(`/admin/users?q=${query}`);
  };

  const handleStatus = () => {
    // TODO: Handle status here
  }

  return (
    <>
      <div className="p-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6">
          <h1 className="text-2xl font-semibold text-gray-800">
            {query ? `Search results for "${query}"` : "Users"}
          </h1>
          <Link
            href="/admin/users/new_user"
            className="mt-2 sm:mt-0 inline-flex items-center px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded shadow hover:bg-blue-700"
          >
            <FaUserPlus className="mr-2 text-white/70" /> New User
          </Link>
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
                <th className="px-4 py-2">Name</th>
                <th className="px-4 py-2">Email</th>
                <th className="px-4 py-2">Balance</th>
                <th className="px-4 py-2">Last Login</th>
                <th className="px-4 py-2">Send Newsletter</th>
                <th className="px-4 py-2">Active</th>
                <th className="px-4 py-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user, index) => (
                <tr
                  key={user.uid}
                  className="border-t hover:bg-gray-50 transition-colors"
                >
                  <td className="px-4 py-2">{index + 1}</td>
                  <td className="px-4 py-2 text-blue-600">
                    <Link href={`/admin/users/${user.uid}`}>
                      {user.first_name} {user.last_name}
                    </Link>
                  </td>
                  <td className="px-4 py-2">{user.email}</td>
                  <td className="px-4 py-2">
                    {Number(user.balance).toLocaleString()}
                  </td>
                  <td className="px-4 py-2">{user.last_login}</td>
                  <td className="px-4 py-2">{user.send_newsletter ? "Yes" : "No"}</td>
                  <td className="px-4 py-2">{user.is_active ? "Yes" : "No"}</td>
                  <td className="px-4 py-2 space-x-2">
                    <Link href={`/admin/users/${user.uid}/edit_user`} title="Edit">
                      <FaEdit className="text-blue-500" />
                    </Link>
                    {user.is_active ? (
                      <button
                        onClick={() => setShowModal('deactivate')}
                        title="Deactivate"
                      >
                        <FaBan className="text-red-500" />
                      </button>
                    ) : (
                      <button
                        onClick={() => setShowModal('activate')}
                        title="Activate"
                      >
                        <FaCheck className="text-green-500" />
                      </button>
                    )}
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

      <ConfirmModal 
        title={showModal == 'activate' ? 'Activate user' : 'Deactivate user'}
        body={showModal == 'activate' ? 'Are you sure you want to activate this user?' : 'Are you sure you want to deactivate this user?'}
        isOpen={showModal == 'activate' || showModal == 'deactivate'}
        onClose={() => setShowModal('')}
        handleConfirm={handleStatus}
      />
    </>
  );
}
