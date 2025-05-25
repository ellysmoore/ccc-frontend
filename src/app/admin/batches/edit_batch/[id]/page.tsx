"use client";

import { Button } from "@/components/Button";
import { InputElement } from "@/components/forms/InputElement";
import { SelectElement } from "@/components/forms/SelectElement";
import { TextareaElement } from "@/components/forms/TextareaElement";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { FaChevronLeft } from "react-icons/fa";

export default function NewBatchPage() {
  const { id } = useParams();
  type Batch = {
    numbers?: string;
    price?: string;
    info?: string;
    title?: string;
  };

  const [batch, setBatch] = useState<Batch | null>(null);

  useEffect(() => {
    // MAKE API CALL HERE
    setBatch({});
  }, [id]);

  const [form, setForm] = useState({
    numbers: "",
    price: "",
    info: "",
  });

  useEffect(() => {
    setForm({
      numbers: batch?.numbers || "",
      price: batch?.price || "",
      info: batch?.info || "",
    })
  }, [batch])

  const numbersList = [
    { label: '1', value: '1' },
    { label: '2', value: '2' },
    { label: '3', value: '3' },
    { label: '4', value: '4' },
    { label: '5', value: '5' },
    { label: '6', value: '6' },
    { label: '7', value: '7' },
  ];

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
          href={'/admin/batches'}
        >
          <FaChevronLeft size={13} />
        </Link>

        <h1 className="!text-2xl font-semibold text-[#222]">
          Edit {batch?.title}
        </h1>
      </div>

      <form onSubmit={handleSubmit} className="w-full flex flex-col md:grid grid-cols-2 gap-x-[40px] gap-[20px] md:gap-y-[27px]">
        <SelectElement 
          name="numbers"
          value={form?.numbers}
          label='Number of Tickets'
          // onChange={(value) => handleChange('numbers', value)}
          placeholder="Select number of tickets"
          disabled
          fieldClassName="!rounded-[12px] !py-[13px]"
          required
          options={numbersList}
        />
        <InputElement 
          value={form?.price}
          name='price'
          type='number'
          // onChangeEvent={(e) => handleChange(e.target.name, e.target.value)}
          placeholder='Enter price'
          disabled
          fieldClassName="!rounded-[12px]"
          inputClassName='!py-[15px]'
          required
          label='Price'
        />
        <TextareaElement
          value={form?.info}
          name='info'
          onChangeEvent={(e) => handleChange(e.target.name, e.target.value)}
          placeholder='Enter info'
          required
          fieldClassName="!py-[15px]"
          rows={6}
          containerClassName="col-span-2"
          label='Ticket Info'
        />

        <div className="col-span-2 flex-col md:flex-row flex items-center justify-end gap-[15px] pt-4">
          <Button 
            type='submit'
            label='Update'
            containerClassName="w-full md:!w-[150px]"
          />
        </div>
      </form>
    </div>
  );
}