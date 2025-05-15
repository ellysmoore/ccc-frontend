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
        className="relative group rounded-[12px] p-3 bg-transparent hover:bg-[#f0f0f0] transition-colors duration-300"
      >
        <Link href={`/message/${message.id}`} className="flex flex-col">
          <Image
            src={message.album_art}
            alt=""
            height={271}
            width={195}
            className="rounded-[12px] object-cover w-full"
          />

          <div className="mt-[6px] mx-2 flex items-center justify-between text-f14 text-gray-400">
            <div className="flex items-center gap-2">
              <BiTime size={16} />
              <span className="text-f12">1 hr</span>
            </div>
            <div className="flex items-center gap-2">
              <BiDownload size={16} />
              <span className="text-f12">20</span>
            </div>
          </div>
        </Link>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={shouldShow ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
          transition={{ duration: 0.3, ease: "easeOut" }}
          className="absolute bottom-[30%] flex w-full px-[14px] gap-3"
        >
          {message.is_free || message.id === message.message_id ? (
            <Link
              href={`/download/${message.id}`}
              className="bg-[#FF6300] hover:bg-[#e65a00] h-[48px] w-[48px] flex items-center justify-center text-white p-2 rounded-full shadow-md transition"
            >
              <BiDownload size={20} />
            </Link>
          ) : (
            <>
              <button
                onClick={() => addToCart(message)}
                className="bg-[#FF6300] hover:bg-[#e65a00] h-[48px] w-[48px] flex items-center justify-center text-white p-2 rounded-full shadow-md transition"
              >
                <BsFillCartPlusFill size={18} />
              </button>
              <button
                onClick={() => setOpenModal("checkout")}
                className="bg-[#FF6300] hover:bg-[#e65a00] h-[48px] w-[48px] flex items-center justify-center text-white p-2 rounded-full shadow-md transition"
              >
                <BsFillCreditCardFill size={18} />
              </button>
            </>
          )}
        </motion.div>
      </div>

      <PurchaseModal
        isOpen={openModal == "checkout"}
        onClose={() => setOpenModal("")}
        userEmail={user?.email}
        title="Instant Purchase"
        handleNext={() => setOpenModal("")}
      />
    </>
  );
};
