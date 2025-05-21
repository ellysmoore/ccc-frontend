'use client';

import Image from 'next/image';
import { FaBars } from 'react-icons/fa';

export interface AdminTopbarProps {
  user: {
    email?: string;
    img?: string;
  };
  onToggleSidebar?: () => void;
};

export default function AdminTopbar({ user, onToggleSidebar }: AdminTopbarProps) {
  return (
    <nav className="bg-white shadow px-4 py-2 flex justify-between items-center mb-4">
      {/* Sidebar Toggle Button */}
      <button
        onClick={onToggleSidebar}
        className="md:hidden text-gray-600 hover:text-gray-800 focus:outline-none"
      >
        <FaBars />
      </button>

      {/* Right-side nav */}
      <ul className="flex items-center space-x-4 ml-auto">
        <div className="hidden sm:block h-6 w-px bg-gray-300" />

        <li className="relative">
          <div className="flex items-center space-x-2 cursor-pointer">
            {user?.email && (
              <span className="text-gray-600 text-sm hidden lg:inline">{user?.email}</span>
            )}
            {user?.img && (
              <Image
                src={user?.img}
                alt="Profile"
                width={32}
                height={32}
                className="rounded-full object-cover"
              />
            )}
          </div>
        </li>
      </ul>
    </nav>
  );
}
