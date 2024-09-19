import { FunctionComponent } from "react";
import Cookies from "js-cookie";
import { Link, useNavigate } from "react-router-dom";
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
  faArrowRightFromBracket,
} from "@fortawesome/free-solid-svg-icons";
import { UserInfoApi } from "../api/axios";
import { useQuery } from "@tanstack/react-query";
import { MoreButton } from "./buttons/MoreButton";

export const ProfileSidebar: FunctionComponent = () => {
  const token = Cookies.get("token");
  const userName = Cookies.get("username");

  const navigate = useNavigate();
  const logout = () => {
    Cookies.remove("token");
    Cookies.remove("username");
    navigate("/login");
  };
  const getProfileData = () => {
    return UserInfoApi.get(userName ?? "", {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    }).then((res) => res.data);
  };

  const { data, isLoading, isError, error } = useQuery({
    queryKey: [userName, "userInfo"],
    queryFn: getProfileData,
  });

  return (
    <div className="text-sm rounded-t-[30px] w-full h-full relative">
      <div className="border border-[#A5A5A5] w-full sticky top-24 bg-white rounded-t-2xl min-h-[90vh]">
        <div>
          <div className="items-center flex h-auto mt-3 mr-6 py-2 ">
            <img
              className="border rounded-full w-10 2xl:w-14 h-10 2xl:h-14 mt-3"
              src={
                data?.imageUrl
                  ? process.env.REACT_APP_IMAGE_URL + data?.imageUrl
                  : "../img/person.png"
              }
              alt=""
            />
            <span className="px-4">{data?.username}</span>
          </div>
          <Link to="/profile">
            <div className="w-auto  2xl:text-xl font-normal items-center py-3 flex h-auto pr-9 hover:bg-[#F5F5F5] border-none rounded-[75px] text-center">
              <FontAwesomeIcon className="ml-4" icon={faThumbTack} />
              صفحه من
            </div>
          </Link>
          <Link to="/saved">
            <div className="w-auto 2xl:text-xl font-normal items-center py-3 flex h-auto pr-9 hover:bg-[#F5F5F5] border-none rounded-[75px] text-center">
              <FontAwesomeIcon className="ml-4" icon={faBookmark} />
              ذخیره‌ها
            </div>
          </Link>
          <Link to="/messages">
            <div className="w-auto 2xl:text-xl font-normal items-center py-3 flex h-auto pr-9 hover:bg-[#F5F5F5] border-none rounded-[75px] text-center">
              <FontAwesomeIcon className="ml-4" icon={faCommentDots} />
              پیام‌ها
              <div className="flex justify-center justify-items-center mr-14 w-6 h-6 border border-[#F6881F] rounded-full bg-[#F6881F] text-base">
                <p>{data?.messagesCount}</p>
              </div>
            </div>
          </Link>
          <Link to="/notifs">
            <div className="w-auto 2xl:text-xl font-normal items-center py-3 flex h-auto pr-9 hover:bg-[#F5F5F5] border-none rounded-[75px] text-center">
              <FontAwesomeIcon className="ml-4" icon={faBell} />
              اعلانات
              <div className="flex justify-center justify-items-center mr-14 w-6 h-6 border border-[#F6881F] rounded-full bg-[#F6881F] text-base">
                <p>{data?.notifsCount}</p>
              </div>
            </div>
          </Link>
          <Link to="/tags">
            <div className="w-auto 2xl:text-xl font-normal items-center py-3 flex h-auto pr-9 hover:bg-[#F5F5F5] border-none rounded-[75px] text-center">
              <FontAwesomeIcon className="ml-4" icon={faTag} />
              تگ‌شده‌ها
            </div>
          </Link>
        </div>
        <div className="border-t-2 m-2"></div>
        <Link to="/explore">
          <div className="w-auto 2xl:text-xl font-normal items-center py-3 flex h-auto pr-9  hover:bg-[#F5F5F5] border-none rounded-[75px] text-center">
            <FontAwesomeIcon className="ml-4" icon={faGripVertical} />
            اکسپلور
          </div>
        </Link>
        <Link to="/search-people">
          <div className="w-auto 2xl:text-xl font-normal items-center py-3 flex h-auto pr-9 hover:bg-[#F5F5F5] border-none rounded-[75px] text-center">
            <FontAwesomeIcon className="ml-4" icon={faMagnifyingGlass} />
            جستجو
          </div>
        </Link>
        <div className="w-auto 2xl:text-xl font-normal items-center py-3 flex h-auto pr-9 hover:bg-[#F5F5F5] border-none rounded-[75px] text-center">
          <button
            onClick={() => {
              logout();
            }}
          >
            <div>
              <FontAwesomeIcon
                className="ml-4"
                icon={faArrowRightFromBracket}
              />
              خروج
            </div>
          </button>
        </div>
        <div>{userName ? <MoreButton user={userName} /> : null}</div>
      </div>
    </div>
  );
};
