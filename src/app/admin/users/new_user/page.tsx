"use client";

import { Button } from "@/components/Button";
import { InputElement } from "@/components/forms/InputElement";
import { useState } from "react";

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
    <div className="p-6">
      <div className="max-w-3xl mx-auto bg-white shadow rounded-lg">
        <div className="border-b px-6 py-4">
          <h4 className="text-xl font-semibold">New User</h4>
        </div>
        <div className="px-6 py-6">
          <form onSubmit={handleSubmit} className="space-y-4">
            <InputElement 
              value={form?.first_name}
              name='first_name'
              type='text'
              onChangeEvent={(e) => handleChange(e)}
              placeholder='Enter first name'
              required
              label='First Name'
            />
            <InputElement 
              value={form?.last_name}
              name='last_name'
              type='text'
              onChangeEvent={(e) => handleChange(e)}
              placeholder='Enter last name'
              required
              label='Last Name'
            />
            <InputElement 
              value={form?.email}
              name='email'
              type='email'
              onChangeEvent={(e) => handleChange(e)}
              placeholder='Enter email address'
              required
              label='Email'
            />
            <InputElement 
              value={form?.mobile}
              name='mobile'
              type='tel'
              onChangeEvent={(e) => handleChange(e)}
              placeholder='Enter mobile'
              required
              label='Mobile'
            />
            <InputElement 
              value={form?.password}
              name='password'
              type='password'
              onChangeEvent={(e) => handleChange(e)}
              placeholder='Enter password'
              autoComplete='nope'
              required
              label='Password'
            />
            <hr className="mb-4" />
            <div className="pt-4">
              <Button 
                type='submit'
                label='Save'
              />
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}