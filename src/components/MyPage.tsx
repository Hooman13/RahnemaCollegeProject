import styles from "./MyPage.module.css";
import { Link } from "react-router-dom";
import { useState } from "react";
import { useEffect } from "react";
import Cookies from "js-cookie";
import axios from "../api/axios";
import { boolean } from "zod";

export const MyPage = () => {
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
  return (
    <>
      <div>
        {/* profile informations */}
        <div className="text-black border-b-2 border-[#CAC4D0] pb-6">
          <h1 className="mb-8 text-xl">صفحه من</h1>
          <div className="flex justify-between">
            <div className="flex items-center">
              <img
                className="border rounded-full ml-8 w-[132px] h-[132px]"
                src="./img/avatar.png"
                alt=""
              />
              <div className="grid grid-rows-4 h-[132px]">
                <div className="user-display-name text-sm text-[#C19008]">
                  {user.data.username}
                </div>
                <div className="user-full-name text-xl">
                  {" "}
                  {user.data.fName} {user.data.lName}
                </div>
                <div className="text-sm flex  ">
                  <div className="user-followers-details pl-2 text-[#C19008]">
                    13 دنبال کننده
                  </div>
                  |
                  <div className="user-followers-details px-2 text-[#C19008]">
                    13 دنبال شونده
                  </div>
                  |<div className="user-followers-details pr-2">13 پست</div>
                </div>
                <div className="user-followers-details w-[377px]">
                  {user.data.bio}
                </div>
              </div>
            </div>
            <div className="flex items-center justify-items-end	">
              <Link to="/editpage">
                <button
                  type="button"
                  className="w-[197px] py-4 px-2 bg-[#EA5A69] rounded-3xl text-white "
                >
                  ویرایش پروفایل
                </button>
              </Link>
            </div>
          </div>
        </div>
        {/* posts place */}
        <div className="flex justify-center mt-6 bg-inherit h-full border rounded-t-[45px]">
          <div className="">
            <div>هنوز هیچ پستی توی صفحه‌ات نذاشتی! بجنب تا دیر نشده</div>
            <div></div>
          </div>
        </div>
      </div>
    </>
  );
};
