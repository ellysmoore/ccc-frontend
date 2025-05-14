import React, { ChangeEvent, useState } from "react";
import { useRouter } from "next/navigation";
import { FaArrowLeft, FaCaretDown } from "react-icons/fa";
import { LoginModal } from "../LoginModal";
import { SignUpModal } from "../SignUpModal";

const Sidebar = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [openModal, setOpenModal] = useState("");
  const router = useRouter();

  const toggleCollapse = () => {
    setIsCollapsed(!isCollapsed);
  };

  const handleModal = (path: string) => {
    setOpenModal(path);
  };

  const handleSearch = (e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    const query = e.target.value;
    router.push(`/search?q=${query}`);
  };

  return (
    <>
      <nav
        id="sidebar"
        className="fixed inset-0 bg-gray-900 bg-opacity-75 z-50"
      >
        <div
          id="dismiss"
          className="p-4 cursor-pointer"
          onClick={() => setIsCollapsed(false)}
        >
          <FaArrowLeft className="text-white" size={24} />
        </div>

        <div className="mx-3 mt-10 text-white">
          <ul className="list-none">
            <li>
              <input
                className="input-group mx-auto form-control bg-gray-800 text-white rounded-full p-2"
                type="search"
                placeholder="Search eLibrary"
                onChange={handleSearch}
                name="q"
                style={{ height: "50px" }}
                size={60}
              />
            </li>

            <li className="mt-4">
              <a href="#" className="text-white hover:text-gray-400">
                Home
              </a>
            </li>

            <li className="mt-4">
              <button
                onClick={toggleCollapse}
                className="flex items-center text-white hover:text-gray-400 w-full"
              >
                <span>Categories</span>
                <FaCaretDown
                  className={`ml-2 transform ${
                    isCollapsed ? "rotate-180" : ""
                  }`}
                />
              </button>

              <ul className={`ml-4 mt-2 ${isCollapsed ? "block" : "hidden"}`}>
                <li>
                  <a href="#" className="text-white hover:text-gray-400">
                    Singles Summit
                  </a>
                </li>
                <li>
                  <a href="#" className="text-white hover:text-gray-400">
                    Sunday Service
                  </a>
                </li>
                <li>
                  <a href="#" className="text-white hover:text-gray-400">
                    Word Feast
                  </a>
                </li>
              </ul>
            </li>
            <li className="mt-4">
              <a href="#" className="text-white hover:text-gray-400">
                Latest Sermons
              </a>
            </li>
            <li className="mt-4">
              <button
                onClick={() => handleModal("login")}
                className="cursor-pointer text-white hover:text-gray-400"
              >
                Login
              </button>
            </li>
            <li className="mt-4">
              <button
                onClick={() => handleModal("signup")}
                className="cursor-pointer text-white hover:text-gray-400"
              >
                Signup
              </button>
            </li>
            <li className="mt-4">
              <a href="#" className="text-white hover:text-gray-400">
                Help
              </a>
            </li>
            <li className="mt-4">
              <a
                href="https://www.insightsforliving.org/contact/"
                className="text-white hover:text-gray-400"
                target="_blank"
                rel="noreferrer"
              >
                Contact
              </a>
            </li>
            <li className="mt-4">
              <a
                href="https://www.insightsforliving.org/overview/"
                className="text-white hover:text-gray-400"
                target="_blank"
                rel="noreferrer"
              >
                About C3
              </a>
            </li>
          </ul>
        </div>
      </nav>

      <LoginModal
        isOpen={openModal == "login"}
        onClose={() => handleModal("")}
        handleResetPassword={() => {}}
      />
      <SignUpModal
        isOpen={openModal == "signup"}
        onClose={() => handleModal("")}
      />
    </>
  );
};

export default Sidebar;
