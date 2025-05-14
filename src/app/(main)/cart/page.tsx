'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import { PurchaseModal } from '@/components';
import { FaTrash } from 'react-icons/fa';
import { useCommonStore } from '@/store/commonStore';
import { useRouter } from 'next/navigation';
import { apiRequest } from '@/utils';
import { MESSAGE_DATA } from '@/data/dummyData';
import { Button } from '@/components/Button';

export default function CartPage() {
  const [cartItems, setCartItems] = useState<CartItem[]>(MESSAGE_DATA);
  const [total, setTotal] = useState(0);
  const [openModal, setOpenModal] = useState('');
  const { setRefreshCart, refreshCart } = useCommonStore((state) => state);
  const router = useRouter();
  const user = null;

  // useEffect(() => {
  //   if (!openModal && cartItems.length < 1) {
  //     router.push('/library');
  //   }
  // }, [openModal, cartItems, router]);

  const loadCart = async () => {
    try {
      const response = await apiRequest({ url: '/api/cart' });
      setCartItems(response?.messages || []);
      const sum = response?.messages?.reduce((acc: number, item: CartItem) => acc + item.price, 0);
      setTotal(response?.total || sum || 0);
    } catch (error) {
      console.error('Error loading cart:', error);
    }
  };

  useEffect(() => {
    loadCart();
  }, []);

  const removeFromCart = async (index: number, id: string) => {
    setCartItems(prev => prev.filter((_, i) => i !== index));
    try {
      await apiRequest({ url: `/api/cart/remove/${id}` });
      loadCart();
      setRefreshCart(!refreshCart)
      // SHOW MESSAGE
    } catch (error) {
      console.error('Error removing item:', error);
    }
  };

  return (
    <div className="h-full overflow-y-auto rounded-[10px] bg-[#F5F5F5] w-full container mx-auto px-4 py-10">
      <h2 className='font-[500] border-b pb-[10px] border-gray-300 w-full flex items-center text-[#0D0D12] text-f18'>
        Cart
      </h2>

      <div className="bg-white p-3 rounded-[8px] mt-[10px] shadow-sm">
        <div className="overflow-x-auto">
          <table className="min-w-full text-f14 text-left">
            <thead className="uppercase bg-gray-100 text-gray-500">
              <tr>
                <th className="p-3">Item</th>
                <th className="p-3">Price</th>
                <th className="p-3">Actions</th>
              </tr>
            </thead>

            <tbody>
              {cartItems.map((item, index) => (
                <tr key={item.message_id} className="border-b border-[#E4E7EC]">
                  <td className="min-w-[300px] p-3 flex items-center gap-4">
                    <Image
                      src={`${item.album_art}`}
                      alt={item.topic}
                      width={70}
                      height={70}
                      className="rounded-[8px] shadow-sm"
                    />
                    <div className='flex flex-col gap-[4px]'>
                      <h5 className="text-f16 font-medium">{item.topic.replace(/_/g, ' ')}</h5>
                      <span className="text-gray-500 text-f14">{item.description}</span>
                    </div>
                  </td>

                  <td className="min-w-[100px] p-2 text-f15 font-semibold">₦ {item.price.toLocaleString()}</td>
                  <td className="min-w-[100px] p-3 text-f14">
                    <button onClick={() => removeFromCart(index, item.message_id)}>
                      <FaTrash className='cursor-pointer text-red-500 hover:text-red-700' />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
            <tfoot>
              <tr className="bg-gray-100">
                <th className="p-3 text-gray-500">Total</th>
                <th className="p-3 text-lg text-green-700">₦ {total.toLocaleString()}</th>
                <th></th>
              </tr>
            </tfoot>
          </table>
        </div>

        {cartItems.length > 0 && (
          <div className="mt-5 flex justify-end">
            <Button 
              label='Proceed to Checkout'
              onClick={() => setOpenModal('checkout')}
              containerClassName='!w-fit'
            />
          </div>
        )}
      </div>

      <PurchaseModal 
        isOpen={openModal == 'checkout'}
        onClose={() => setOpenModal('')}
        // @ts-expect-error null
        userEmail={user?.email}
        amount={String(total)}
        handleNext={() => router.push('/library')}
      />
    </div>
  );
}

export interface CartItem {
  message_id: string;
  album_art: string;
  topic: string;
  description: string;
  price: number;
}