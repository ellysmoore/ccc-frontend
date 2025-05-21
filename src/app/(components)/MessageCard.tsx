'use client';

import { PurchaseModal } from "@/components";
import { useCartStore } from "@/store";
import { User } from "@/types";
import { Message } from "@/types/messageType";
import Image from "next/image";
import { motion } from "framer-motion";
import Link from "next/link";
import { useEffect, useState } from "react";
import { BiDownload, BiTime } from "react-icons/bi";
import { BsFillCartPlusFill, BsFillCreditCardFill } from "react-icons/bs";

export const MessageCard = ({
  message,
  user,
}: {
  message: Message;
  user: User;
}) => {
  const [openModal, setOpenModal] = useState("");
  const [hovered, setHovered] = useState(false);
  const { addToCart } = useCartStore((state) => state);

  const [isLargeScreen, setIsLargeScreen] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(min-width: 786px)");
    const updateScreenSize = () => setIsLargeScreen(mediaQuery.matches);

    updateScreenSize();
    mediaQuery.addEventListener("change", updateScreenSize);

    return () => mediaQuery.removeEventListener("change", updateScreenSize);
  }, []);

  const shouldShow = !isLargeScreen || hovered;

  return (
    <>
      <div
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        className="relative group rounded-xl p-3 bg-transparent hover:bg-[#f9f9f9] transition-colors duration-300"
      >
        <Link href={`/message/${message.id}`} className="flex flex-col">
          {/* Image */}
          <div className="w-full aspect-[3/4] relative rounded-xl overflow-hidden">
            <Image
              src={message.album_art}
              alt={message.topic || "Message"}
              // height={271}
              // width={195}
              // style={{width: 195, height: 271}}
              fill
              className="rounded-[12px] object-cover w-full"
            />
          </div>

          {/* Title */}
          <h3 className="mt-3 text-sm font-semibold text-[#0D0D12] line-clamp-2">
            {message.topic.slice(0, 30)}
          </h3>

          {/* Stats */}
          <div className="mt-2 flex items-center justify-between text-xs text-gray-500">
            <div className="flex items-center gap-1">
              <BiTime size={14} />
              <span>1 hr</span>
            </div>
            <div className="flex items-center gap-1">
              <BiDownload size={14} />
              <span>{20}</span>
            </div>
          </div>
        </Link>

        {/* Action Buttons (on hover) */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={shouldShow ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
          transition={{ duration: 0.25, ease: "easeOut" }}
          className="absolute bottom-20 left-0 right-0 flex justify-center gap-3"
        >
          {message.is_free || message.id === message.message_id ? (
            <Link
              href={`/download/${message.id}`}
              className="bg-[#FF6300] hover:bg-[#e65a00] h-11 w-11 flex items-center justify-center text-white rounded-full shadow-md transition"
            >
              <BiDownload size={20} />
            </Link>
          ) : (
            <>
              <button
                onClick={() => addToCart(message)}
                className="bg-[#FF6300] hover:bg-[#e65a00] h-11 w-11 flex items-center justify-center text-white rounded-full shadow-md transition"
              >
                <BsFillCartPlusFill size={18} />
              </button>
              <button
                onClick={() => setOpenModal("checkout")}
                className="bg-[#FF6300] hover:bg-[#e65a00] h-11 w-11 flex items-center justify-center text-white rounded-full shadow-md transition"
              >
                <BsFillCreditCardFill size={18} />
              </button>
            </>
          )}
        </motion.div>
      </div>

      {/* Purchase Modal */}
      <PurchaseModal
        isOpen={openModal === "checkout"}
        onClose={() => setOpenModal("")}
        userEmail={user?.email}
        title="Instant Purchase"
        handleNext={() => setOpenModal("")}
      />
    </>
  );
};
