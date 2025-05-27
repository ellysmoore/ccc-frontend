'use client';

import { ReactNode, useState } from 'react';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { cn } from '@/utils/cn';
import { ADMIN_MENU_ITEMS } from '@/data/adminSideBarData';
import { AnimatePresence, motion } from 'framer-motion';

export interface MenuItem {
  name: string;
  icon: ReactNode;
  link?: string;
  children?: { label: string; href: string }[];
  key: string;
}

export default function AdminSidebar({ open, setToggle } : { open: boolean, setToggle: () => void }) {
  const pathname = usePathname();
  // const [openChildren, setOpenChildren] = useState<{ [key: string]: boolean }>({});
  const [openChildren, setOpenChildren] = useState('');

  return (
    <AnimatePresence>
      {/* {open && ( */}
        <motion.ul
          initial={{ display: 'none', height: 0 }}
          animate={{ display: 'block', height: 'auto' }}
          exit={{ display: 'none', height: 0 }}
          transition={{ duration: 0.2 }}
          onClick={(e) => e.stopPropagation()}
          className={`${!open ? '!hidden' : 'block'} w-full lg:!h-auto lg:!block hidden fixed z-[70] overflow-hidden hover:overflow-y-auto top-[46px] lg:top-0 bottom-0 left-0 lg:w-64 bg-white text-[#222] min-h-[calc(100vh-46px)] lg:min-h-screen p-4 space-y-2`}
        >
          {ADMIN_MENU_ITEMS.map((item) => {
            const isActive = pathname.includes(item.key);
            const hasChildren = !!item.children;
            
            return (
              <li key={item.key}>
                {hasChildren ? (
                  <>
                    <button
                      // onClick={() => setOpenChildren((prev) => ({ ...prev, [item.key]: !prev[item.key] }))}
                      onClick={() => setOpenChildren(openChildren == item.key ? '' : item.key)}
                      className={cn("group cursor-pointer w-full text-[16px] text-[#222] hover:text-orange-600 flex items-center gap-[12px] py-[10px]",
                      isActive && 'text-orange-600')}
                    >
                      <div className={cn('bg-[#F1F1F1] w-[30px] h-[30px] rounded-full flex items-center justify-center group-hover:bg-white border border-transparent group-hover:text-orange-600 group-hover:border-orange-600', 
                        isActive && 'text-orange-600 bg-white !border-orange-600')}>
                        {item.icon}
                      </div>
                      {item.name}
                    </button>

                    {(openChildren == item.key) && (
                      <div className="rounded-[12px] border border-[#D9D9D9] px-[12px] text-[16px] py-[10px] flex flex-col bg-white">
                        <h6 className="text-gray-300 text-[12px] font-[600] uppercase px-[12px] py-[3px]">{item?.management}:</h6>

                        {item.children.map((child) => (
                          <Link
                            href={child.href}
                            key={child.href}
                            onClick={() => setToggle()}
                            className={cn(
                              'cursor-pointer w-full text-[#222] text-[16px] hover:text-orange-600 rounded-[12px] flex items-center gap-[12px] px-[12px] py-[10px] hover:bg-gray-50',
                              pathname === child.href && 'text-orange-600'
                            )}
                          >
                            {child.label}
                          </Link>
                        ))}
                      </div>
                    )}
                  </>
                ) : (
                  <Link href={item.link!} className={cn("group cursor-pointer w-full text-[16px] text-[#222] hover:text-orange-600 flex items-center gap-[12px] py-[10px]",
                    isActive && 'text-orange-600')}
                    onClick={() => setToggle()}
                  >
                    <div className={cn('bg-[#F1F1F1] w-[30px] h-[30px] rounded-full flex items-center justify-center group-hover:bg-white border border-transparent group-hover:text-orange-600 group-hover:border-orange-600', 
                      isActive && 'text-orange-600 bg-white !border-orange-600')}>
                      {item.icon}
                    </div>
                    {item.name}
                  </Link>
                )}
              </li>
            );
          })}
        </motion.ul>
      {/* )} */}
    </AnimatePresence>
  );
}
