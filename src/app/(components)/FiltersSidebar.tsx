import { InputElement } from "@/components/forms/InputElement";
import {
  CATEGORIES,
  MONTHS,
  SERVICES,
  SPEAKERS,
  YEARS,
} from "@/data/dummyData";
import Link from "next/link";
import { useState } from "react";
import { FaAngleDoubleRight } from "react-icons/fa";

export const FiltersSidebar = () => {
  const [speakerSearch, setSpeakerSearch] = useState("");
  const [serviceSearch, setServiceSearch] = useState("");
  const [monthSearch, setMonthSearch] = useState("");
  const [yearSearch, setYearSearch] = useState("");
  const [selectedSpeakers, setSelectedSpeakers] = useState<
    Record<string, boolean>
  >({});
  const [selectedServices, setSelectedServices] = useState<
    Record<string, boolean>
  >({});
  const [selectedMonth, setSelectedMonth] = useState<string | null>(null);
  const [selectedYear, setSelectedYear] = useState<number | null>(null);

  const toggleItem = (
    id: string | number,
    setFn: (val: any) => void,
    state: Record<string, boolean>
  ) => {
    setFn({ ...state, [id]: !state[id] });
  };

  const TagButton = ({
    selected,
    onClick,
    children,
  }: {
    selected: boolean;
    onClick: () => void;
    children: React.ReactNode;
  }) => (
    <button
      onClick={onClick}
      style={{ fontSize: 14 }}
      className={`transition-all text-sm px-3 py-1.5 rounded-full border border-gray-100 ${
        selected
          ? "bg-orange-500 text-white border-orange-500"
          : "bg-gray-100 text-gray-800 hover:bg-orange-100 hover:text-orange-600 hover:border-orange-300"
      }`}
    >
      {children}
    </button>
  );

  const FilterSection = ({
    title,
    children,
  }: {
    title: string;
    children: React.ReactNode;
  }) => (
    <div className="flex flex-col gap-2">
      <h3 className="text-[15px] font-semibold text-gray-900">{title}</h3>
      {children}
    </div>
  );

  return (
    <aside className="flex flex-col gap-8 p-4 bg-white rounded-xl shadow-sm border border-gray-200">
      <FilterSection
        title={""} //  title="Search Speakers"
      >
        <InputElement
          value={speakerSearch}
          name="speakers"
          type="text"
          onChangeEvent={(e) => setSpeakerSearch(e.target.value)}
          placeholder="Search Speakers"
        />
        <div className="flex flex-wrap gap-2 mt-2">
          {SPEAKERS.filter((s) =>
            s.name.toLowerCase().includes(speakerSearch.toLowerCase())
          ).map((s) => (
            <TagButton
              key={s.id}
              selected={!!selectedSpeakers[s.id]}
              onClick={() =>
                toggleItem(s.id, setSelectedSpeakers, selectedSpeakers)
              }
            >
              {s.title} {s.name}
            </TagButton>
          ))}
        </div>
      </FilterSection>

      <FilterSection title="">
        <InputElement
          value={serviceSearch}
          name="services"
          type="text"
          onChangeEvent={(e) => setServiceSearch(e.target.value)}
          placeholder="Search Services"
        />
        <div className="flex flex-wrap gap-2 mt-2">
          {SERVICES.filter((s) =>
            s.name.toLowerCase().includes(serviceSearch.toLowerCase())
          ).map((s) => (
            <TagButton
              key={s.id}
              selected={!!selectedServices[s.id]}
              onClick={() =>
                toggleItem(s.id, setSelectedServices, selectedServices)
              }
            >
              {s.name}
            </TagButton>
          ))}
        </div>
      </FilterSection>

      <FilterSection title="">
        <InputElement
          value={monthSearch}
          name="months"
          type="text"
          onChangeEvent={(e) => setMonthSearch(e.target.value)}
          placeholder="Search Months"
        />
        <div className="flex flex-wrap gap-2 mt-2">
          {MONTHS.filter((m) =>
            m.toLowerCase().includes(monthSearch.toLowerCase())
          ).map((month) => (
            <TagButton
              key={month}
              selected={selectedMonth === month}
              onClick={() =>
                setSelectedMonth((prev) => (prev === month ? null : month))
              }
            >
              {month}
            </TagButton>
          ))}
        </div>
      </FilterSection>

      <FilterSection title="">
        <InputElement
          value={yearSearch}
          name="years"
          type="text"
          onChangeEvent={(e) => setYearSearch(e.target.value)}
          placeholder="Search Years"
        />
        <div className="flex flex-wrap gap-2 mt-2">
          {YEARS.filter((y) => y.toString().includes(yearSearch)).map(
            (year) => (
              <TagButton
                key={year}
                selected={selectedYear === year}
                onClick={() =>
                  setSelectedYear((prev) => (prev === year ? null : year))
                }
              >
                {year}
              </TagButton>
            )
          )}
        </div>
      </FilterSection>

      <FilterSection title="">
        <div className="flex flex-col gap-2">
          {CATEGORIES.map((category) => (
            <Link
              key={category.id}
              href={`/categories/${category.slug || category.id}`}
              className="flex items-center gap-2 text-[15px] font-medium text-gray-800 hover:text-orange-500 transition"
            >
              <FaAngleDoubleRight className="text-orange-400" />
              <span>{category.name}</span>
            </Link>
          ))}
        </div>
      </FilterSection>
    </aside>
  );
};

export interface CategoryProps {
  id: string;
  slug: string;
  name: string;
}
