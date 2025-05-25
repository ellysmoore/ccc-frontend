'use client'

import { Pagination } from "@/components";
import { Button } from "@/components/Button";
import { ConfirmModal } from "@/components/ConfirmModal";
import Image from "next/image";
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
      image: "/images/20190425_M_Obtaining_God_s_Help.mp3.jpg",
      caption: "",
      created: ''
    },
    {
      id: "2",
      image: "/images/20190425_M_Obtaining_God_s_Help.mp3.jpg",
      caption: "",
      created: ''
    },
  ]);

  // TODO: REMOVE LATER
  console.log(setPage, setPages, setBanners);

  const handleDelete = () => {
    // TODO: Handle status here
  }

  return (
    <>
      <div className="lg:px-6">
        <div className="flex flex-col sm:flex-row sm:items-center gap-[20px] sm:justify-between mb-6">
          <h1 className="text-2xl font-semibold text-gray-800">
            Banners
          </h1>
          
          <Button
            href="/admin/banners/new_banner"
            containerClassName="!w-fit"
            label={
              <div className="w-fit flex items-center gap-[5px]">
                <FaPlus className="mr-2 text-white/70" /> New Banner
              </div>
            }
          />
        </div>

        <div className='w-full flex flex-col'>
          <div className='w-full h-full bg-white rounded-[12px] border border-[#D9D9D9] mt-4'>
            <div className='border-b border-[#D9D9D9] relative min-h-[120px] !overflow-x-auto w-full'>
              <table className="min-w-max w-full">
                <thead>
                  <tr className='border-b border-[#D9D9D9]'>
                    <th className='text-[#6B6968] md:!min-w-0 !min-w-[50px] !text-left font-medium text-sm py-[14px] pl-[19px]'>#</th>
                <th className='text-[#6B6968] md:!min-w-0 !min-w-[150px] !text-left font-medium text-sm py-[14px]'>Image</th>
                <th className='text-[#6B6968] md:!min-w-0 !min-w-[150px] !text-left font-medium text-sm py-[14px]'>Date Uploaded</th>
                <th className='text-[#6B6968] md:!min-w-0 !min-w-[150px] !text-left font-medium text-sm py-[14px]'>Actions</th>
              </tr>
            </thead>
            <tbody>
              {banners.map((banner, index) => (
                <tr
                  key={banner.id}
                  className='border-b border-[#F5F5F5] smooth'
                    >
                      <td className='md:!min-w-0 !min-w-[50px] pl-5 pt-[14px] pb-[13px] text-sm text-dark font-medium'>{index + 1}</td>
                  <td className='md:!min-w-0 !min-w-[150px] pt-[14px] pb-[13px] text-sm text-dark font-medium'>
                    <div className="relative w-[100px] h-[150px] object-contain">
                      <Image 
                        src={banner.image}
                        alt={banner?.caption}
                        fill
                        className="object-contain"
                      />
                    </div>
                  </td>
                  <td className="md:!min-w-0 !min-w-[150px] pt-[14px] pb-[13px] text-sm text-dark font-medium">{banner.created}</td>
                  <td className="md:!min-w-0 !min-w-[150px] pt-[14px] pb-[13px] text-sm text-dark font-medium pr-[8px]">
                        <div className="w-fit flex text-[#CCC] items-center gap-[8px]">
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