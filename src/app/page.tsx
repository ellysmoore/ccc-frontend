'use client';

import { useEffect, useState } from 'react';
import { MessageFeed } from './(components)/MessageFeed';
import { FiltersSidebar } from './(components)/FiltersSidebar';
import { FaFilter } from 'react-icons/fa';
import MainLayout from '@/layouts/MainLayout';
// import { Tooltip } from 'react-tooltip';

const MainIndexPage = () => {
  const [user, setUser] = useState(null);
  const [showSidebar, setShowSidebar] = useState(false); // Default to hidden on mobile

  useEffect(() => {
    setUser(null);
  }, []);

  // Prevent body scroll when sidebar is open on mobile
  useEffect(() => {
    if (showSidebar) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [showSidebar]);

  return (
    // <MainLayout>
    //   <section className="flex flex-col w-full h-full">
    //     <div className="flex h-full flex-col-reverse md:flex-row gap-4 md:gap-6">
    //       {/* Message Feed Panel */}
    //       <div className="h-full flex-1 overflow-y-auto rounded-2xl bg-white shadow-md p-4 md:p-6">
    //         {/* @ts-expect-error-null */}
    //         <MessageFeed user={user} />
    //       </div>

    //       {/* Filters Sidebar */}
    //       <aside className="h-full w-full md:max-w-sm overflow-y-auto rounded-2xl bg-white shadow-md p-4 md:p-6">
    //         <FiltersSidebar />
    //       </aside>
    //     </div>
    //   </section>
    // </MainLayout>

    <MainLayout>
      <section className="flex flex-col w-full h-full mt-4 rounded-2xl mb-6 shadow-[0_-1px_0_0_rgba(0,0,0,0.08)]">
        {/* Toggle Button */}
        <div className="flex justify-end px-4 p-2 md:hidden">
          <button
            className="font-[600] bg-[#F4F7F8] text-[#0D0D12] hover:bg-[#F6F8FA] border-2 border-[#F4F7F8] cursor-pointer relative min-w-[36px] h-[36px] rounded-full flex items-center justify-center"
            onClick={() => setShowSidebar((prev) => !prev)}
            data-tooltip-id="filters"
            data-tooltip-content="Filters"
          >
            <FaFilter size={16} className="text-[#0D0D12]" />
          </button>
          {/* <Tooltip id="filters" place="bottom" /> */}
        </div>

        {/* Main Content Area */}
        <div className="relative flex h-full flex-col-reverse md:flex-row gap-4 md:gap-6 transition-all duration-300">
          {/* Message Feed Panel */}
          <div className="h-full flex-1 overflow-y-auto rounded-2xl bg-white shadow-md p-4 md:p-6">
            {/* @ts-expect-error-null */}
            <MessageFeed user={user} />
          </div>

          {/* Filters Sidebar */}
          <aside
            className={`
              md:static absolute top-0 right-0 z-50 h-full w-full md:max-w-sm overflow-y-auto rounded-2xl bg-white shadow-md p-4 md:p-6
              transition-transform duration-300 ease-in-out
              ${showSidebar ? 'translate-x-0' : 'translate-x-full'}
              md:translate-x-0
            `}
          >
            <FiltersSidebar />
          </aside>
        </div>
      </section>
    </MainLayout>
  );
};

export default MainIndexPage;
