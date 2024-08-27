import styles from "./MyPage.module.css";
import { Link, useParams } from "react-router-dom";
import { useState } from "react";
import { useEffect } from "react";
import Cookies from "js-cookie";
import {UserInfoApi} from "../api/axios";
import { PostsList } from "./PostList";
import { Follow } from "./Follow";
import { UnFollow } from "./UnFollow";
import { FollowersList } from "../pages/FollowersList";
import { FollowingsList } from "../pages/FollowingsList";
import { EditProfile } from "../pages/EditProfile";

export const MyPage = () => {
  interface IUser {
    bio: string;
    email: string;
    fName: string;
    imageUrl: string;
    isPrivate: boolean;
    lName: string;
    username: string;
    followersCount: number;
    postCount: number;
    followingsCount: number;
  }
  const [user, setUser] = useState<IUser>({
    bio: "",
    email: "",
    fName: "",
    imageUrl: "",
    isPrivate: false,
    lName: "",
    username: "",
    followersCount: 0,
    followingsCount: 0,
    postCount: 0,
  });
  const { username } = useParams();
  const [openFollowingsModal, setOpenFollowingsModal] = useState(false);
  const [openFollowersModal, setOpenFollowersModal] = useState(false);
  const [openEditProfilModal, setOpenEditProfilModal] = useState(false);
  const cookieUsername = Cookies.get("username");

  const profileUsername = username ? `${username}` : cookieUsername;

  const [isMyProfile, setIsMyProfile] = useState(false);
  const token = Cookies.get("token");

  const getProfileData = async () => {
    try {
      const data: any = await UserInfoApi.get(`${profileUsername}`, {
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
    if (cookieUsername === user.username) {
      // (username === undefined || username === user.username)
      setIsMyProfile(true);
    } else {
      setIsMyProfile(false);
    }
  };

  useEffect(() => {
    getProfileData();
  }, [profileUsername]);
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
                className="border rounded-full w-[132px] h-[132px]"
                src="../img/person.png"
                alt=""
              />
              <div className="grid grid-rows-4 h-[132px] mr-4">
                <span className="user-display-name text-sm text-[#C19008]">
                  {user.username}
                </span>
                <div className="flex">
                  <div className="user-full-name text-xl ml-4">
                    {user.fName} {user.lName}
                  </div>
                  <div className="ml-4">
                    {!isMyProfile && <Follow user={user.username} />}
                  </div>
                  <div>{!isMyProfile && <UnFollow user={user.username} />}</div>
                </div>
                <div className="text-sm flex mt-2 ">
                  <div className="user-followers-details pl-2 text-[#C19008]">
                    {user?.followersCount}
                    <button
                      onClick={() => {
                        setOpenFollowersModal(true);
                      }}
                    >
                      <span className="mx-1">دنبال کننده</span>
                    </button>
                  </div>
                  |
                  <div className="user-followers-details px-2 text-[#C19008]">
                    {user?.followingsCount}
                    <button
                      onClick={() => {
                        setOpenFollowingsModal(true);
                      }}
                    >
                      <span className="mx-1">دنبال شونده</span>
                    </button>
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
                <button
                  type="button"
                  className="w-[197px] py-4 px-2 bg-[#EA5A69] rounded-3xl text-white "
                  onClick={() => {
                    setOpenEditProfilModal(true);
                  }}
                >
                  ویرایش پروفایل
                </button>
              )}
            </div>
          </div>
        </div>
        {/* posts place */}
        <div className="mt-6 bg-inherit h-full border rounded-t-[45px]">
          <PostsList username={profileUsername} />
        </div>
      </div>
      <FollowersList
        openModal={openFollowersModal}
        setOpenModal={setOpenFollowersModal}
      />
      <FollowingsList
        openModal={openFollowingsModal}
        setOpenModal={setOpenFollowingsModal}
      />
      <EditProfile
        openModal={openEditProfilModal}
        setOpenModal={setOpenEditProfilModal}
      />
    </>
  );
};
