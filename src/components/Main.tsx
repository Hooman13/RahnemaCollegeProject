import { Link } from "react-router-dom";
import { ProfileSidebar2 } from "./ProfileSidebar2";
import { MyPage } from "./MyPage";
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCirclePlus } from "@fortawesome/free-solid-svg-icons";
import { CreatePost } from "../pages/CreatePost";

export const Main = () => {

  const [openModal, setOpenModal] = useState(false);

  return (
    <div className="bg-[#F5F5F5] pt-11">
      <nav className="fixed top-11  px-16  z-50 w-full">
        <div className="px-3 py-3 lg:px-5 lg:pl-3">
          <div className="flex items-center justify-between">
            {/* Add Post */}
            <div className="flex items-center">
              <div className="flex items-center ms-3">
                <div>
                  <button
                    onClick={() => {
                      setOpenModal(true);
                    }}
                    className="w-fit py-2 px-2 text-base bg-[#EA5A69] rounded-3xl text-white"
                  >
                    <FontAwesomeIcon className="ml-2" icon={faCirclePlus} />
                    ایجاد پست جدید
                  </button>
                </div>
              </div>
            </div>
            {/* Logo */}
            <div className="flex items-center justify-start rtl:justify-end">
              <button
                data-drawer-target="logo-sidebar"
                data-drawer-toggle="logo-sidebar"
                aria-controls="logo-sidebar"
                type="button"
                className="inline-flex items-center p-2 text-sm text-gray-500 rounded-lg sm:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
              >
                <span className="sr-only">Open sidebar</span>
                <svg
                  className="w-6 h-6"
                  aria-hidden="true"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    clip-rule="evenodd"
                    fill-rule="evenodd"
                    d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z"
                  ></path>
                </svg>
              </button>
              <Link to="/" className="flex ms-2 md:me-24">
                <img
                  src="./img/logo.png"
                  className="h-8 me-3"
                  alt="FlowBite Logo"
                />
                <span className="self-center text-xl font-semibold sm:text-2xl whitespace-nowrap dark:text-white">
                  Colleggram
                </span>
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* main */}
      <div className="p-4 sm:mr-80 ml-16 h-screen">
        <div className="p-4  mt-14">
          <div className="mr-16 grid col-span-9 overflow-y-scroll">
            <MyPage />
          </div>
        </div>
      </div>

      {/* sidebar */}
      <ProfileSidebar2 />

      <CreatePost openModal={openModal} setOpenModal={setOpenModal} />

    </div>
  );
};
