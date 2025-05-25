'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { FaTrash } from 'react-icons/fa';

import { PurchaseModal } from '@/components';
import { Button } from '@/components/Button';
import { useCommonStore } from '@/store/commonStore';
import { apiRequest } from '@/utils';
import { MESSAGE_DATA } from '@/data/dummyData';

export interface CartItem {
  message_id: string;
  album_art: string;
  topic: string;
  description: string;
  price: number;
}

interface User {
  id: string;
  name: string;
  email: string;
  is_administrator: boolean;
  is_super_admin: boolean;
}

const user: User = {
  id: '1',
  name: 'Guest',
  email: 'guest@example.com',
  is_administrator: false,
  is_super_admin: false,
};

export default function CartPage() {
  const [cartItems, setCartItems] = useState<CartItem[]>(MESSAGE_DATA);
  const [total, setTotal] = useState(0);
  const [openModal, setOpenModal] = useState('');
  const [loading, setLoading] = useState(true);
  const { setRefreshCart, refreshCart } = useCommonStore((state) => state);
  const router = useRouter();

  const loadCart = async () => {
    setLoading(true);
    try {
      const response = await apiRequest({ url: '/api/cart' });
      const items = response?.messages || [];
      setCartItems(items);
      const sum = items.reduce((acc: number, item: CartItem) => acc + item.price, 0);
      setTotal(response?.total || sum || 0);
    } catch (error) {
      console.error('Error loading cart:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadCart();
  }, []);

  const removeFromCart = async (index: number, id: string) => {
    setCartItems((prev) => prev.filter((_, i) => i !== index));
    try {
      await apiRequest({ url: `/api/cart/remove/${id}` });
      loadCart();
      setRefreshCart(!refreshCart);
    } catch (error) {
      console.error('Error removing item:', error);
    }
  };

  // Simple shimmer loading row
  const LoadingRow = () => (
    <tr className="animate-pulse">
      <td className="p-4">
        <div className="h-16 w-48 bg-gray-300 rounded-md" />
      </td>
      <td className="p-4">
        <div className="h-6 w-20 bg-gray-300 rounded-md" />
      </td>
      <td className="p-4">
        <div className="h-6 w-6 bg-gray-300 rounded-full" />
      </td>
    </tr>
  );

  return (
    <div className="container mx-auto px-4 py-6 w-full h-full overflow-y-auto border-1 border-gray-200 shadow-md rounded-2xl">
      <h2 className="text-xl font-semibold text-[#0D0D12] border-b border-gray-300 pb-3 mb-4">
        Cart
      </h2>

      <div className="bg-[#FAFAFA] border border-[#F4F7F8] rounded-xl shadow-sm p-4 md:p-6 min-h-[200px]">
        {loading ? (
          <table className="min-w-full text-sm">
            <thead className="bg-gray-100 text-gray-600 text-left uppercase">
              <tr>
                <th className="p-4">Item</th>
                <th className="p-4">Price</th>
                <th className="p-4">Action</th>
              </tr>
            </thead>
            <tbody>
              {[...Array(4)].map((_, i) => (
                <LoadingRow key={i} />
              ))}
            </tbody>
          </table>
        ) : cartItems.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="min-w-full text-sm">
              <thead className="bg-gray-100 text-gray-600 text-left uppercase">
                <tr>
                  <th className="p-4">Item</th>
                  <th className="p-4">Price</th>
                  <th className="p-4">Action</th>
                </tr>
              </thead>
              <tbody>
                {cartItems.map((item, index) => (
                  <tr key={item.message_id} className="border-b last:border-b-0 border-gray-200">
                    <td className="p-4 min-w-[300px]">
                      <div className="flex gap-4 items-start">
                        <Image
                          src={item.album_art}
                          alt={item.topic}
                          width={64}
                          height={64}
                          className="rounded-md shadow-sm object-cover"
                        />
                        <div>
                          <h3 className="text-base font-medium text-gray-900 capitalize">
                            {item.topic.replace(/_/g, ' ')}
                          </h3>
                          <p className="text-sm text-gray-500">{item.description}</p>
                        </div>
                      </div>
                    </td>
                    <td className="p-4 font-semibold text-gray-800">
                      ₦ {item.price.toLocaleString()}
                    </td>
                    <td className="p-4">
                      <button
                        onClick={() => removeFromCart(index, item.message_id)}
                        className="text-red-500 hover:text-red-600 transition"
                        aria-label={`Remove ${item.topic} from cart`}
                      >
                        <FaTrash size={16} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
              <tfoot>
                <tr className="bg-gray-50 border-t border-gray-200">
                  <td className="p-4 font-medium text-gray-600">Total</td>
                  <td className="p-4 text-green-600 font-bold text-lg">₦ {total.toLocaleString()}</td>
                  <td></td>
                </tr>
              </tfoot>
            </table>
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-20 text-gray-500 space-y-4">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-20 h-20 text-gray-300"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={1.5}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2 9m5-9v9m4-9v9m5-9l2 9"
              />
            </svg>
            <p className="text-lg font-medium">Your cart is empty</p>
            <p className="text-sm max-w-xs text-center">
              Looks like you haven&apos;t added anything to your cart yet.
            </p>
          </div>
        )}

        {cartItems.length > 0 && !loading && (
          <div className="mt-6 flex justify-end">
            <Button
              label="Proceed to Checkout"
              onClick={() => setOpenModal('checkout')}
              containerClassName="!w-fit"
            />
          </div>
        )}
      </div>

      <PurchaseModal
        isOpen={openModal === 'checkout'}
        onClose={() => setOpenModal('')}
        userEmail={user.email}
        amount={String(total)}
        handleNext={() => router.push('/library')}
      />
    </div>
  );
}
