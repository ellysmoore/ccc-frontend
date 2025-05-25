"use client";

import { Button } from "@/components/Button";
import { Checkbox } from "@/components/forms/Checkbox";
import { FileUploader } from "@/components/forms/FileUploader";
import { InputElement } from "@/components/forms/InputElement";
import { SelectElement } from "@/components/forms/SelectElement";
import { TextareaElement } from "@/components/forms/TextareaElement";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import Link from "next/link";
import { FaChevronLeft  } from "react-icons/fa";

export default function EditMessagePage() {
  const { id } = useParams();
  const [file, setFile] = useState<File | null>(null);
  const [message, setMessage] = useState(null);

  useEffect(() => {
    // MAKE API CALL HERE
    setMessage({});
  }, [id]);

  const [speakers, setSpeakers] = useState([]);
  const [categories, setCategories] = useState([]);
  const [services, setServices] = useState([]);
  const [centres, setCentres] = useState([]);
  
  const [form, setForm] = useState({
    topic: "",
    speaker: "",
    centre: [],
    service: "",
    category: [],
    description: "",
    price: "",
    is_free: false,
    when: "",
  });

  useEffect(() => {
    setForm({
      topic: message?.topic || "",
      speaker: message?.speaker || "",
      centre: message?.centre || [],
      service: message?.service || "",
      category: message?.category || [],
      description: message?.description || "",
      price: message?.price || "",
      is_free: message?.is_free || false,
      when: message?.when || "",
    })
  }, [message])

  // eslint-disable-next-line
  const speakerList = speakers?.map((speaker: any) => {
    return({
      label: speaker?.name,
      value: speaker?.id
    })
  });

  // eslint-disable-next-line
  const categoryList = categories?.map((category: any) => {
    return({
      label: category?.name,
      value: category?.id
    })
  });

  // eslint-disable-next-line
  const centreList = centres?.map((centre: any) => {
    return({
      label: centre?.name,
      value: centre?.id
    })
  });

  // eslint-disable-next-line
  const serviceList = services?.map((service: any) => {
    return({
      label: service?.name,
      value: service?.id
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
          href={'/admin/messages'}
        >
          <FaChevronLeft size={13} />
        </Link>

        <h1 className="!text-2xl font-semibold text-[#222]">
          Edit Content
        </h1>
      </div>

      <form onSubmit={handleSubmit} className="w-full flex flex-col md:grid grid-cols-2 gap-x-[40px] gap-[20px] md:gap-y-[27px]">
        {/* TODO: ADD AN IMAGE DISPLAY HERE FOR WHATEVER WAS UPLOADED */}
        <FileUploader 
          name="file"
          value={file}
          onChange={(file) => setFile(file)}
          required
          uploadClassName="!rounded-[12px]"
          allowedFileTypes={['.pdf', '.mp3']}
          label='File'
        /> 

        <InputElement 
          value={form?.topic}
          name='topic'
          type='text'
          onChangeEvent={(e) => handleChange(e.target.name, e.target.value)}
          placeholder='Enter topic'
          fieldClassName="!rounded-[12px]"
          inputClassName='!py-[15px]'
          required
          label='Title'
        />
        <SelectElement 
          name="category"
          value={form?.category}
          multiple
          label="Category"
          onChange={(value) => handleChange('category', value)}
          placeholder="Select categories"
          fieldClassName="!rounded-[12px] !py-[13px]"
          required
          options={categoryList}
        />
        <SelectElement 
          name="service"
          value={form?.service}
          label="Service"
          onChange={(value) => handleChange('service', value)}
          placeholder="Select service"
          fieldClassName="!rounded-[12px] !py-[13px]"
          required
          options={serviceList}
        />
        <SelectElement 
          name="centre"
          value={form?.centre}
          multiple
          label="Centre"
          onChange={(value) => handleChange('centre', value)}
          placeholder="Select centre"
          fieldClassName="!rounded-[12px] !py-[13px]"
          required
          options={centreList}
        />
        <SelectElement 
          name="speaker"
          value={form?.speaker}
          label="Speaker"
          onChange={(value) => handleChange('speaker', value)}
          placeholder="Select speaker"
          fieldClassName="!rounded-[12px] !py-[13px]"
          required
          options={speakerList}
        />
        <InputElement 
          value={form?.price}
          name='price'
          type='number'
          onChangeEvent={(e) => handleChange(e.target.name, e.target.value)}
          placeholder='Enter price'
          fieldClassName="!rounded-[12px]"
          inputClassName='!py-[15px]'
          required
          label='Price'
        />

        <InputElement 
          value={form?.when}
          name='when'
          type='date'
          onChangeEvent={(e) => handleChange(e.target.name, e.target.value)}
          placeholder='Enter published date'
          fieldClassName="!rounded-[12px]"
          inputClassName='!py-[15px]'
          required
          label='Published On'
        />
        <Checkbox 
          checked={form?.is_free}
          onToggle={(value: boolean) => handleChange('is_free', value)}
          rightLabel='Allow Free Download'
        />
        <TextareaElement
          value={form?.description}
          name='description'
          onChangeEvent={(e) => handleChange(e.target.name, e.target.value)}
          placeholder='Enter description'
          required
          rows={6}
          fieldClassName="!py-[15px]"
          containerClassName="col-span-2"
          label='Description'
        />

        <div className="col-span-2 flex-col md:flex-row flex items-center justify-end gap-[15px] pt-4">
          <Button 
            type='button'
            onClick={handleDraft}
            variant="primary-outlined"
            label='Update & Save as Draft'
            containerClassName="w-full md:!w-[250px]"
          />

          <Button 
            type='submit'
            label='Update & Publish'
            containerClassName="w-full md:!w-[200px]"
          />
        </div>
      </form>
    </div>
  );
}