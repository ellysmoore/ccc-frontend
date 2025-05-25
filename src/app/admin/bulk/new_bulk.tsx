"use client";

import { Button } from "@/components/Button";
import { Checkbox } from "@/components/forms/Checkbox";
import { InputElement } from "@/components/forms/InputElement";
import { SelectElement } from "@/components/forms/SelectElement";
import { TextareaElement } from "@/components/forms/TextareaElement";
import { useState } from "react";

export default function NewBulkPage() {
  const [categories, setCategories] = useState([]);
  // TODO: REMOVE LATER
  console.log(setCategories);
  
  const [form, setForm] = useState({
    category: [],
    description: "",
    is_free: false,
    price: "",
    when: "",
  });

  // eslint-disable-next-line
  const categoryList = categories?.map((category: any) => {
    return({
      label: category?.name,
      value: category?.id
    })
  });

  // eslint-disable-next-line
  const handleChange = (name: string, value: any) => {
    setForm({ ...form, [name]: value });
  };

  const handleDraft = () => {};

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
  }
  
  return (
    <div className="p-6">
      <div className="max-w-3xl mx-auto bg-white shadow rounded-lg">
        <div className="border-b px-6 py-4">
          <h4 className="text-xl font-semibold">Bulk Content Upload</h4>
        </div>
        <div className="px-6 py-6">
          <form onSubmit={handleSubmit} className="space-y-4">
            <SelectElement 
              name="category"
              value={form?.category}
              label='Category'
              multiple
              onChange={(value) => handleChange('category', value)}
              placeholder="Select categories"
              required
              options={categoryList}
            />
            <TextareaElement
              value={form?.description}
              name='description'
              onChangeEvent={(e) => handleChange(e.target.name, e.target.value)}
              placeholder='Enter description'
              required
              label='Description'
            />
            <InputElement 
              value={form?.price}
              name='price'
              type='number'
              onChangeEvent={(e) => handleChange(e.target.name, e.target.value)}
              placeholder='Enter price'
              required
              label='Price'
            />
            <Checkbox 
              checked={form?.is_free}
              onToggle={(value: boolean) => handleChange('is_free', value)}
              rightLabel='Allow Free Download'
            />
            <InputElement 
              value={form?.when}
              name='when'
              type='date'
              onChangeEvent={(e) => handleChange(e.target.name, e.target.value)}
              placeholder='Enter published on'
              required
              label='Published On'
            />

            <hr className="mb-4" />

            <div className="flex items-center gap-[15px] pt-4">
              <Button 
                type='button'
                onClick={handleDraft}
                label='Save as Draft'
              />

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