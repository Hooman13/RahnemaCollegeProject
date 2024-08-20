import styles from "./MyPage.module.css";
import { Link, useParams } from "react-router-dom";
import { useState } from "react";
import { useEffect } from "react";
import Cookies from "js-cookie";
import axios from "../api/axios";
import { PostsList } from "./PostList";

export const MyPage = () => {
  interface IUser {
    bio: string;
    email: string;
    fName: string;
    imageUrl: string;
    isPrivate: boolean;
    lName: string;
    username: string;
    followers: number;
    postCount: number;
    following: number;
  }
  const [user, setUser] = useState<IUser>({
    bio: "",
    email: "",
    fName: "",
    imageUrl: "",
    isPrivate: false,
    lName: "",
    username: "",
    followers: 0,
    following: 0,
    postCount: 0,
  });
  const { username } = useParams();

  const userInfoEndpoint = username ? `${username}` : `user-info/`;

  const [isMyProfile, setIsMyProfile] = useState(false);
  const token = Cookies.get("token");
  const getProfileData = async () => {
    try {
      const data: any = await axios
        .get(`http://37.32.5.72:3000/${userInfoEndpoint}`, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        })
        .then((res) => {
          const userData = res.data;
          setUser((prevState) => ({
            ...prevState,
            ...userData,
          }));
        });
    } catch (error) {
      console.log({ error });
    }
  };

  const checkMyProfile = () => {
    if (username === undefined || username === user.username) {
      setIsMyProfile(true);
    } else {
      setIsMyProfile(false);
    }
  };

  useEffect(() => {
    getProfileData();
  }, []);
  useEffect(() => {
    checkMyProfile();
  }, [user]);

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
                <span className="user-display-name text-sm text-[#C19008]">
                  {user.username}
                </span>
                {!isMyProfile && (
                <Link to="/editpage">
                  <button
                    type="button"
                    className="w-sm py-4 px-2 bg-[#EA5A69] rounded-[100px] text-white"
                  >
                    دنبال کردن
                  </button>
                </Link>
              )}
                <div className="user-full-name text-xl">
                  {" "}
                  {user.fName} {user.lName}
                </div>
                <div className="text-sm flex  ">
                  <div className="user-followers-details pl-2 text-[#C19008]">
                    {user?.followers}
                    <span className="mx-1">دنبال کننده</span>
                  </div>
                  |
                  <div className="user-followers-details px-2 text-[#C19008]">
                    {user?.following}
                    <span className="mx-1">دنبال شونده</span>
                  </div>
                  |
                  <div className="user-followers-details pr-2">
                    {user?.postCount}
                    <span className="mx-1">پست</span>
                  </div>
                </div>
                <div className="user-followers-details w-[377px]">
                  {user.bio}
                </div>
              </div>
            </div>
            <div className="flex items-center justify-items-end	">
              {isMyProfile && (
                <Link to="/editpage">
                  <button
                    type="button"
                    className="w-[197px] py-4 px-2 bg-[#EA5A69] rounded-3xl text-white "
                  >
                    ویرایش پروفایل
                  </button>
                </Link>
              )}
            </div>
          </div>
        </div>
        {/* posts place */}
        <div className="flex justify-center mt-6 bg-inherit h-full border rounded-t-[45px]">
          <div className="">
            {/* <div>هنوز هیچ پستی توی صفحه‌ات نذاشتی! بجنب تا دیر نشده</div> */}
            <div>
              <PostsList />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
