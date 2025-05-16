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
  <div className="flex h-full flex-col-reverse md:flex-row gap-4 md:gap-6">
    {/* Message Feed Panel */}
    <div className="h-full flex-1 overflow-y-auto rounded-2xl bg-white shadow-md p-4 md:p-6">
      {/* @ts-expect-error-null */}
      <MessageFeed user={user} />
    </div>

    {/* Filters Sidebar */}
    <aside className="h-full w-full md:max-w-sm overflow-y-auto rounded-2xl bg-white shadow-md p-4 md:p-6">
      <FiltersSidebar />
    </aside>
  </div>
</section>

  );
}

export default MainIndexPage