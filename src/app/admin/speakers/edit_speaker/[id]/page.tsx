"use client";

import { Button } from "@/components/Button";
import { InputElement } from "@/components/forms/InputElement";
import { TextareaElement } from "@/components/forms/TextareaElement";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { FaChevronLeft } from "react-icons/fa";

export default function EditSpeakerPage() {
  const { id } = useParams();
  const [speaker, setSpeaker] = useState(null);

  useEffect(() => {
    // MAKE API CALL HERE
    setSpeaker({});
  }, [id]);

  const [form, setForm] = useState({
    title: "",
    name: "",
    short_bio: "",
    long_bio: "",
  });

  useEffect(() => {
    setForm({
      title: speaker?.title || "",
      name: speaker?.name || "",
      short_bio: speaker?.short_bio || "",
      long_bio: speaker?.long_bio || "",
    })
  }, [speaker])

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
          href={'/admin/speakers'}
        >
          <FaChevronLeft size={13} />
        </Link>

        <h1 className="!text-2xl font-semibold text-[#222]">
          Edit Speaker
        </h1>
      </div>

      <form onSubmit={handleSubmit} className="w-full flex flex-col md:grid grid-cols-2 gap-x-[40px] gap-[20px] md:gap-y-[27px]">
        <InputElement 
          value={form?.title}
          name='title'
          type='text'
          onChangeEvent={(e) => handleChange(e)}
          placeholder='Enter title'
          fieldClassName="!rounded-[12px]"
          inputClassName='!py-[15px]'
          required
          label='Title'
        />
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
          value={form?.short_bio}
          name='short_bio'
          type='text'
          onChangeEvent={(e) => handleChange(e)}
          placeholder='Enter short bio'
          fieldClassName="!rounded-[12px]"
          inputClassName='!py-[15px]'
          required
          label='Short bio'
        />
        <TextareaElement
          value={form?.long_bio}
          name='long_bio'
          onChangeEvent={(e) => handleChange(e)}
          placeholder='Enter long bio'
          required
          fieldClassName="!py-[15px]"
          rows={6}
          containerClassName="col-span-2"
          label='Long bio'
        />

        <div className="col-span-2 flex-col md:flex-row flex items-center justify-end gap-[15px] pt-4">
          <Button 
            type='submit'
            label='Update & Publish'
            containerClassName="w-full md:!w-[200px]"
          />
        </div>
      </form>
    </div>
  );
}