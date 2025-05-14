'use client'

import { useEffect, useState } from "react";
import Link from "next/link";
import { FaAngleDoubleRight } from "react-icons/fa";
import { FilterBox } from "./FilterBox";
import { CATEGORIES } from "@/data/dummyData";
import { CategoryProps } from "@/app/(components)";

export const SearchSidebar = ({ 
  selected, 
  toggleFilter 
}: SearchSidebarProps) => {
  const [speakers, setSpeakers] = useState<ItemsProps[]>([]);
  const [services, setServices] = useState<ItemsProps[]>([]);
  const [categories, setCategories] = useState<ItemsProps[]>([]);
  const [speakerSearch, setSpeakerSearch] = useState("");
  const [serviceSearch, setServiceSearch] = useState("");

  useEffect(() => {
    fetch("/api/speakers").then(res => res.json()).then(setSpeakers);
    fetch("/api/services").then(res => res.json()).then(setServices);
    fetch("/api/categories").then(res => res.json()).then(setCategories);
  }, []);

  const filterList = (items: ItemsProps[], search: string, limit = 10) => {
    return items.filter((item) =>
      (item.name || item.title)?.toLowerCase().includes(search.toLowerCase())
    ).slice(0, limit);
  };

  return (
    <div className="flex flex-col gap-[30px]">
      <FilterBox
        title="Search Speakers"
        value={speakerSearch}
        onChange={setSpeakerSearch}
        items={filterList(speakers, speakerSearch)}
        selected={selected.speakers}
        onToggle={(id: string) => toggleFilter("speakers", id)}
      />

      <FilterBox
        title="Search Services"
        value={serviceSearch}
        onChange={setServiceSearch}
        items={filterList(services, serviceSearch)}
        selected={selected.services}
        onToggle={(id: string) => toggleFilter("services", id)}
      />

      <div className="flex flex-col gap-[8px]">
        <h3 className="text-f18 text-[#0D0D12] font-[600]">Categories</h3>
        <div className="flex flex-col gap-[10px]">
          {CATEGORIES.map((category: CategoryProps, index: number) => (
            <div
              key={category.id || index}
              className="cursor-pointer hover:border-orange-400 border-transparent border group rounded-lg bg-white shadow px-2 py-3 hover:bg-orange-50 transition"
            >
              <Link
                href={`/categories/${category.slug || category.id}`}
                className="text-gray-800 group-hover:text-orange-500 font-semibold flex items-center gap-x-2"
              >
                <FaAngleDoubleRight />
                <span>{category.name}</span>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export interface ItemsProps { 
  id: string; 
  name: string; 
  title: string;
}
export interface SearchSidebarProps {
  // eslint-disable-next-line
  selected: any,
  toggleFilter: (type: "speakers" | "services", id: string) => void
}