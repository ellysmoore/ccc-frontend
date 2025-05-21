"use client";

import { Button } from "@/components/Button";
import { InputElement } from "@/components/forms/InputElement";
import { TextareaElement } from "@/components/forms/TextareaElement";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function EditCentrePage() {
  const { id } = useParams();
  const [centre, setCentre] = useState(null);

  useEffect(() => {
    // MAKE API CALL HERE
    setCentre({});
  }, [id]);

  const [form, setForm] = useState({
    name: "",
    slug: "",
    address: "",
    directions: "",
  });

  useEffect(() => {
    setForm({
      name: centre?.name || "",
      slug: centre?.slug || "",
      address: centre?.address || "",
      directions: centre?.directions || "",
    })
  }, [centre])

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
          <h4 className="text-xl font-semibold">Edit Centre</h4>
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
            <InputElement 
              value={form?.slug}
              name='slug'
              type='text'
              onChangeEvent={(e) => handleChange(e)}
              placeholder='Enter slug'
              required
              label='Slug'
            />
            <TextareaElement 
              value={form?.address}
              name='address'
              onChangeEvent={(e) => handleChange(e)}
              placeholder='Enter address'
              required
              label='Address'
            />
            <InputElement 
              value={form?.directions}
              name='directions'
              type='text'
              onChangeEvent={(e) => handleChange(e)}
              placeholder='Enter directions'
              required
              label='Directions'
            />

            <hr className="mb-4" />

            <div className="pt-4">
              <Button 
                type='submit'
                label='Update & Publish'
              />
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}