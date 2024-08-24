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
    <div className="h-full w-auto col-span-3 bg-white border border-white rounded-t-[45px] justify-items-center	">
      <div>
        <div className="w-[296px] items-center flex h-20 m-6 py-4 px-8 ">
          <img
            className="border rounded-full w-12 h-12"
            src="../img/person.png"
            alt=""
          />
          <span className="px-4 py-3">{user.data.username}</span>
        </div>
        <div className="w-auto items-center py-4 flex h-14 pr-9 px-8 hover:bg-[#F2F2F7] border-none rounded-[75px] text-center">
          <Link to="/profile">
            <FontAwesomeIcon className="ml-4" icon={faThumbTack} />
            صفحه من
          </Link>
        </div>
        <div className="w-auto items-center py-4 flex h-14 pr-9 px-8 hover:bg-[#F2F2F7] border-none rounded-[75px] text-center">
          <Link to="/saved">
            <FontAwesomeIcon className="ml-4" icon={faBookmark} />
            ذخیره‌ها
          </Link>
        </div>
        <div className="w-auto items-center py-4 flex h-14 pr-9 px-8 hover:bg-[#F2F2F7] border-none rounded-[75px] text-center">
          <Link to="/messages">
            <FontAwesomeIcon className="ml-4" icon={faCommentDots} />
            پیام‌ها
          </Link>
        </div>
        <div className="w-auto items-center py-4 flex h-14 pr-9 px-8 hover:bg-[#F2F2F7] border-none rounded-[75px] text-center">
          <Link to="/notifs">
            <FontAwesomeIcon className="ml-4" icon={faBell} />
            اعلانات
          </Link>
        </div>
        <div className="w-auto items-center py-4 flex h-14 pr-9 px-8 hover:bg-[#F2F2F7] border-none rounded-[75px] text-center">
          <Link to="/tags">
            <FontAwesomeIcon className="ml-4" icon={faTag} />
            تگ‌شده‌ها
          </Link>
        </div>
      </div>
      <div className="border-t-2 m-6"></div>
      <div className="w-auto items-center py-4 flex h-14 pr-9 px-8 hover:bg-[#F2F2F7] border-none rounded-[75px] text-center">
        <Link to="/explore">
          <FontAwesomeIcon className="ml-4" icon={faGripVertical} />
          اکسپلور
        </Link>
      </div>
      <div className="w-auto items-center py-4 flex h-14 pr-9 px-8 hover:bg-[#F2F2F7] border-none rounded-[75px] text-center">
        <Link to="/search">
          <FontAwesomeIcon className="ml-4" icon={faMagnifyingGlass} />
          جستجو
        </Link>
      </div>
    </div>
  );
};
