"use client";

import { Button } from "@/components/Button";
import { FileUploader } from "@/components/forms/FileUploader";
import { InputElement } from "@/components/forms/InputElement";
import { useState } from "react";

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
    <div className="p-6">
      <div className="max-w-3xl mx-auto bg-white shadow rounded-lg">
        <div className="border-b px-6 py-4">
          <h4 className="text-xl font-semibold">New Banner</h4>
        </div>
        <div className="px-6 py-6">
          <form onSubmit={handleSubmit} className="space-y-4">
            <FileUploader 
              name="file"
              value={file}
              onChange={(file) => setFile(file)}
              required
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
              label='Caption'
            />

            <hr className="mb-4" />

            <div className="flex items-center gap-[15px] pt-4">
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