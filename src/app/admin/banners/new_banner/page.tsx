"use client";

import { Button } from "@/components/Button";
import { FileUploader } from "@/components/forms/FileUploader";
import { InputElement } from "@/components/forms/InputElement";
import Link from "next/link";
import { useState } from "react";
import { FaChevronLeft } from "react-icons/fa";

export default function NewMessagePage() {
  const [file, setFile] = useState<File | null>(null);
  const [form, setForm] = useState({
    caption: "",
  });

  // eslint-disable-next-line
  const handleChange = (name: string, value: any) => {
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
  }

  return (
    <div className='w-full lg:px-6 lg:max-w-[800px] flex flex-col gap-6 h-full'>
      <div className="flex items-center gap-[20px]">
        <Link
          className='w-[40px] h-[40px] bg-[#EAEAEA] rounded-full grid place-items-center bg-opacity-40'
          href={'/admin/banners'}
        >
          <FaChevronLeft size={13} />
        </Link>

        <h1 className="!text-2xl font-semibold text-[#222]">
          New Banner
        </h1>
      </div>

      <form onSubmit={handleSubmit} className="w-full flex flex-col gap-[20px] md:gap-y-[27px]">
        <FileUploader 
          name="file"
          value={file}
          onChange={(file) => setFile(file ?? null)}
          required
          uploadClassName="!rounded-[12px]"
          allowedFileTypes={['image/*']}
          label='File'
        />
        <InputElement 
          value={form?.caption}
          name='caption'
          type='text'
          onChangeEvent={(e) => handleChange(e.target.name, e.target.value)}
          placeholder='Enter caption'
          required
          fieldClassName="!rounded-[12px]"
          inputClassName='!py-[15px]'
          label='Caption'
        />

        <div className="col-span-2 flex-col md:flex-row flex items-center justify-end gap-[15px] pt-4">
          <Button 
            type='submit'
            label='Publish'
            containerClassName="w-full md:!w-[150px]"
          />
        </div>
      </form>
    </div>
  );
}