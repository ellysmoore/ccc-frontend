'use client'

import { Pagination } from "@/components";
import { Button } from "@/components/Button";
import { SearchBar } from "@/components/common/SearchBar";
import { ConfirmModal } from "@/components/ConfirmModal";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { FaEdit, FaEye, FaPlus, FaTrash } from "react-icons/fa";

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

  // TODO: REMOVE LATER
  console.log(setPage, setPages, setBatches);

  const router = useRouter();
  const [query, setQuery] = useState("");

  useEffect(() => {
    const url = new URLSearchParams(window.location.search);
    const q = url.get("q");

    if (q) setQuery(q || "");
  }, []);

  const handleQuery = (value: string) => {
    setQuery(value);
    router.push(`/admin/batches?q=${value}`);
  }

  const handleDelete = () => {
    // TODO: Handle status here
  }

  return (
    <>
      <div className="lg:px-6">
        <div className="flex flex-col sm:flex-row sm:items-center gap-[20px] sm:justify-between mb-6">
          <h1 className="text-2xl font-semibold text-gray-800">
            {query ? `Search results for "${query}"` : "Batches"}
          </h1>
          
          <Button
            href="/admin/batches/new_batch"
            containerClassName="!w-fit"
            label={
              <div className="w-fit flex items-center gap-[5px]">
                <FaPlus className="mr-2 text-white/70" /> New Batch
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
                    <th className='text-[#6B6968] md:!min-w-0 !min-w-[50px] !text-left font-medium text-sm py-[14px] pl-[19px]'>Batch #</th>
                <th className='text-[#6B6968] md:!min-w-0 !min-w-[150px] !text-left font-medium text-sm py-[14px]'>Number</th>
                <th className='text-[#6B6968] md:!min-w-0 !min-w-[150px] !text-left font-medium text-sm py-[14px]'>Price</th>
                <th className='text-[#6B6968] md:!min-w-0 !min-w-[150px] !text-left font-medium text-sm py-[14px]'>Info</th>
                <th className='text-[#6B6968] md:!min-w-0 !min-w-[150px] !text-left font-medium text-sm py-[14px]'>Is Generated</th>
                <th className='text-[#6B6968] md:!min-w-0 !min-w-[150px] !text-left font-medium text-sm py-[14px]'>Created</th>
                <th className='text-[#6B6968] md:!min-w-0 !min-w-[150px] !text-left font-medium text-sm py-[14px]'>Actions</th>
              </tr>
            </thead>
            <tbody>
              {batches.map((batch, index) => (
                <tr
                  key={batch.id}
                  className='border-b border-[#F5F5F5] smooth'
                    >
                      <td className='md:!min-w-0 !min-w-[50px] pl-5 pt-[14px] pb-[13px] text-sm text-dark font-medium'>{index + 1}</td>
                  <td className='md:!min-w-0 !min-w-[150px] pt-[14px] pb-[13px] text-sm text-dark font-medium'>{batch.batch_no}</td>
                  <td className='md:!min-w-0 !min-w-[150px] pt-[14px] pb-[13px] text-sm text-dark font-medium'>{batch.number}</td>
                  <td className='md:!min-w-0 !min-w-[150px] pt-[14px] pb-[13px] text-sm text-dark font-medium'>{batch.price}</td>
                  <td className='md:!min-w-0 !min-w-[150px] pt-[14px] pb-[13px] text-sm text-dark font-medium'>{batch.info}</td>
                  <td className='md:!min-w-0 !min-w-[150px] pt-[14px] pb-[13px] text-sm text-dark font-medium'>{batch.is_generated ? 'Yes' : 'No'}</td>
                  <td className='md:!min-w-0 !min-w-[150px] pt-[14px] pb-[13px] text-sm text-dark font-medium'>{batch.created}</td>
                  <td className="md:!min-w-0 !min-w-[150px] pt-[14px] pb-[13px] text-sm text-dark font-medium pr-[8px]">
                        <div className="w-fit flex text-[#CCC] items-center gap-[8px]">
                    <Link href={`/admin/batches/${batch.id}`} title="Edit">
                      <FaEye size={17} className="text-orange-500" />
                    </Link>|
                    <Link href={`/admin/batches/edit_batch/${batch.id}`} title="Edit">
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
        title={showModal == 'delete' ? 'Delete batch' : ''}
        body={showModal == 'delete' ? 'Are you sure you want to delete this batch?' : ''}
        isOpen={showModal == 'delete'}
        onClose={() => setShowModal('')}
        handleConfirm={handleDelete}
      />
    </>
  );
}