import { InputElement } from "@/components/forms/InputElement";
import { CATEGORIES, MONTHS, SERVICES, SPEAKERS, YEARS } from "@/data/dummyData";
import Link from "next/link";
import { useState } from "react";
import { FaAngleDoubleRight } from "react-icons/fa";

export const FiltersSidebar = () => {
  const [speakerSearch, setSpeakerSearch] = useState("");
  const [serviceSearch, setServiceSearch] = useState("");
  const [monthSearch, setMonthSearch] = useState("");
  const [yearSearch, setYearSearch] = useState("");
  const [selectedSpeakers, setSelectedSpeakers] = useState<Record<string, boolean>>({});
  const [selectedServices, setSelectedServices] = useState<Record<string, boolean>>({});
  const [selectedMonth, setSelectedMonth] = useState<string | null>(null);
  const [selectedYear, setSelectedYear] = useState<number | null>(null);
  // const [categories, setCategories] = useState<CategoryProps[]>([]);

  const toggleItem = (
    id: string | number,
    // eslint-disable-next-line
    setFn: (val: any) => void,
    state: Record<string, boolean>
  ) => {
    setFn({ ...state, [id]: !state[id] });
  };

  return (
    <aside className="flex flex-col gap-[30px]">
      {/* Speakers Filter */}
      <div className="flex flex-col gap-[8px]">
        <h3 className="text-f18 text-[#0D0D12] font-[600]">Search Speakers</h3>
        <InputElement 
          value={speakerSearch}
          name='speakers'
          type='text'
          onChangeEvent={(e) => setSpeakerSearch(e.target.value)}
          placeholder='Search Speakers'
        />

        <div className="flex flex-wrap gap-2">
          {SPEAKERS
            .filter((s) =>
              s.name.toLowerCase().includes(speakerSearch.toLowerCase())
            )
            .map((s) => (
              <button
                key={s.id}
                onClick={() =>
                  toggleItem(s.id, setSelectedSpeakers, selectedSpeakers)
                }
                className={`hover:border-orange-400 hover:text-orange-500 border-transparent border hover:bg-orange-50 py-[6px] px-[12px] cursor-pointer rounded-full text-f14 ${
                  selectedSpeakers[s.id] ? "bg-[#FF6300] text-white" : "bg-gray-200"
                }`}
              >
                {s.title} {s.name}
              </button>
            ))}
        </div>
      </div>

      {/* Services Filter */}
      <div className="flex flex-col gap-[8px]">
        <h3 className="text-f18 text-[#0D0D12] font-[600]">Services</h3>
        <InputElement 
          value={serviceSearch}
          name='services'
          type='text'
          onChangeEvent={(e) => setServiceSearch(e.target.value)}
          placeholder='Search Services'
        />
        <div className="flex flex-wrap gap-2">
          {SERVICES.map((s) => (
            <button
              key={s.id}
              onClick={() => toggleItem(s.id, setSelectedServices, selectedServices)}
              className={`hover:border-orange-400 hover:text-orange-500 border-transparent border hover:bg-orange-50 py-[6px] px-[12px] cursor-pointer rounded-full text-f14 ${
                selectedServices[s.id] ? "bg-[#FF6300] text-white" : "bg-gray-200"
              }`}
            >
              {s.name}
            </button>
          ))}
        </div>
      </div>

      {/* Months Filter */}
      <div className="flex flex-col gap-[8px]">
        <h3 className="text-f18 text-[#0D0D12] font-[600]">Month</h3>
        <InputElement 
          value={monthSearch}
          name='months'
          type='text'
          onChangeEvent={(e) => setMonthSearch(e.target.value)}
          placeholder='Search Months'
        />
        <div className="flex flex-wrap gap-2">
          {MONTHS.map((month) => (
            <button
              key={month}
              onClick={() =>
                setSelectedMonth((prev) => (prev === month ? null : month))
              }
              className={`hover:border-orange-400 hover:text-orange-500 border-transparent border hover:bg-orange-50 py-[6px] px-[12px] cursor-pointer rounded-full text-f14 ${
                selectedMonth === month ? "bg-[#FF6300] text-white" : "bg-gray-200"
              }`}
            >
              {month}
            </button>
          ))}
        </div>
      </div>

      {/* Years Filter */}
      <div className="flex flex-col gap-[8px]">
        <h3 className="text-f18 text-[#0D0D12] font-[600]">Year</h3>
        <InputElement 
          value={yearSearch}
          name='years'
          type='text'
          onChangeEvent={(e) => setYearSearch(e.target.value)}
          placeholder='Search Years'
        />
        <div className="flex flex-wrap gap-2">
          {YEARS.map((year) => (
            <button
              key={year}
              onClick={() =>
                setSelectedYear((prev) => (prev === year ? null : year))
              }
              className={`hover:border-orange-400 hover:text-orange-500 border-transparent border hover:bg-orange-50 py-[6px] px-[12px] cursor-pointer rounded-full text-f14 ${
                selectedYear === year ? "bg-[#FF6300] text-white" : "bg-gray-200"
              }`}
            >
              {year}
            </button>
          ))}
        </div>
      </div>

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
    </aside>
  );
}

export interface CategoryProps { 
  id: string; 
  slug: string; 
  name: string; 
}
