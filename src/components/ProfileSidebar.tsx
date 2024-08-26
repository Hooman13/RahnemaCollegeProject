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
  faList,
} from "@fortawesome/free-solid-svg-icons";
import axios from "../api/axios";

export const ProfileSidebar: FunctionComponent = () => {
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
    <div className="h-full w-auto col-span-2 bg-white border border-white rounded-t-[45px] justify-items-center	">
      <div>
        <div className="w-[296px] 2xl:w-[350px] items-center flex h-auto m-6 py-4 px-8 ">
          <img
            className="border rounded-full w-12 2xl:w-14 h-12 2xl:h-14"
            src={user.data.imageUrl}
            alt=""
          />
          <span className="px-4 py-3">{user.data.username}</span>
        </div>
        <Link to="/profile">
          <div className="w-auto text-base 2xl:text-xl font-normal items-center py-4 flex h-auto pr-9 px-8 hover:bg-[#F5F5F5] border-none rounded-[75px] text-center">
            <FontAwesomeIcon className="ml-4" icon={faThumbTack} />
            صفحه من
          </div>
        </Link>
        <Link to="/saved">
          <div className="w-auto text-base 2xl:text-xl font-normal items-center py-4 flex h-auto pr-9 px-8 hover:bg-[#F5F5F5] border-none rounded-[75px] text-center">
            <FontAwesomeIcon className="ml-4" icon={faBookmark} />
            ذخیره‌ها
          </div>
        </Link>
        <Link to="/messages">
          <div className="w-auto text-base 2xl:text-xl font-normal items-center py-4 flex h-auto pr-9 px-8 hover:bg-[#F5F5F5] border-none rounded-[75px] text-center">
            <FontAwesomeIcon className="ml-4" icon={faCommentDots} />
            پیام‌ها
          </div>
        </Link>
        <Link to="/notifs">
          <div className="w-auto text-base 2xl:text-xl font-normal items-center py-4 flex h-auto pr-9 px-8 hover:bg-[#F5F5F5] border-none rounded-[75px] text-center">
            <FontAwesomeIcon className="ml-4" icon={faBell} />
            اعلانات
          </div>
        </Link>
        <Link to="/tags">
          <div className="w-auto text-base 2xl:text-xl font-normal items-center py-4 flex h-auto pr-9 px-8 hover:bg-[#F5F5F5] border-none rounded-[75px] text-center">
            <FontAwesomeIcon className="ml-4" icon={faTag} />
            تگ‌شده‌ها
          </div>
        </Link>
      </div>
      <div className="border-t-2 m-6"></div>
      <Link to="/explore">
        <div className="w-auto text-base 2xl:text-xl font-normal items-center py-4 flex h-auto pr-9 px-8 hover:bg-[#F5F5F5] border-none rounded-[75px] text-center">
          <FontAwesomeIcon className="ml-4" icon={faGripVertical} />
          اکسپلور
        </div>
      </Link>
      <Link to="/search">
        <div className="w-auto text-base 2xl:text-xl font-normal items-center py-4 flex h-auto pr-9 px-8 hover:bg-[#F5F5F5] border-none rounded-[75px] text-center">
          <FontAwesomeIcon className="ml-4" icon={faMagnifyingGlass} />
          جستجو
        </div>
      </Link>
      <Link to="/search">
        <div className="w-auto text-base 2xl:text-xl font-normal mt-[240px] flex py-4 h-auto pr-9 px-8 hover:bg-[#F5F5F5] border-none rounded-[75px] text-center">
          <FontAwesomeIcon className="ml-4" icon={faList} />
          بیشتر
        </div>
      </Link>
    </div>
  );
};
