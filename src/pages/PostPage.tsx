import styles from "./Profile.module.css";
import { MyPage } from "../components/MyPage";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCirclePlus } from "@fortawesome/free-solid-svg-icons";
import { ProfileSidebar } from "../components/ProfileSidebar";
import { useState } from "react";
import { useEffect } from "react";
import Cookies from "js-cookie";
import axios from "../api/axios";
import { boolean } from "zod";
import { Link } from "react-router-dom";

export const PostPage = () => {
  // console.log(user.data.username);
  // console.log(user.data.email);
  // console.log(user);
  const [user, setUser] = useState({
    data: {
      username: "",
    },
  });

  const [isUserUpdated, setIsUserUpdated] = useState(false);
  const token = Cookies.get("token");
  const getPostData = async () => {
    try {
      const data: any = await axios.get("http://37.32.5.72:3000/user-info", {
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
    getPostData();
  }, [token, isUserUpdated]);

  return (
    <>
      <div className="w-screen h-full pt-16 px-16 bg-[#F5F5F5]">
        {/* header */}
        <div className="grid grid-cols-12 mb-4">
          <div className="grid col-span-3 py-4 justify-items-center	">
            <Link to="/createpost">
              <button
                type="submit"
                // onClick={getProfileData}
                className="w-[232px] py-4 px-2 bg-[#EA5A69] rounded-3xl text-white"
              >
                <FontAwesomeIcon className="ml-2" icon={faCirclePlus} />
                ایجاد پست جدید
              </button>
            </Link>
          </div>
          <div className=" col-span-9 flex justify-end">
            <img src="../img/logo.png" alt="" />
          </div>
        </div>
        {/* main */}
        <div className="grid grid-cols-12">
          {/* sideBar */}
          <ProfileSidebar />
          <div className="mr-16 grid col-span-9">
            <div className="text-black  border-[#CAC4D0] pb-6">
              <div className="flex justify-between">
                <div className="flex items-center">
                  <img
                    className="border rounded-full ml-8 w-[132px] h-[132px]"
                    src="../img/avatar.png"
                    alt=""
                  />
                  <div className="grid grid-rows-4 h-[132px]">
                    <div className="user-display-name text-sm text-[#C19008]">
                      {/* {user.data.username} */}
                    </div>
                  </div>
                </div>
                <div></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
