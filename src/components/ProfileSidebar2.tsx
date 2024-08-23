import { FunctionComponent, PropsWithChildren } from "react";
import React, { useState, useEffect } from "react";
import Cookies from "js-cookie";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faThumbTack,
  faBookmark,
  faCommentDots,
  faBell,
  faTag,
  faMagnifyingGlass,
  faGripVertical,
} from "@fortawesome/free-solid-svg-icons";
import axios from "../api/axios";

export const ProfileSidebar2: FunctionComponent = () => {
  const [user, setUser] = useState({
    data: {
      bio: "",
      email: "",
      fName: "",
      imageUrl: "",
      isPrivate: false,
      lName: "",
      username: "",
    },
  });
  const [isUserUpdated, setIsUserUpdated] = useState(false);
  const token = Cookies.get("token");
  const userName = Cookies.get("username");
  const getProfileData = async () => {
    try {
      const data: any = await axios.get("http://37.32.5.72:3000/" + userName, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      setUser(data);
      setIsUserUpdated(false);
    } catch (error) {
      console.log({ error });
    }
  };
  //
  useEffect(() => {
    getProfileData();
  }, [token, isUserUpdated]);
  return (
    <aside
      id="logo-sidebar"
      className="fixed top-28 right-16 z-40 w-64 h-screen rounded-3xl transition-transform -translate-x-full bg-white border border-[#CAC4D0
] sm:translate-x-0 dark:bg-gray-800 dark:border-gray-700"
      aria-label="Sidebar"
    >
      <div className="h-full py-6 overflow-y-auto  dark:bg-gray-800">
      <div className="items-center flex py-4 px-8 ">
          <img
            className="border rounded-full w-12 h-12"
            src="../img/person.png"
            alt=""
          />
          <span className="px-4 py-3">{user.data.username}</span>
        </div>
        <ul className="space-y-2 font-medium">
          <li>
            <Link
              to="/profile"
              className="flex items-center py-4 px-8 text-sm text-gray-900 rounded-3xl dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
            >
              <FontAwesomeIcon
                className="w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"
                icon={faThumbTack}
              />
              <span className="ms-3">صفحه من</span>
            </Link>
          </li>

          <li>
            <Link
              to="/saved"
              className="flex items-center py-4 px-8 text-sm  text-gray-900 rounded-3xl dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
            >
              <FontAwesomeIcon
                className="w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"
                icon={faBookmark}
              />
              <span className="ms-3">ذخیره‌ها</span>
            </Link>
          </li>
          <li>
            <Link
              to="/messages"
              className="flex items-center py-4 px-8 text-sm  text-gray-900 rounded-3xl dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
            >
              <FontAwesomeIcon
                className="w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"
                icon={faCommentDots}
              />
              <span className="ms-3">پیام ها</span>
            </Link>
          </li>
          <li>
            <Link
              to="/notifs"
              className="flex items-center py-4 px-8 text-sm  text-gray-900 rounded-3xl dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
            >
              <FontAwesomeIcon
                className="w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"
                icon={faBell}
              />
              <span className="ms-3">اعلانات</span>
            </Link>
          </li>
          <li>
            <Link
              to="/tags"
              className="flex items-center py-4 px-8 text-sm  text-gray-900 rounded-3xl dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
            >
              <FontAwesomeIcon
                className="w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"
                icon={faTag}
              />
              <span className="ms-3">تگ‌شده‌ها</span>
            </Link>
          </li>
      <div className="border-t-2 m-6"></div>

          <li>
            <Link
              to="/explore"
              className="flex items-center py-4 px-8 text-sm  text-gray-900 rounded-3xl dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
            >
              <FontAwesomeIcon
                className="w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"
                icon={faGripVertical}
              />
              <span className="ms-3">اکسپلور</span>
            </Link>
          </li>
          <li>
            <Link
              to="/search"
              className="flex items-center py-4 px-8 text-sm  text-gray-900 rounded-3xl dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
            >
              <FontAwesomeIcon
                className="w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"
                icon={faMagnifyingGlass}
              />
              <span className="ms-3">جستجو</span>
            </Link>
          </li>
        </ul>
      </div>
    </aside>
  );
};
