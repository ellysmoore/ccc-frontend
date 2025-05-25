'use client'

import { Pagination } from "@/components";
import { Button } from "@/components/Button";
import { SearchBar } from "@/components/common/SearchBar";
import { ConfirmModal } from "@/components/ConfirmModal";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { FaEdit, FaPenAlt, FaSearch, FaTrash, FaUserPlus } from "react-icons/fa";

// type Service = {
//   id: string;
//   name: string;
// };

export default function ServicesPage() {
  const [showModal, setShowModal] = useState('');
  const [page, setPage] = useState(1);
  const [pages, setPages] = useState(3);
  const [services, setServices] = useState([
    {
      id: "1",
      name: "Service 1",
    },
    {
      id: "2",
      name: "Service 2",
    },
  ]);
  const router = useRouter();
  const [query, setQuery] = useState("");

  useEffect(() => {
    const url = new URLSearchParams(window.location.search);
    const q = url.get("q");

    if (q) setQuery(q || "");
  }, []);

  const handleQuery = (value: string) => {
    setQuery(value);
    router.push(`/admin/services?q=${value}`);
  }

  const handleDelete = () => {
    // TODO: Handle status here
  }

  return (
    <>
      <div className="lg:px-6">
        <div className="flex flex-col sm:flex-row sm:items-center gap-[20px] sm:justify-between mb-6">
          <h1 className="text-2xl font-semibold text-gray-800">
            {query ? `Search results for "${query}"` : "Services"}
          </h1>
          <Button
            href="/admin/services/new_service"
            containerClassName="!w-fit"
            label={
              <div className="w-fit flex items-center gap-[5px]">
                <FaPenAlt className="mr-2 text-white/70" /> New Service
              </div>
            }
          />
        </div>

        <SearchBar
          placeholder="Search..."
          name="search_module"
          value={query}
          setValue={(value) => handleQuery(value)}
          containerClassName="lg:!flex !hidden !w-[350px] lg:!w-[400px]"
        />

        <div className='w-full flex flex-col'>
          <div className='w-full h-full bg-white rounded-[12px] border border-[#D9D9D9] mt-4'>
            <div className='border-b border-[#D9D9D9] relative min-h-[120px] !overflow-x-auto w-full'>
              <table className="min-w-max w-full">
                <thead>
                  <tr className='border-b border-[#D9D9D9]'>
                    <th className='text-[#6B6968] md:!min-w-0 !min-w-[50px] !text-left font-medium text-sm py-[14px] pl-[19px]'>#</th>
                <th className='text-[#6B6968] md:!min-w-0 !min-w-[150px] !text-left font-medium text-sm py-[14px]'>Name</th>
                <th className='text-[#6B6968] md:!min-w-0 !min-w-[150px] !text-left font-medium text-sm py-[14px]'>Actions</th>
              </tr>
            </thead>
            <tbody>
              {services.map((service, index) => (
                <tr
                  key={service.id}
                  className='border-b border-[#F5F5F5] smooth'
                    >
                      <td className='md:!min-w-0 !min-w-[50px] pl-5 pt-[14px] pb-[13px] text-sm text-dark font-medium'>{index + 1}</td>
                  <td className='md:!min-w-0 !min-w-[150px] pt-[14px] pb-[13px] text-sm text-dark font-medium'>{service.name}</td>
                  <td className="md:!min-w-0 !min-w-[150px] pt-[14px] pb-[13px] text-sm text-dark font-medium pr-[8px]">
                    <div className="w-fit flex text-[#CCC] items-center gap-[8px]">
                      <Link href={`/admin/services/edit_service/${service.id}`} title="Edit">
                        <FaEdit size={17} className="text-orange-500" />
                      </Link>|
                      <button
                        onClick={() => setShowModal('delete')}
                        title="Delete"
                        className="cursor-pointer"
                      >
                        <FaTrash size={17} className="text-orange-500" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        </div>
        </div>

        <Pagination 
          query={query}
          page={page}
          pages={pages}
        />
      </div>

      <ConfirmModal 
        title={showModal == 'delete' ? 'Delete service' : ''}
        body={showModal == 'delete' ? 'Are you sure you want to delete this service?' : ''}
        isOpen={showModal == 'delete'}
        onClose={() => setShowModal('')}
        handleConfirm={handleDelete}
      />
    </>
  );
}