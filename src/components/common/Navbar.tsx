import { FaWallet, FaCartPlus, FaTicketAlt } from "react-icons/fa";
import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
import { FundWalletModal } from "../FundWalletModal";
import { LoginModal } from "../LoginModal";
import { SignUpModal } from "../SignUpModal";
import { useCommonStore } from "@/store/commonStore";
import { User } from "@/types";
import { apiRequest, removeCookie } from "@/utils";
import { SearchBar } from "./SearchBar";
import { MENU_DATA } from "@/data/navBar";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import { PasswordResetModal } from "../PasswordResetModal";

export const Navbar = ({ user }: { user?: User }) => {
  const [openModal, setOpenModal] = useState("");
  const { refreshBalance, refreshCart } = useCommonStore((state) => state);
  const [walletBalance, setWalletBalance] = useState(0);
  const [cartCount, setCartCount] = useState(0);
  const pathname = usePathname();
  const [openSidebar, setOpenSidebar] = useState(false);

  const loadWalletBalance = async () => {
    try {
      const response = await apiRequest({ url: "/wallet/balance" });
      setWalletBalance(response.balance);
    } catch (error) {
      console.error("Error loading wallet balance:", error);
    }
  };

  const loadCart = async () => {
    try {
      const response = await apiRequest({ url: "/cart" });
      setCartCount(response.messages?.length);
    } catch (error) {
      console.error("Error loading cart:", error);
    }
  };

  const variants = {
    opacity: { opacity: [0, 1], transition: { duration: 0.2 } },
    slideIn: {
      top: [-350, 60],
      transition: { duration: 0.2, delay: 0.1, ease: [0.1, 0.79, 0.36, 0.96] },
    },
    slideInAndOpacity: {
      top: [-350, 60],
      opacity: [0, 1],
      transition: { duration: 0.2, delay: 0.1, ease: [0.1, 0.79, 0.36, 0.96] },
    },
  };

  useEffect(() => {
    loadCart();
    loadWalletBalance();
  }, [refreshBalance, refreshCart]);

  const handleLogout = () => {
    removeCookie("access_token");
    // TODO: FIND A WAY TO REFRESH PAGE WITHOUT RELOADING
  };

  const handleModal = (path: string) => {
    setOpenModal(path);
  };

  const activePath = (link: NavLinkProps) => {
    return Boolean(link?.path && pathname?.includes(link?.path));
  };

  const handlePathlessNav = (link: NavLinkProps) => {
    handleModal(link?.slug);
  };

  const menuContents = () => {
    return (
      <>
        {MENU_DATA?.map((link: NavLinkProps) => {
          const canShow =
            ((user?.is_administrator || user?.is_super_admin) &&
              link.showFor?.includes("ADMIN")) ||
            (user && link.showFor?.includes("USER")) ||
            (!user && link.showFor?.includes("NON_USER"));

          if (!canShow) return null;

          return link?.path ? (
            <Link
              key={link?.id}
              href={link?.path}
              className={`text-f16 lg:text-f15 relative hover:!bg-[#F6F8FA] lg:border-[2px] !border-[#F4F7F8] hover:!text-[#0D0D12] rounded-full cursor-pointer w-full lg:w-fit flex items-center lg:gap-[8px] py-[8px] lg:py-[8px] px-[18px] lg:px-[12px]
                  ${
                    activePath(link)
                      ? "!font-[700] !bg-[#EEF0F3] !text-[#0D0D12]"
                      : "font-[600] lg:!bg-[#F4F7F8] !text-[#0D0D12]"
                  }
                `}
            >
              <div className="w-fit">{link?.label}</div>
            </Link>
          ) : (
            <button
              type="button"
              key={link?.id}
              onClick={() => handlePathlessNav(link)}
              className={`text-f16 lg:text-f15 relative hover:!bg-[#F6F8FA] lg:border-[2px] !border-[#F4F7F8] hover:!text-[#0D0D12] rounded-full cursor-pointer w-full lg:w-fit flex items-center lg:gap-[8px] py-[8px] lg:py-[8px] px-[18px] lg:px-[12px]
                  ${
                    activePath(link)
                      ? "!font-[700] !bg-[#EEF0F3] !text-[#0D0D12]"
                      : "font-[600] lg:!bg-[#F4F7F8] !text-[#0D0D12]"
                  }
                `}
            >
              <div className="w-fit">{link?.label}</div>
            </button>
          );
        })}
      </>
    );
  };

  return (
    <>
      <nav className="w-full !fixed top-0 !z-50 right-0 left-0 !bg-[#FFFFFF]">
        <div className="w-full flex flex-col items-center relative">
          <div className="border-b-[0.5px] border-[#E4E7EC] w-full flex justify-center">
            <section className="z-30 flex items-center gap-[10px] py-[12px] lg:py-[14px] justify-between max-w-[1500px] w-full px-[16px] lg:px-[32px] bg-white">
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="min-w-[24px] lg:hidden cursor-pointer"
                onClick={() => setOpenSidebar((prev) => !prev)}
              >
                <path
                  d="M3 4H21V6H3V4ZM3 11H21V13H3V11ZM3 18H21V20H3V18Z"
                  fill="#101828"
                />
              </svg>

              <Link
                className="cursor-pointer w-fit hidden lg:flex items-center gap-[10px]"
                href="/"
              >
                <Image
                  src={"/images/insights_logo.png"}
                  width={187}
                  height={40}
                  className="object-contain"
                  alt="Insights Logo"
                  loading="lazy"
                />
              </Link>

              <SearchBar
                placeholder="Search eLibrary"
                name="search_eLibrary"
                updateUrl
                containerClassName="lg:!flex !hidden !w-[400px] lg:!w-[502px]"
              />

              <div className="flex gap-[15px] md:gap-[30px] items-center">
                <Link
                  href="#"
                  className="font-[600] !bg-[#F4F7F8] !text-[#0D0D12] hover:!bg-[#F6F8FA] border-[2px] !border-[#F4F7F8] cursor-pointer relative min-w-[36px] h-[36px] rounded-full flex items-center justify-center"
                >
                  {/* Check eTicket */}
                  <FaTicketAlt
                    size={16}
                    className="text-[#0D0D12] hover:text-[#9a9ab3]"
                  />
                </Link>

                {user ? (
                  <>
                    <button
                      onClick={handleLogout}
                      className="font-[600] text-f14 md:text-f15 cursor-pointer text-[#0D0D12] hover:text-[#0D0D12]"
                    >
                      Logout
                    </button>

                    <button
                      className="font-[600] !bg-[#F4F7F8] !text-[#0D0D12] hover:!bg-[#F6F8FA] border-[2px] !border-[#F4F7F8] cursor-pointer relative min-w-[36px] h-[36px] rounded-full flex items-center justify-center"
                      onClick={() => handleModal("fundWallet")}
                    >
                      <FaWallet
                        size={16}
                        className="text-[#0D0D12] hover:text-[#0D0D12]"
                      />
                      <div className="whitespace-nowrap px-[4px] absolute top-[-8px] right-[-8px] flex items-center justify-center text-[11px] leading-[100%] min-h-[18px] min-w-[18px] rounded-full bg-[#FF6300] text-white">
                        {walletBalance}
                      </div>
                    </button>
                  </>
                ) : null}

                <Link
                  href="/cart"
                  className="font-[600] !bg-[#F4F7F8] !text-[#0D0D12] hover:!bg-[#F6F8FA] border-[2px] !border-[#F4F7F8] cursor-pointer relative min-w-[36px] h-[36px] rounded-full flex items-center justify-center"
                >
                  <FaCartPlus
                    size={16}
                    className="text-[#0D0D12] hover:text-[#9a9ab3]"
                  />
                  <div className="whitespace-nowrap px-[4px] absolute top-[-8px] right-[-8px] flex items-center justify-center text-[11px] leading-[100%] min-h-[18px] min-w-[18px] rounded-full bg-[#FF6300] text-white">
                    {cartCount}
                  </div>
                </Link>
              </div>
            </section>
          </div>

          <aside className="bg-white px-[32px] py-[15px] gap-[12px] max-w-[1500px] w-full hidden lg:flex items-center">
            {menuContents()}
          </aside>

          {/* MOBILE SIDE MENU */}
          <motion.aside
            variants={variants}
            animate={openSidebar ? "slideInAndOpacity" : { top: -350 }}
            className={`z-20 lg:hidden bg-white absolute py-[16px] gap-[8px] w-full ${
              openSidebar ? "flex" : "hidden"
            } flex-col items-center`}
          >
            {menuContents()}
          </motion.aside>

          {/* MOBILE BACKDROP */}
          <motion.section
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className={`bg-[#0C111D80] w-full h-screen lg:!hidden
              top-0 left-0 bottom-0 right-0 fixed justify-center items-center
              ${openSidebar ? "flex" : "hidden"}
            `}
            onClick={() => setOpenSidebar(false)}
            transition={{ duration: 0.2 }}
            exit={{ opacity: 0, transition: { delay: 0.2 } }}
          />
        </div>
      </nav>

      <FundWalletModal
        isOpen={openModal == "fundWallet"}
        onClose={() => handleModal("")}
        userEmail={user?.email || ""}
      />
      <LoginModal
        isOpen={openModal == "login"}
        onClose={() => handleModal("")}
        handleResetPassword={() => handleModal("reset")}
      />
      <SignUpModal
        isOpen={openModal == "signup"}
        onClose={() => handleModal("")}
      />
      <PasswordResetModal
        isOpen={openModal == "reset"}
        onClose={() => handleModal("")}
      />
    </>
  );
};

export interface NavLinkProps {
  id: number;
  label: string;
  path: string;
  slug: string;
  showFor: string[];
}
