'use client'

import { Message } from "@/types/messageType";
import { MessageCard } from "@/app/(components)/MessageCard";
import { Loader } from "@/components/Loader";

export const MessageGrid = ({ 
  messages, 
  loading,
}: MessageGridProps) => {
  // const user = null;
  
  interface User {
    id: string;
    name: string;
    email: string;
    is_administrator: boolean;
    is_super_admin: boolean;
  };
  
  const user: User = {
    id: "1", // Replace with appropriate default values
    name: "Guest",
    email: "guest@example.com",
    is_administrator: false,
    is_super_admin: false,
  };

  if (loading) {
    return (
      <div className="flex py-12 justify-center">
        <Loader size="medium" />
      </div>
    );
  }

  return (
    <div 
      className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-[14px] mb-6" 
      id="messages-container"
    >
      {messages.map((msg: Message) => (
        <MessageCard key={msg.id} message={msg} user={user} />
      ))}
    </div>
  );
};

export interface MessageGridProps {
  messages: Message[]; 
  loading: boolean;
}