'use client'

import { MessageFeed } from './(components)/MessageFeed';
import { FiltersSidebar } from './(components)/FiltersSidebar';
import { useEffect, useState } from 'react';

const MainIndexPage = () => {
  const [user, setUser] = useState(null);

   useEffect(() => {
    setUser(null);
   }, []);

  return (
    <section className="flex flex-col w-full h-full">
      <div className="flex h-full flex-col-reverse md:flex-row gap-[12px]">
        <div className="h-full overflow-y-auto rounded-[10px] bg-[#F5F5F5] w-full md:w-2/3 py-[12px] md:py-[15px] px-[20px] md:px-[25px]">
          {/* @ts-expect-error-null */}
          <MessageFeed user={user} />
        </div>

        <div className="h-full overflow-y-auto rounded-[10px] bg-[#F5F5F5] w-full md:w-1/3 py-[12px] md:py-[15px] px-[20px] md:px-[25px]">
          <FiltersSidebar />
        </div>
      </div>
    </section>
  );
}

export default MainIndexPage