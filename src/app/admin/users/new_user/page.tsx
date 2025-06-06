"use client";

import { Button } from "@/components/Button";
import { InputElement } from "@/components/forms/InputElement";
import Link from "next/link";
import { useState } from "react";
import { FaChevronLeft } from "react-icons/fa";

export default function NewUserPage() {
  const [form, setForm] = useState({
    first_name: "",
    last_name: "",
    email: "",
    mobile: "",
    password: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
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
          href={'/admin/users'}
        >
          <FaChevronLeft size={13} />
        </Link>

        <h1 className="!text-2xl font-semibold text-[#222]">
          New User
        </h1>
      </div>

      <form onSubmit={handleSubmit} className="w-full flex flex-col md:grid grid-cols-2 gap-x-[40px] gap-[20px] md:gap-y-[27px]">
        <InputElement 
          value={form?.first_name}
          name='first_name'
          type='text'
          onChangeEvent={(e) => handleChange(e)}
          placeholder='Enter first name'
          fieldClassName="!rounded-[12px]"
          inputClassName='!py-[15px]'
          required
          label='First Name'
        />
        <InputElement 
          value={form?.last_name}
          name='last_name'
          type='text'
          onChangeEvent={(e) => handleChange(e)}
          placeholder='Enter last name'
          fieldClassName="!rounded-[12px]"
          inputClassName='!py-[15px]'
          required
          label='Last Name'
        />
        <InputElement 
          value={form?.email}
          name='email'
          type='email'
          onChangeEvent={(e) => handleChange(e)}
          placeholder='Enter email address'
          fieldClassName="!rounded-[12px]"
          inputClassName='!py-[15px]'
          required
          label='Email'
        />
        <InputElement 
          value={form?.mobile}
          name='mobile'
          type='tel'
          onChangeEvent={(e) => handleChange(e)}
          placeholder='Enter mobile'
          fieldClassName="!rounded-[12px]"
          inputClassName='!py-[15px]'
          required
          label='Mobile'
        />
        <InputElement 
          value={form?.password}
          name='password'
          type='password'
          onChangeEvent={(e) => handleChange(e)}
          placeholder='Enter password'
          fieldClassName="!rounded-[12px]"
          inputClassName='!py-[15px]'
          autoComplete='nope'
          required
          label='Password'
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