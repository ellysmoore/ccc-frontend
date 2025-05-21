"use client";

import { Button } from "@/components/Button";
import { Checkbox } from "@/components/forms/Checkbox";
import { FileUploader } from "@/components/forms/FileUploader";
import { InputElement } from "@/components/forms/InputElement";
import { SelectElement } from "@/components/forms/SelectElement";
import { TextareaElement } from "@/components/forms/TextareaElement";
import { useState } from "react";

export default function NewMessagePage() {
  const [file, setFile] = useState<File | null>(null);
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
    <div className="p-6">
      <div className="max-w-3xl mx-auto bg-white shadow rounded-lg">
        <div className="border-b px-6 py-4">
          <h4 className="text-xl font-semibold">New Message</h4>
        </div>
        <div className="px-6 py-6">
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* TODO: ADD AN IMAGE DISPLAY HERE FOR WHATEVER WAS UPLOADED */}
            <FileUploader 
              name="file"
              value={file}
              onChange={(file) => setFile(file)}
              required
              allowedFileTypes={['.pdf', '.mp3']}
              label='File'
            /> 

            <InputElement 
              value={form?.topic}
              name='topic'
              type='text'
              onChangeEvent={(e) => handleChange(e.target.name, e.target.value)}
              placeholder='Enter topic'
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
              required
              options={categoryList}
            />
            <SelectElement 
              name="service"
              value={form?.service}
              label="Service"
              onChange={(value) => handleChange('service', value)}
              placeholder="Select service"
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
              required
              options={centreList}
            />
            <SelectElement 
              name="speaker"
              value={form?.speaker}
              label="Speaker"
              onChange={(value) => handleChange('speaker', value)}
              placeholder="Select speaker"
              required
              options={speakerList}
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
              placeholder='Enter published date'
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