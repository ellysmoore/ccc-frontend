'use client'

import { Message } from "@/types/messageType";
import { MessageCard } from "@/app/(components)/MessageCard";
import { Loader } from "@/components/Loader";

export const MessageGrid = ({ 
  messages, 
  loading,
}: MessageGridProps) => {
  const user = null;

  if (loading) {
    return (
      <div className="flex justify-center">
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