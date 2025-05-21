'use client'

import { Pagination } from "@/components";
import { ConfirmModal } from "@/components/ConfirmModal";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { FaPlus, FaTrash } from "react-icons/fa";

// type Speaker = {
//   id: string;
//   image: string;
//   caption: string;
//   created: string;
// };

export default function SpeakersPage() {
  const [showModal, setShowModal] = useState('');
  const [page, setPage] = useState(1);
  const [pages, setPages] = useState(1);
  const [banners, setBanners] = useState([
    {
      id: "1",
      image: "2",
      caption: "",
      created: ''
    },
    {
      id: "2",
      image: "2",
      caption: "",
      created: ''
    },
  ]);

  const handleDelete = () => {
    // TODO: Handle status here
  }

  return (
    <>
      <div className="p-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6">
          <h1 className="text-2xl font-semibold text-gray-800">
            Banners
          </h1>
          <Link
            href="/admin/banner/new_banner"
            className="mt-2 sm:mt-0 inline-flex items-center px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded shadow hover:bg-blue-700"
          >
            <FaPlus className="mr-2 text-white/70" /> New Banner
          </Link>
        </div>

        <div className="overflow-x-auto bg-white shadow rounded-lg">
          <table className="w-full table-auto text-sm text-left text-gray-700">
            <thead className="bg-gray-100">
              <tr>
                <th className="px-4 py-2">#</th>
                <th className="px-4 py-2">Image</th>
                <th className="px-4 py-2">Date Uploaded</th>
                <th className="px-4 py-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {banners.map((banner, index) => (
                <tr
                  key={banner.id}
                  className="border-t hover:bg-gray-50 transition-colors"
                >
                  <td className="px-4 py-2">{index + 1}</td>
                  <td className="px-4 py-2">
                    <div className="relative w-[24px] h-[24px] object-contain">
                      <Image 
                        src={banner.image}
                        alt={banner?.caption}
                        fill
                      />
                    </div>
                  </td>
                  <td className="px-4 py-2">{banner.created}</td>
                  <td className="px-4 py-2 space-x-2">
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
          query={''}
          page={page}
          pages={pages}
        />
      </div>

      <ConfirmModal 
        title={showModal == 'delete' ? 'Delete banner' : ''}
        body={showModal == 'delete' ? 'Are you sure you want to delete this banner?' : ''}
        isOpen={showModal == 'delete'}
        onClose={() => setShowModal('')}
        handleConfirm={handleDelete}
      />
    </>
  );
}