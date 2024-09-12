import styles from "./MyPage.module.css";
import { Link, useParams } from "react-router-dom";
import { useState } from "react";
import { useEffect } from "react";
import Cookies from "js-cookie";
import { UserInfoApi } from "../api/axios";
import { PostsList } from "./PostList";
import { Follow } from "./Follow";
import { UnFollow } from "./UnFollow";
import { FollowersList } from "../pages/FollowersList";
import { FollowingsList } from "../pages/FollowingsList";
import { EditProfile } from "../pages/EditProfile";
import { DeleteFollowReq } from "./DeleteFollowReq";
import { CloseFriendB } from "./CloseFriendB";
import { useQuery } from "@tanstack/react-query";
import { MyPageSkeleton } from "./MyPageSkeleton";
import { useQueryClient } from "@tanstack/react-query";
import { useMutation } from "@tanstack/react-query";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faEllipsisVertical } from "@fortawesome/free-solid-svg-icons";
import { RelationButton } from "./RelationButton";

export const MyPage = () => {
  // interface IUser {
  //   bio: string;
  //   email: string;
  //   fName: string;
  //   imageUrl: string;
  //   isPrivate: boolean;
  //   lName: string;
  //   username: string;
  //   followersCount: number;
  //   postCount: number;
  //   followingsCount: number;
  // }
  // const [user, setUser] = useState<IUser>({
  //   bio: "",
  //   email: "",
  //   fName: "",
  //   imageUrl: "",
  //   isPrivate: false,
  //   lName: "",
  //   username: "",
  //   followersCount: 0,
  //   followingsCount: 0,
  //   postCount: 0,
  // });
  const { username } = useParams();
  const [openFollowingsModal, setOpenFollowingsModal] = useState(false);
  const [openFollowersModal, setOpenFollowersModal] = useState(false);
  const [openEditProfilModal, setOpenEditProfilModal] = useState(false);
  const cookieUsername = Cookies.get("username");

  const profileUsername = username ? `${username}` : cookieUsername;

  const [isMyProfile, setIsMyProfile] = useState(false);
  const token = Cookies.get("token");
  const queryClient = useQueryClient();

  // const getProfileData = async () => {
  //   try {
  //     const data: any = await UserInfoApi.get(`${profileUsername}`, {
  //       headers: {
  //         "Content-Type": "application/json",
  //         Authorization: `Bearer ${token}`,
  //       },
  //     }).then((res) => {
  //       const userData = res.data;
  //       setUser((prevState) => ({
  //         ...prevState,
  //         ...userData,
  //       }));
  //     });
  //   } catch (error) {
  //     console.log({ error });
  //   }
  // };

  const getProfileData = () => {
    return UserInfoApi.get(profileUsername ?? "", {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    }).then((res) => res.data);
  };

  const { data, isLoading, isError, error } = useQuery({
    queryKey: [profileUsername, "userInfo"],
    queryFn: getProfileData,
  });

  const checkMyProfile = () => {
    if (cookieUsername === data?.username) {
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
  }, [data]);

  // swich case
  const buttonType = (data: any) => {
    {
      switch (data?.relationState) {
        case "notFollowed":
          return <Follow user={data?.username} />;
        case "followed":
          return <UnFollow user={data?.username} />;
        case "requested":
          return <DeleteFollowReq user={data?.username} />;
        // case "blocked":
        //   return <UnBlock user={data?.username} />;
        case "gotBlocked":
          return (
            <div
              className="flex items-center text-xs font-semibold
            py-1 px-5 bg-[#EA5A69] rounded-[100px] text-white"
            >
              <FontAwesomeIcon className="ml-2" icon={faPlus} />
              دنبال کردن
            </div>
          );
        case "twoWayBlocked":
          return (
            <div
              className="flex items-center text-xs font-semibold
              py-1 px-5 bg-[#EA5A69] rounded-[100px] text-white"
            >
              <FontAwesomeIcon className="ml-2" icon={faPlus} />
              دنبال کردن
            </div>
          );
        default:
          return null;
      }
    }
  };
  useEffect(() => {
    buttonType(data);
  }, [data?.relationState]);

  return (
    <>
      <div>
        {/* profile informations */}
        <div className="text-black border-b-2 z-50 border-[#CAC4D0] bg-[#F5F5F5] sticky top-[64px] pb-3">
          <div className="flex justify-between">
            {isLoading ? (
              <MyPageSkeleton />
            ) : (
              <div className="flex items-center">
                <img
                  className="border rounded-full w-[105px] h-[105px]"
                  src={
                    data?.imageUrl
                      ? process.env.REACT_APP_IMAGE_URL + data?.imageUrl
                      : "../img/person.png"
                  }
                  alt=""
                />
                <div className="grid grid-rows-3 h-[105px] mr-4">
                  <div className="flex">
                    <div className="user-full-name text-base ml-4 text-[#191919]">
                      <span className="text-xl font-bold">
                        {data?.fName} {data?.lName}
                      </span>
                      <span className="text-base font-normal mr-4 ">
                        {data?.username}@
                      </span>
                    </div>
                    <div className="ml-4">
                      {!isMyProfile && buttonType(data)}
                    </div>
                  </div>
                  <div className="text-base font-normal flex ">
                    <div className="user-followers-details pl-2 text-[#C19008]">
                      {data?.followersCount}
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
                      {data?.followingsCount}
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
                      {data?.postCount}
                      <span className="mx-1">پست</span>
                    </div>
                  </div>
                  <div className="user-followers-details text-sm font-normal w-[377px] text-[#A5A5A5]">
                    {data?.bio}
                  </div>
                </div>
              </div>
            )}

            <div className="flex items-center">
              {!isMyProfile && (
                <div className="flex">
                  {!isMyProfile && (
                    <RelationButton
                      user={data?.username}
                      relation={data?.relationState}
                    />
                  )}
                </div>
              )}
              {isMyProfile && (
                <button
                  type="button"
                  className="text-sm px-10 py-2 w-auto bg-[#EA5A69] rounded-3xl text-white "
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
        <div className="z-0 bg-inherit py-5">
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
