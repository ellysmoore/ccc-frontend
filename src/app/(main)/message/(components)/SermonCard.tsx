import { PurchaseModal } from "@/components";
import { useCartStore } from "@/store";
import { User } from "@/types";
import { Message } from "@/types/messageType";
import Image from "next/image";
import { motion } from 'framer-motion';
import Link from "next/link";
import { useEffect, useState } from "react";
import { BiDownload } from "react-icons/bi";
import { BsFillCartPlusFill, BsFillCreditCardFill } from "react-icons/bs";

export const SermonCard = ({ message, user } : { message: Message, user: User }) => {
  const [openModal, setOpenModal] = useState('');
  const [hovered, setHovered] = useState(false);
  const { addToCart } = useCartStore(state => state);

  const [isLargeScreen, setIsLargeScreen] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(min-width: 786px)');
    const updateScreenSize = () => setIsLargeScreen(mediaQuery.matches);

    updateScreenSize();
    mediaQuery.addEventListener('change', updateScreenSize);

    return () => mediaQuery.removeEventListener('change', updateScreenSize);
  }, []);

  const shouldShow = !isLargeScreen || hovered;

  return (
    <>
      <div
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        className="w-full relative group rounded-[12px] p-3 bg-transparent hover:bg-[#f0f0f0] transition-colors duration-300"
      >
        <Link
          href={`/message/${message.id}`}
          className="truncate w-full flex flex-row flex-start gap-[10px]"
        >
          <div className="min-w-[50%] h-[100px] relative">
            <Image
              src={message.album_art}
              alt=""
              fill
              className="rounded-[12px] object-cover w-full"
            />
          </div>

          <div className="truncate w-full flex flex-col">
            <div className="truncate text-left text-[#0D0D12] text-f16 font-medium">
              {message.topic.replace(/_/g, ' ')}
            </div>

            <div className="truncate mt-[4px] w-full flex flex-col gap-[2px] text-f14">
              <div className="truncate w-full flex items-center text-[#667085]">
                Duration:&#160; <span className="text-[#0D0D12]">1 hr</span>
              </div>
              <div className="truncate w-full flex items-center text-[#667085]">
                Downloads:&#160; <span className="text-[#0D0D12]">20</span>
              </div>
            </div>
          </div>
        </Link>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={shouldShow ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
          transition={{ duration: 0.3, ease: 'easeOut' }}
          className="absolute bottom-[30%] flex w-full px-[14px] gap-2"
        >
          {message.is_free || message.id === message.message_id ? (
            <Link
              href={`/download/${message.id}`}
              className="bg-[#FF6300] hover:bg-[#e65a00] h-[35px] w-[35px] flex items-center justify-center text-white p-2 rounded-full shadow-md transition"
            >
              <BiDownload size={20} />
            </Link>
          ) : (
            <>
              <button
                onClick={() => addToCart(message)}
                className="bg-[#FF6300] hover:bg-[#e65a00] h-[35px] w-[35px] flex items-center justify-center text-white p-2 rounded-full shadow-md transition"
              >
                <BsFillCartPlusFill size={18} />
              </button>
              <button
                onClick={() => setOpenModal('checkout')}
                className="bg-[#FF6300] hover:bg-[#e65a00] h-[35px] w-[35px] flex items-center justify-center text-white p-2 rounded-full shadow-md transition"
              >
                <BsFillCreditCardFill size={18} />
              </button>
            </>
          )}
        </motion.div>
      </div>

      <PurchaseModal 
        isOpen={openModal == 'checkout'}
        onClose={() => setOpenModal('')}
        userEmail={user?.email}
        title='Instant Purchase'
        handleNext={() => setOpenModal('')}
      />
    </>
  );
}