"use client";

import { Button } from "@/components/Button";
import { Checkbox } from "@/components/forms/Checkbox";
import { FileUploader } from "@/components/forms/FileUploader";
import { InputElement } from "@/components/forms/InputElement";
import { SelectElement } from "@/components/forms/SelectElement";
import { TextareaElement } from "@/components/forms/TextareaElement";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function NewCategoryPage() {
  const { id } = useParams();
  const [category, setCategory] = useState(null);

  useEffect(() => {
    // MAKE API CALL HERE
    setCategory({});
  }, [id]);

  const [icon, setIcon] = useState<File | null>(null);
  const [banner, setBanner] = useState<File | null>(null);
  const [categories, setCategories] = useState([]);
  const [category_types, setCategoryTypes] = useState([]);
  
  const [form, setForm] = useState({
    name: "",
    category: "",
    description: "",
    category_type: "",
    featured: false,
    start_date: "",
    end_date: "",
  });

  useEffect(() => {
    setForm({
      name: category?.name || "",
      category: category?.category || "",
      description: category?.description || "",
      category_type: category?.category_type || "",
      featured: category?.featured || false,
      start_date: category?.start_date || "",
      end_date: category?.end_date || "",
    })
  }, [category]);

  // eslint-disable-next-line
  const categoryList = categories?.map((category: any) => {
    return({
      label: category?.name,
      value: category?.id
    })
  });

  // eslint-disable-next-line
  const categoryTypesList = category_types?.map((categoryType: any) => {
    return({
      label: categoryType?.name,
      value: categoryType?.id
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
          <h4 className="text-xl font-semibold">Edit Category</h4>
        </div>
        <div className="px-6 py-6">
          <form onSubmit={handleSubmit} className="space-y-4">
            <InputElement 
              value={form?.name}
              name='name'
              type='text'
              onChangeEvent={(e) => handleChange(e.target.name, e.target.value)}
              placeholder='Enter name'
              required
              label='Title'
            />
            <TextareaElement
              value={form?.description}
              name='description'
              onChangeEvent={(e) => handleChange(e.target.name, e.target.value)}
              placeholder='Enter description'
              required
              label='Description'
            />
            <SelectElement 
              name="category"
              value={form?.category}
              label='Parent Category'
              onChange={(value) => handleChange('category', value)}
              placeholder="Select categories"
              required
              options={categoryList}
            />
            <SelectElement 
              name="category_types"
              value={form?.category_type}
              label
              onChange={(value) => handleChange('category_types', value)}
              placeholder="Select category types"
              required
              options={categoryTypesList}
            />

            <FileUploader 
              name="icon"
              value={icon}
              onChange={(file) => setIcon(file)}
              required
              allowedFileTypes={['.jpeg', '.jpg', '.png']}
              label='Icon'
            />
            <FileUploader 
              name="banner"
              value={banner}
              onChange={(file) => setIcon(file)}
              required
              allowedFileTypes={['.jpeg', '.jpg', '.png']}
              label='Banner'
            /> 
            <hr className="mb-3" />
            <InputElement 
              value={form?.start_date}
              name='start_date'
              type='date'
              onChangeEvent={(e) => handleChange(e.target.name, e.target.value)}
              placeholder='Enter start date'
              required
              label='Start Date'
            />
            <InputElement 
              value={form?.end_date}
              name='end_date'
              type='date'
              onChangeEvent={(e) => handleChange(e.target.name, e.target.value)}
              placeholder='Enter end date'
              required
              label='End Date'
            />
            <hr className="mb-3" />
            <Checkbox 
              checked={form?.featured}
              onToggle={(value: boolean) => handleChange('featured', value)}
              rightLabel='Featured'
            />

            <hr className="mb-4" />

            <div className="flex items-center gap-[15px] pt-4">
              <Button 
                type='button'
                onClick={handleDraft}
                label='Update & Save as Draft'
              />

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