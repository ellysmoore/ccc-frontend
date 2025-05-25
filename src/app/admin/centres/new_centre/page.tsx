"use client";

import { Button } from "@/components/Button";
import { InputElement } from "@/components/forms/InputElement";
import { TextareaElement } from "@/components/forms/TextareaElement";
import Link from "next/link";
import { useState } from "react";
import { FaChevronLeft } from "react-icons/fa";

export default function NewSpeakerPage() {
  const [form, setForm] = useState({
    name: "",
    slug: "",
    address: "",
    directions: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLTextAreaElement>) => {
    const { name, value } = e.target;
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
          href={'/admin/centres'}
        >
          <FaChevronLeft size={13} />
        </Link>

        <h1 className="!text-2xl font-semibold text-[#222]">
          New Centre
        </h1>
      </div>

      <form onSubmit={handleSubmit} className="w-full flex flex-col md:grid grid-cols-2 gap-x-[40px] gap-[20px] md:gap-y-[27px]">
        <InputElement 
          value={form?.name}
          name='name'
          type='text'
          onChangeEvent={(e) => handleChange(e)}
          placeholder='Enter name'
          fieldClassName="!rounded-[12px]"
          inputClassName='!py-[15px]'
          required
          label='Name'
        />
        <InputElement 
          value={form?.slug}
          name='slug'
          type='text'
          onChangeEvent={(e) => handleChange(e)}
          placeholder='Enter slug'
          fieldClassName="!rounded-[12px]"
          inputClassName='!py-[15px]'
          required
          label='Slug'
        />
        <TextareaElement 
          value={form?.address}
          name='address'
          onChangeEvent={(e) => handleChange(e)}
          placeholder='Enter address'
          fieldClassName="!py-[15px]"
          rows={6}
          containerClassName="col-span-2"
          required
          label='Address'
        />
        <TextareaElement 
          value={form?.directions}
          name='directions'
          onChangeEvent={(e) => handleChange(e)}
          placeholder='Enter directions'
          fieldClassName="!py-[15px]"
          rows={6}
          containerClassName="col-span-2"
          required
          label='Directions'
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