import React, { ReactNode } from 'react'

export const SermonSection = ({ 
  title, 
  children 
} : SermonSectionProps) => {
  return (
    <div>
      <div className="bg-gray-900 text-white p-3 font-bold rounded-md shadow mb-[12px]">{title}</div>
      <div className="gap-[12px]">{children}</div>
    </div>
  );
}

export interface SermonSectionProps { 
  title: ReactNode; 
  children: ReactNode
}