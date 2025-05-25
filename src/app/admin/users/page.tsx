'use client'

import { Pagination } from "@/components";
import { Button } from "@/components/Button";
import { SearchBar } from "@/components/common/SearchBar";
import { ConfirmModal } from "@/components/ConfirmModal";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { FaBan, FaCheck, FaEdit, FaUserPlus } from "react-icons/fa";

// type User = {
//   uid: string;
//   first_name: string;
//   last_name: string;
//   email: string;
//   balance: number;
//   last_login: string;
//   send_newsletter: boolean;
//   is_active: boolean;
// };

export default function UsersPage() {
  const [showModal, setShowModal] = useState('');
  const [page, setPage] = useState(1);
  const [pages, setPages] = useState(1);
  const [users, setUsers] = useState([
    {
      uid: "1",
      first_name: "John",
      last_name: "Doe",
      email: "john@example.com",
      balance: 5000,
      last_login: "2024-05-01 12:30",
      send_newsletter: true,
      is_active: true,
    },
    {
      uid: "2",
      first_name: "Jane",
      last_name: "Smith",
      email: "jane@example.com",
      balance: 2000,
      last_login: "2024-04-20 09:00",
      send_newsletter: false,
      is_active: false,
    },
  ]);

  // TODO: REMOVE LATER
  console.log(setPage, setPages, setUsers);

  const router = useRouter();
  const [query, setQuery] = useState("");

  useEffect(() => {
    const url = new URLSearchParams(window.location.search);
    const q = url.get("q");

    if (q) setQuery(q || "");
  }, []);

  const handleQuery = (value: string) => {
    setQuery(value);
    router.push(`/admin/users?q=${value}`);
  }

  const handleStatus = () => {
    // TODO: Handle status here
  }

  return (
    <>
      <div className="lg:px-6">
        <div className="flex flex-col sm:flex-row sm:items-center gap-[20px] sm:justify-between mb-6">
          <h1 className="text-2xl font-semibold text-gray-800">
            {query ? `Search results for "${query}"` : "Users"}
          </h1>
          
          <Button
            href="/admin/users/new_user"
            containerClassName="!w-fit"
            label={
              <div className="w-fit flex items-center gap-[5px]">
                <FaUserPlus className="mr-2 text-white/70" /> New User
              </div>
            }
          />
        </div>

        <SearchBar
          placeholder="Search..."
          name="search_module"
          value={query}
          setValue={(value) => handleQuery(value)}
          containerClassName="lg:!flex !hidden !w-[350px] lg:!w-[400px]"
        />

        <div className='w-full flex flex-col'>
          <div className='w-full h-full bg-white rounded-[12px] border border-[#D9D9D9] mt-4'>
            <div className='border-b border-[#D9D9D9] relative min-h-[120px] !overflow-x-auto w-full'>
              <table className="min-w-max w-full">
                <thead>
                  <tr className='border-b border-[#D9D9D9]'>
                    <th className='text-[#6B6968] md:!min-w-0 !min-w-[50px] !text-left font-medium text-sm py-[14px] pl-[19px]'>#</th>
                <th className='text-[#6B6968] md:!min-w-0 !min-w-[150px] !text-left font-medium text-sm py-[14px]'>Name</th>
                <th className='text-[#6B6968] md:!min-w-0 !min-w-[150px] !text-left font-medium text-sm py-[14px]'>Email</th>
                <th className='text-[#6B6968] md:!min-w-0 !min-w-[150px] !text-left font-medium text-sm py-[14px]'>Balance</th>
                <th className='text-[#6B6968] md:!min-w-0 !min-w-[150px] !text-left font-medium text-sm py-[14px]'>Last Login</th>
                <th className='text-[#6B6968] md:!min-w-0 !min-w-[150px] !text-left font-medium text-sm py-[14px]'>Send Newsletter</th>
                <th className='text-[#6B6968] md:!min-w-0 !min-w-[150px] !text-left font-medium text-sm py-[14px]'>Active</th>
                <th className='text-[#6B6968] md:!min-w-0 !min-w-[150px] !text-left font-medium text-sm py-[14px]'>Actions</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user, index) => (
                <tr
                  key={user.uid}
                  className='border-b border-[#F5F5F5] smooth'
                >
                  <td className='md:!min-w-0 !min-w-[50px] pl-5 pt-[14px] pb-[13px] text-sm text-dark font-medium'>{index + 1}</td>
                  <td className='md:!min-w-0 !min-w-[150px] pt-[14px] pb-[13px] text-sm text-orange-600 font-medium'>
                    <Link href={`/admin/users/${user.uid}`}>
                      {user.first_name} {user.last_name}
                    </Link>
                  </td>
                  <td className='md:!min-w-0 !min-w-[150px] pt-[14px] pb-[13px] text-sm text-dark font-medium'>{user.email}</td>
                  <td className='md:!min-w-0 !min-w-[150px] pt-[14px] pb-[13px] text-sm text-dark font-medium'>
                    {Number(user.balance).toLocaleString()}
                  </td>
                  <td className='md:!min-w-0 !min-w-[150px] pt-[14px] pb-[13px] text-sm text-dark font-medium'>{user.last_login}</td>
                  <td className='md:!min-w-0 !min-w-[150px] pt-[14px] pb-[13px] text-sm text-dark font-medium'>{user.send_newsletter ? "Yes" : "No"}</td>
                  <td className='md:!min-w-0 !min-w-[150px] pt-[14px] pb-[13px] text-sm text-dark font-medium'>{user.is_active ? "Yes" : "No"}</td>
                  <td className="md:!min-w-0 !min-w-[150px] pt-[14px] pb-[13px] text-sm text-dark font-medium pr-[8px]">
                    <div className="w-fit flex text-[#CCC] items-center gap-[8px]">
                      <Link href={`/admin/users/${user.uid}/edit_user`} title="Edit">
                        <FaEdit size={17} className="text-orange-500" />
                      </Link>|
                    {user.is_active ? (
                      <button
                        onClick={() => setShowModal('deactivate')}
                        title="Deactivate"
                        className="cursor-pointer"
                      >
                        <FaBan size={17} className="text-orange-500" />
                      </button>
                    ) : (
                      <button
                        onClick={() => setShowModal('activate')}
                        title="Activate"
                        className="cursor-pointer"
                      >
                        <FaCheck size={17} className="text-orange-500" />
                      </button>
                    )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        </div>
        </div>

        <Pagination 
          query={query}
          page={page}
          pages={pages}
        />
      </div>

      <ConfirmModal 
        title={showModal == 'activate' ? 'Activate user' : 'Deactivate user'}
        body={showModal == 'activate' ? 'Are you sure you want to activate this user?' : 'Are you sure you want to deactivate this user?'}
        isOpen={showModal == 'activate' || showModal == 'deactivate'}
        onClose={() => setShowModal('')}
        handleConfirm={handleStatus}
      />
    </>
  );
}
