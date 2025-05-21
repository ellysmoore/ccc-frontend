'use client'

import { Pagination } from "@/components";
import { ConfirmModal } from "@/components/ConfirmModal";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { FaEdit, FaPenAlt, FaSearch, FaTrash } from "react-icons/fa";

// type User = {
//   id: string;
//   name: string;
//   address: string;
// };

export default function CentresPage() {
  const [showModal, setShowModal] = useState('');
  const [page, setPage] = useState(1);
  const [pages, setPages] = useState(1);
  const [centres, setCentres] = useState([
    {
      id: "1",
      name: "Centre 1",
      address: "Address 1",
    },
    {
      id: "2",
      name: "Centre 2",
      address: "Address 2"
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
    router.push(`/admin/centres?q=${query}`);
  };

  const handleDelete = () => {
    // TODO: Handle status here
  }

  return (
    <>
      <div className="p-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6">
          <h1 className="text-2xl font-semibold text-gray-800">
            {query ? `Search results for "${query}"` : "Centres"}
          </h1>
          <Link
            href="/admin/centres/new_centre"
            className="mt-2 sm:mt-0 inline-flex items-center px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded shadow hover:bg-blue-700"
          >
            <FaPenAlt className="mr-2 text-white/70" /> New Centre
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
                <th className="px-4 py-2">Address</th>
                <th className="px-4 py-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {centres.map((centre, index) => (
                <tr
                  key={centre.id}
                  className="border-t hover:bg-gray-50 transition-colors"
                >
                  <td className="px-4 py-2">{index + 1}</td>
                  <td className="px-4 py-2">{centre.name}</td>
                  <td className="px-4 py-2">{centre.address}</td>
                  <td className="px-4 py-2 space-x-2">
                    <Link href={`/admin/centre/edit_centre/${centre.id}`} title="Edit">
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
        title={showModal == 'delete' ? 'Delete centre' : ''}
        body={showModal == 'delete' ? 'Are you sure you want to delete this centre?' : ''}
        isOpen={showModal == 'delete'}
        onClose={() => setShowModal('')}
        handleConfirm={handleDelete}
      />
    </>
  );
}
