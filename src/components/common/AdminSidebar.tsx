'use client';

import { ReactNode, useState } from 'react';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { cn } from '@/utils/cn';
import { ADMIN_MENU_ITEMS } from '@/data/adminSideBarData';

export interface MenuItem {
  name: string;
  icon: ReactNode;
  link?: string;
  children?: { label: string; href: string }[];
  key: string;
}

export default function AdminSidebar() {
  const pathname = usePathname();
  const [open, setOpen] = useState<{ [key: string]: boolean }>({});

  return (
    <ul className="w-64 bg-orange-800 text-white min-h-screen p-4 space-y-2">
      {ADMIN_MENU_ITEMS.map((item) => {
        const isActive = pathname.includes(item.key);
        const hasChildren = !!item.children;

        return (
          <li key={item.key} className={cn('rounded', isActive && 'bg-orange-700')}>
            {hasChildren ? (
              <>
              {/* TODO: MAKE ALL ACTIVE IF ONE OF THE CHILD IS PICKED */}
                <button
                  onClick={() => setOpen((prev) => ({ ...prev, [item.key]: !prev[item.key] }))}
                  className="flex items-center gap-2 w-full px-4 py-2 text-left hover:bg-orange-700"
                >
                  {item.icon}
                  {item.name}
                </button>

                {open[item.key] && (
                  <div className="pl-6 text-sm flex flex-col bg-orange-900">
                    {/* TODO: MAKE COLLAPSEABLE */}
                    <h6 className="collapse-header">{item?.management}:</h6>
                    {item.children.map((child) => (
                      <Link
                        href={child.href}
                        key={child.href}
                        className={cn(
                          'block py-1 hover:underline',
                          pathname === child.href && 'text-yellow-400'
                        )}
                      >
                        {child.label}
                      </Link>
                    ))}
                  </div>
                )}
              </>
            ) : (
              <Link href={item.link!} className="flex items-center gap-2 px-4 py-2 hover:bg-orange-700">
                {item.icon}
                {item.name}
              </Link>
            )}
            <hr className="my-2 border-orange-600" />
          </li>
        );
      })}
    </ul>
  );
}
