import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import Cookies from "js-cookie";
import { Link } from "react-router-dom";
import styles from "./Profile.module.css";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faThumbTack,
  faBookmark,
  faCommentDots,
  faBell,
  faTag,
  faMagnifyingGlass,
  faGripVertical,
  faCirclePlus,
  faCamera,
} from "@fortawesome/free-solid-svg-icons";
import { MyPage } from "../components/MyPage";
import axios from "../api/axios";
import { boolean, string } from "zod";

export const Profile = () => {
  const [user, setUser] = useState({
    data: {
      bio: "",
      email: "",
      fName: "",
      imageUrl: "",
      isPrivate: boolean,
      lName: "",
      username: "",
    },
  });
  const [isUserUpdated, setIsUserUpdated] = useState(false);
  const token = Cookies.get("token");
  const getProfileData = async () => {
    try {
      const data: any = await axios.get(
        "http://37.32.5.72:3000/auth/user-info",
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
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
  // console.log(user.data.username);
  // console.log(user.data.email);
  // console.log(user);
  return (
    <>
      <div className="w-screen h-full pt-16 px-16 bg-[#F5F5F5]">
        {/* header */}
        <div className="grid grid-cols-12 mb-4">
          <div className="grid col-span-3 py-4 justify-items-center	">
            <button
              type="submit"
              // onClick={getProfileData}
              className="w-[232px] py-4 px-2 bg-[#EA5A69] rounded-3xl text-white"
            >
              <FontAwesomeIcon className="ml-2" icon={faCirclePlus} />
              ایجاد پست جدید
            </button>
          </div>
          <div className=" col-span-9 flex justify-end">
            <img src="./img/logo.png" alt="" />
          </div>
        </div>
        {/* main */}
        <div className="grid grid-cols-12">
          {/* sideBar */}
          <div className="h-full w-auto col-span-3 bg-white border border-white rounded-t-[45px] justify-items-center	">
            <div>
              <div className="w-[296px] items-center flex h-20 m-6 py-4 px-8 ">
                <img
                  className="border rounded-full w-12 h-12"
                  src="./img/avatar.png"
                  alt=""
                />
                <span className="px-4 py-3">{user.data.username}</span>
              </div>
              <div className="w-auto items-center py-4 flex h-14 pr-9 px-8 hover:bg-[#F2F2F7] border-none rounded-2xl text-center">
                <Link to="/editpage">
                  <FontAwesomeIcon className="ml-4" icon={faThumbTack} />
                  صفحه من
                </Link>
              </div>
              <div className="w-auto items-center py-4 flex h-14 pr-9 px-8 hover:bg-[#F2F2F7] border-none rounded-2xl text-center">
                <Link to="/editpage">
                  <FontAwesomeIcon className="ml-4" icon={faBookmark} />
                  ذخیره‌ها
                </Link>
              </div>
              <div className="w-auto items-center py-4 flex h-14 pr-9 px-8 hover:bg-[#F2F2F7] border-none rounded-2xl text-center">
                <Link to="/editpage">
                  <FontAwesomeIcon className="ml-4" icon={faCommentDots} />
                  پیام‌ها
                </Link>
              </div>
              <div className="w-auto items-center py-4 flex h-14 pr-9 px-8 hover:bg-[#F2F2F7] border-none rounded-2xl text-center">
                <Link to="/editpage">
                  <FontAwesomeIcon className="ml-4" icon={faBell} />
                  اعلانات
                </Link>
              </div>
              <div className="w-auto items-center py-4 flex h-14 pr-9 px-8 hover:bg-[#F2F2F7] border-none rounded-2xl text-center">
                <Link to="/editpage">
                  <FontAwesomeIcon className="ml-4" icon={faTag} />
                  تگ‌شده‌ها
                </Link>
              </div>
            </div>
            <div className="border-t-2 m-6"></div>
            <div className="w-auto items-center py-4 flex h-14 pr-9 px-8 hover:bg-[#F2F2F7] border-none rounded-2xl text-center">
              <Link to="/editpage">
                <FontAwesomeIcon className="ml-4" icon={faGripVertical} />
                اکسپلور
              </Link>
            </div>
            <div className="w-auto items-center py-4 flex h-14 pr-9 px-8 hover:bg-[#F2F2F7] border-none rounded-2xl text-center">
              <Link to="/editpage">
                <FontAwesomeIcon className="ml-4" icon={faMagnifyingGlass} />
                جستجو
              </Link>
            </div>
          </div>
          <div className="mr-16 grid col-span-9">
            <MyPage />
          </div>
        </div>
      </div>
    </>
  );
};
