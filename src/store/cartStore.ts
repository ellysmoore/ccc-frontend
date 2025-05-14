import { Message } from '@/types/messageType';
import { create } from 'zustand';

export interface CartStoreStatesProps {
  carts: Message[];
  emptyCart: () => void;
  addToCart: (value: Message) => void;
  removeFromCart: (id: string) => void;
  updateCart: (value: Message) => void;
}

export const useCartStore = create<CartStoreStatesProps>((set, get) => ({
  carts: [],
  emptyCart: () => set({ 
    carts: [] 
  }),
  addToCart: (value: Message) => {
    const { carts } = get();
    set({ carts: [
      ...carts, 
      value
    ] });
  },
  removeFromCart: (message_id: string) => {
    const { carts } = get();
    set({ 
      carts: carts.filter(
        item => item.message_id !== message_id
      ) 
    });
  },
  updateCart: (updatedItem: Message) => {
    const { carts } = get();
    set({
      carts: carts.map(
        item => (item.message_id === updatedItem.message_id) ? 
        { 
          ...item, 
          ...updatedItem 
        } : item
      ),
    });
  },
}));
