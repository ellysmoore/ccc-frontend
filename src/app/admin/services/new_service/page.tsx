"use client";

import { Button } from "@/components/Button";
import { InputElement } from "@/components/forms/InputElement";
import { useState } from "react";

export default function NewSpeakerPage() {
  const [form, setForm] = useState({
    name: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLTextAreaElement>) => {
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
          <h4 className="text-xl font-semibold">New Service</h4>
        </div>
        <div className="px-6 py-6">
          <form onSubmit={handleSubmit} className="space-y-4">
            <InputElement 
              value={form?.name}
              name='name'
              type='text'
              onChangeEvent={(e) => handleChange(e)}
              placeholder='Enter name'
              required
              label='Name'
            />
            <hr className="mb-4" />
            <div className="pt-4">
              <Button 
                type='submit'
                label='Publish'
              />
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}