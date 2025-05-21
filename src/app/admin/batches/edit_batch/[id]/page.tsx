"use client";

import { Button } from "@/components/Button";
import { InputElement } from "@/components/forms/InputElement";
import { SelectElement } from "@/components/forms/SelectElement";
import { TextareaElement } from "@/components/forms/TextareaElement";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function NewBatchPage() {
  const { id } = useParams();
  const [batch, setBatch] = useState(null);

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
    <div className="p-6">
      <div className="max-w-3xl mx-auto bg-white shadow rounded-lg">
        <div className="border-b px-6 py-4">
          <h4 className="text-xl font-semibold">Edit {batch?.title}</h4>
        </div>
        <div className="px-6 py-6">
          <form onSubmit={handleSubmit} className="space-y-4">
            <SelectElement 
              name="numbers"
              value={form?.numbers}
              label='Number of Tickets'
              disabled
              // onChange={(value) => handleChange('numbers', value)}
              placeholder="Select number of tickets"
              required
              options={numbersList}
            />
            <InputElement 
              value={form?.price}
              name='price'
              type='number'
              disabled
              // onChangeEvent={(e) => handleChange(e.target.name, e.target.value)}
              placeholder='Enter price'
              required
              label='Price'
            />
            <TextareaElement
              value={form?.info}
              name='info'
              onChangeEvent={(e) => handleChange(e.target.name, e.target.value)}
              placeholder='Enter info'
              required
              label='Ticket Info'
            />

            <hr className="mb-4" />

            <div className="flex items-center pt-4">
              <Button 
                type='submit'
                label='Update'
              />
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}