"use client";

import { Button } from "@/components/Button";
import { Checkbox } from "@/components/forms/Checkbox";
import { FileUploader } from "@/components/forms/FileUploader";
import { InputElement } from "@/components/forms/InputElement";
import { SelectElement } from "@/components/forms/SelectElement";
import { TextareaElement } from "@/components/forms/TextareaElement";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { FaChevronLeft } from "react-icons/fa";

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
    <div className='w-full lg:px-6 lg:max-w-[800px] flex flex-col gap-6 h-full'>
      <div className="flex items-center gap-[20px]">
        <Link
          className='w-[40px] h-[40px] bg-[#EAEAEA] rounded-full grid place-items-center bg-opacity-40'
          href={'/admin/categories'}
        >
          <FaChevronLeft size={13} />
        </Link>

        <h1 className="!text-2xl font-semibold text-[#222]">
          Edit Category
        </h1>
      </div>

      <form onSubmit={handleSubmit} className="w-full flex flex-col md:grid grid-cols-2 gap-x-[40px] gap-[20px] md:gap-y-[27px]">
        <InputElement 
          value={form?.name}
          name='name'
          type='text'
          fieldClassName="!rounded-[12px]"
          inputClassName='!py-[15px]'
          onChangeEvent={(e) => handleChange(e.target.name, e.target.value)}
          placeholder='Enter name'
          containerClassName="col-span-2"
          required
          label='Title'
        />
        <SelectElement 
          name="category"
          value={form?.category}
          label='Parent Category'
          onChange={(value) => handleChange('category', value)}
          placeholder="Select categories"
          fieldClassName="!rounded-[12px] !py-[13px]"
          required
          options={categoryList}
        />
        <SelectElement 
          name="category_types"
          value={form?.category_type}
          label="Category Types"
          onChange={(value) => handleChange('category_types', value)}
          placeholder="Select category types"
          fieldClassName="!rounded-[12px] !py-[13px]"
          required
          options={categoryTypesList}
        />

        <FileUploader 
          name="icon"
          value={icon}
          onChange={(file) => setIcon(file)}
          required
          uploadClassName="!rounded-[12px]"
          allowedFileTypes={['.jpeg', '.jpg', '.png']}
          label='Icon'
        />
        <FileUploader 
          name="banner"
          value={banner}
          onChange={(file) => setIcon(file)}
          required
          uploadClassName="!rounded-[12px]"
          allowedFileTypes={['.jpeg', '.jpg', '.png']}
          label='Banner'
        /> 
        
        <InputElement 
          value={form?.start_date}
          name='start_date'
          fieldClassName="!rounded-[12px]"
          inputClassName='!py-[15px]'
          type='date'
          onChangeEvent={(e) => handleChange(e.target.name, e.target.value)}
          placeholder='Enter start date'
          required
          label='Start Date'
        />
        <InputElement 
          value={form?.end_date}
          name='end_date'
          fieldClassName="!rounded-[12px]"
          inputClassName='!py-[15px]'
          type='date'
          onChangeEvent={(e) => handleChange(e.target.name, e.target.value)}
          placeholder='Enter end date'
          required
          label='End Date'
        />
        
        <Checkbox 
          checked={form?.featured}
          onToggle={(value: boolean) => handleChange('featured', value)}
          rightLabel='Featured'

        />
        <TextareaElement
          value={form?.description}
          name='description'
          onChangeEvent={(e) => handleChange(e.target.name, e.target.value)}
          placeholder='Enter description'
          required
          fieldClassName="!py-[15px]"
          containerClassName="col-span-2"
          rows={6}
          label='Description'
        />

        <div className="col-span-2 flex-col md:flex-row flex items-center justify-end gap-[15px] pt-4">
          <Button 
            type='button'
            onClick={handleDraft}
            variant="primary-outlined"
            label='Update & Save as Draft'
            containerClassName="w-full md:!w-[200px]"
          />

          <Button 
            type='submit'
            label='Update & Publish'
            containerClassName="w-full md:!w-[150px]"
          />
        </div>
      </form>
    </div>
  );
}