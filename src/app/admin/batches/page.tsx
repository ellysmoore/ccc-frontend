'use client'

import { Pagination } from "@/components";
import { ConfirmModal } from "@/components/ConfirmModal";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { FaEdit, FaEye, FaPlus, FaSearch, FaTrash } from "react-icons/fa";

// type Speaker = {
//   id: string;
//   batch_no: string;
//   number: string;
//   price: string;
//   info: string;
//   is_generated: boolean;
//   created: boolean;
// };

export default function SpeakersPage() {
  const [showModal, setShowModal] = useState('');
  const [page, setPage] = useState(1);
  const [pages, setPages] = useState(1);
  const [batches, setBatches] = useState([
    {
      id: "1",
      batch_no: "1",
      number: "1234566",
      price: "Parent 1",
      info: "John Doe",
      is_generated: true,
      created: ''
    },
    {
      id: "2",
      batch_no: "2",
      number: "1234566",
      price: "Parent 2",
      info: "Jane Smith",
      is_generated: false,
      created: ''
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
    router.push(`/admin/batches?q=${query}`);
  };

  const handleDelete = () => {
    // TODO: Handle status here
  }

  return (
    <>
      <div className="p-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6">
          <h1 className="text-2xl font-semibold text-gray-800">
            {query ? `Search results for "${query}"` : "Batches"}
          </h1>
          <Link
            href="/admin/batches/new_batch"
            className="mt-2 sm:mt-0 inline-flex items-center px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded shadow hover:bg-blue-700"
          >
            <FaPlus className="mr-2 text-white/70" /> New Batch
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
                <th className="px-4 py-2">Batch #</th>
                <th className="px-4 py-2">Number</th>
                <th className="px-4 py-2">Price</th>
                <th className="px-4 py-2">Info</th>
                <th className="px-4 py-2">Is Generated</th>
                <th className="px-4 py-2">Created</th>
                <th className="px-4 py-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {batches.map((batch, index) => (
                <tr
                  key={batch.id}
                  className="border-t hover:bg-gray-50 transition-colors"
                >
                  <td className="px-4 py-2">{index + 1}</td>
                  <td className="px-4 py-2">{batch.batch_no}</td>
                  <td className="px-4 py-2">{batch.number}</td>
                  <td className="px-4 py-2">{batch.price}</td>
                  <td className="px-4 py-2">{batch.info}</td>
                  <td className="px-4 py-2">{batch.is_generated ? 'Yes' : 'No'}</td>
                  <td className="px-4 py-2">{batch.created}</td>
                  <td className="px-4 py-2 space-x-2">
                    <Link href={`/admin/batches/${batch.id}`} title="Edit">
                      <FaEye className="text-blue-500" />
                    </Link>
                    <Link href={`/admin/batches/edit_batch/${batch.id}`} title="Edit">
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
        title={showModal == 'delete' ? 'Delete batch' : ''}
        body={showModal == 'delete' ? 'Are you sure you want to delete this batch?' : ''}
        isOpen={showModal == 'delete'}
        onClose={() => setShowModal('')}
        handleConfirm={handleDelete}
      />
    </>
  );
}