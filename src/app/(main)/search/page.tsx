'use client'

import React, { useEffect, useState } from 'react'
import { MessageGrid } from './(components)/MessageGrid';
import { SearchSidebar } from './(components)/SearchSideBar';
import { useInfiniteScroll } from './(components)/useInfiniteScroll';
import { apiRequest } from '@/utils';
import { Message } from '@/types/messageType';
import { MESSAGE_DATA } from '@/data/dummyData';

const SearchIndexPage = () => {
  const [query, setQuery] = useState("");
  const [messages, setMessages] = useState<Message[]>(MESSAGE_DATA);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(false);
  const [selected, setSelected] = useState({
    speakers: {} as Record<string, boolean>,
    services: {} as Record<string, boolean>,
  });

  useEffect(() => {
    const url = new URLSearchParams(window.location.search);
    setQuery(url.get("q") || "");
  }, []);

  useEffect(() => {
    loadMessages(1, true);
  }, [query, selected]);

  useInfiniteScroll(() => loadMessages(page + 1), hasMore, loading);

  const loadMessages = async (nextPage: number, reset = false) => {
    setLoading(true);

    const speakerIds = Object.keys(selected.speakers).join(",");
    const serviceIds = Object.keys(selected.services).join(",");

    const response = await apiRequest({
      url: `/api/search?q=${query}&page=${nextPage}&limit=20&speakers=${speakerIds}&services=${serviceIds}`
    })

    const data = await response.data;

    if (reset) {
      setMessages(data.messages || []);
    } else {
      setMessages((prev) => [...prev, ...(data.messages || [])]);
    }

    setHasMore(data.messages.length > 0);
    setPage(nextPage);
    setLoading(false);
  };

  const toggleFilter = (type: "speakers" | "services", id: string) => {
    setPage(1);
    setSelected((prev) => {
      const updated = { ...prev[type] };
      if (updated[id]) {
        delete updated[id];
      } else {
        updated[id] = true;
      }
      return { ...prev, [type]: updated };
    });
  };

  return (
    <>
      <div className="flex h-full flex-col md:flex-row gap-[12px]">
        <div className="h-full overflow-hidden hover:overflow-y-auto border-1 border-gray-200 shadow-md rounded-2xl w-full md:w-2/3 py-6 md:py-[15px] px-[20px] md:px-[25px]">
          <div className="flex flex-col gap-[10px]">
            <h2 className="text-f16 md:text-f18 font-semibold text-gray-900">
              Search Results
            </h2>
            <h2 className='font-[500] border-b pb-[10px] border-gray-300 w-full flex items-center text-[#0D0D12] text-f18'>
              {query}
            </h2>
          </div>

          <MessageGrid messages={messages} loading={loading} />
        </div>

        <div className="h-full overflow-hidden hover:overflow-y-auto border-1 border-gray-200 shadow-md rounded-2xl w-full md:w-1/3 py-[12px] md:py-[15px] px-[20px] md:px-[25px]">
          <SearchSidebar selected={selected} toggleFilter={toggleFilter} />
        </div>
      </div>
    </>
  )
}

export default SearchIndexPage