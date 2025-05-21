'use client'

import { Pagination } from "@/components";
import { ConfirmModal } from "@/components/ConfirmModal";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { FaEdit, FaExternalLinkAlt, FaPenAlt, FaSearch, FaTrash } from "react-icons/fa";

// type Message = {
//   id: string;/   topic: string;
//   date: string;
//   published: boolean;
// };

export default function MessagesPage() {
  const [showModal, setShowModal] = useState('');
  const [page, setPage] = useState(1);
  const [pages, setPages] = useState(1);
  const [messages, setMessages] = useState([
    {
      id: "1",
      topic: "Message 1",
      date: "2024-05-01 12:30",
      published: true,
    },
    {
      id: "2",
      topic: "Message 2",
      date: "2024-05-01 12:30",
      published: false,
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
    router.push(`/admin/messages?q=${query}`);
  };

  const handleDelete = () => {
    // TODO: Handle status here
  }

  return (
    <>
      <div className="p-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6">
          <h1 className="text-2xl font-semibold text-gray-800">
            {query ? `Search results for "${query}"` : "Messages"}
          </h1>
          <Link
            href="/admin/messages/new_message"
            className="mt-2 sm:mt-0 inline-flex items-center px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded shadow hover:bg-blue-700"
          >
            <FaPenAlt className="mr-2 text-white/70" /> New Message
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
                <th className="px-4 py-2">Title</th>
                <th className="px-4 py-2">Date Created</th>
                <th className="px-4 py-2">Published</th>
                <th className="px-4 py-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {messages.map((message, index) => (
                <tr
                  key={message.id}
                  className="border-t hover:bg-gray-50 transition-colors"
                >
                  <td className="px-4 py-2">{index + 1}</td>
                  <td className="px-4 py-2">{message.topic?.replace(/_/g, ' ')}</td>
                  <td className="px-4 py-2">{message.date}</td>
                  <td className="px-4 py-2">{message.published}</td>
                  <td className="px-4 py-2 space-x-2">
                    <Link href={`/messages/${message.id}`} target="_blank" title="View">
                      <FaExternalLinkAlt className="text-blue-500" />
                    </Link>
                    <Link href={`/admin/messages/edit_message/${message.id}`} title="Edit">
                      <FaEdit className="text-blue-500" />
                    </Link>
                    <button
                      onClick={() => setShowModal('delete')}
                      title="Delete"
                    >
                      <FaTrash className="text-red-500" />
                    </button>
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
        title={showModal == 'delete' ? 'Delete message' : ''}
        body={showModal == 'delete' ? 'Are you sure you want to delete this message?' : ''}
        isOpen={showModal == 'delete'}
        onClose={() => setShowModal('')}
        handleConfirm={handleDelete}
      />
    </>
  );
}
