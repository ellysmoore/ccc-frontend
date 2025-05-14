import { Dispatch, SetStateAction } from "react";
import { ItemsProps } from "./SearchSideBar";
import { InputElement } from "@/components/forms/InputElement";

export const FilterBox = ({ 
  title, 
  value, 
  onChange, 
  items, 
  selected, 
  onToggle 
} : FilterBoxProps) => {
  return (
    <div className="flex flex-col gap-[8px]">
      <label className="text-f18 text-[#0D0D12] font-[600]">{title}</label>
      <InputElement 
        value={value}
        type='text'
        onChangeEvent={(e) => onChange(e.target.value)}
        placeholder={`Search ${title}`}
      />
      <div className="flex flex-wrap gap-2">
        {items.map((item) => (
          <button
            key={item.id}
            onClick={() => onToggle(item.id)}
            className={`hover:border-orange-400 hover:text-orange-500 border-transparent border hover:bg-orange-50 py-[6px] px-[12px] cursor-pointer rounded-full text-f14 ${
              selected[Number(item.id)] ? "bg-[#FF6300] text-white" : "bg-gray-200"
            }`}
          >
            {item.name || `${item.title} ${item.name}`}
          </button>
        ))}
      </div>
    </div>
  );
};

export interface FilterBoxProps {
  title: string; 
  value: string; 
  onChange: Dispatch<SetStateAction<string>>; 
  items: ItemsProps[]; 
  selected: string; 
  onToggle: (id: string) => void;
}