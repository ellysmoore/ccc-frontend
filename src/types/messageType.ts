import { ReactNode } from "react";

export interface Message {
  speaker?: ReactNode;
  id: string;
  topic: string;
  album_art: string;
  description: string;
  price: number;
  size: string;
  sample: string;
  is_free: boolean;
  message_id: string;
};

export interface Category {
  category_id: string;
  id: string;
  banner: string;
  icon: string;
  description: string;
  name: string;
}