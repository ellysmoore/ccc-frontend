"use client";
import { useEffect, useState } from "react";
import { MessageCard } from "./MessageCard";
import { User } from "@/types";
import { Message } from "@/types/messageType";
import { Loader } from "@/components/Loader";
import { Button } from "@/components/Button";
import { MESSAGE_DATA } from "@/data/dummyData";

export const MessageFeed = ({ user } : { user: User }) => {
  const [messages, setMessages] = useState<Message[]>(MESSAGE_DATA);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);

  // const [page, setPage] = useState(1);
  // const [messages, setMessages] = useState([]);
  // const [loading, setLoading] = useState(false);
  // const [filters, setFilters] = useState({
  //   services: {},
  //   speakers: {},
  //   months: {},
  //   years: {},
  // });

  // useEffect(() => {
  //   const fetchMessages = async () => {
  //     setLoading(true);
  //     const query = new URLSearchParams({
  //       page,
  //       limit: 21,
  //       centre: window.location.pathname.split("/")[1] || "general",
  //       services: Object.keys(filters.services).join(","),
  //       speakers: Object.keys(filters.speakers).join(","),
  //       months: Object.keys(filters.months).join(","),
  //       years: Object.keys(filters.years).join(","),
  //     }).toString();
  
  //     const res = await fetch(`/api/all?${query}`);
  //     const data = await res.json();
  //     setMessages(prev => page === 1 ? data.messages : [...prev, ...data.messages]);
  //     setLoading(false);
  //   };
  
  //   fetchMessages();
  // }, [page, filters]);

  // const toggleFilter = (type, id) => {
  //   setPage(1);
  //   setFilters(prev => ({
  //     ...prev,
  //     [type]: {
  //       ...prev[type],
  //       [id]: !prev[type][id] ? true : undefined
  //     }
  //   }));
  // };

  const fetchMessages = async () => {
    // setLoading(true);
    // TODO: ADD selected = { services: {}, speakers: {}, months: {}, years: {} }; filter to this endpoint
    const res = await fetch(`/api/all?page=${page}&limit=21&centre=general`);
    const data = await res.json();
    setMessages((prev: Message[]) => [...prev, ...data.messages]);
    setLoading(false);
  };

  useEffect(() => {
    fetchMessages();
  }, [page]);

  return (
    <>
      <div 
        className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-[14px] mb-6" 
        id="messages-container"
      >
        {messages.map((msg: Message) => (
          <MessageCard key={msg.id} message={msg} user={user} />
        ))}
      </div>

      {loading ? (
        <div className="w-full flex justify-center">
          <Loader size="medium" />
        </div>
      ) : (
        <div className="w-full flex justify-center">
          <Button 
            label='Load More'
            containerClassName="!w-fit"
            onClick={() => setPage((p) => p + 1)}
          />
        </div>
      )}
    </>
  );
}
