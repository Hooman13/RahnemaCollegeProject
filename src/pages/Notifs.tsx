import { Header } from "../components/Header";
import { ProfileSidebar } from "../components/ProfileSidebar";
import { Link, useParams } from "react-router-dom";
import { FollowingCard } from "../components/FollowingCard";
import { useState } from "react";
import { useEffect } from "react";
import Cookies from "js-cookie";
import { BaseApi } from "../api/axios";
import { Button, Modal } from "flowbite-react";
export const Notifs = () => {
  interface IUser {
    username: string;
    followersCount: number;
    imageUrl: string;
  }
  interface IUsers extends Array<IUser> {}
  const [followingsData, setFollowingsData] = useState<IUsers>([]);
  const token = Cookies.get("token");
  const { username } = useParams();
  const userName = Cookies.get("username");
  const userInfoEndpoint = username ? `${username}` : userName;
  const getFollowingsData = async () => {
    try {
      const data: any = await BaseApi.get(userInfoEndpoint + "/followings", {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }).then((res) => {
        const userData = res.data;
        const followingsList = userData.followings;
        setFollowingsData((prevState) => ({
          ...prevState,
          ...followingsList,
        }));
      });
    } catch (error) {
      console.log({ error });
    }
  };

  useEffect(() => {
    getFollowingsData();
  }, []);
  return (
    <>
      <div className="w-screen  overflow-y-hidden px-7 bg-[#F5F5F5]">
        {/* header */}
        <Header />
        {/* main */}
        <div className="grid mt-16 overflow-y-hidden grid-cols-12">
          {/* sideBar */}
          <div className="col-span-2 pt-2">
            <ProfileSidebar />
          </div>
          <div className="mr-10 grid pt-2 col-span-10 overflow-y-scroll	">
            <h1 className="text-xl font-medium mb-8">اعلانات</h1>
            <div className="text-md font-normal mb-16 justify-start flex">
              <Link to="/my-notifs">
                <button className="text-[#A5A5A5] ml-10">اعلانات من </button>
              </Link>
              |
              <Link to="/friends-notifs">
                <button className="mr-10">اعلانات دوستان من</button>
              </Link>
            </div>
            <div className="overflow-y-scroll">
              {Object.values(followingsData).map(function (user, index) {
                return (
                  <FollowingCard
                    username={user.username}
                    followersCount={user.followersCount}
                    imageUrl={
                      user.imageUrl
                        ? process.env.REACT_APP_IMAGE_URL + user.imageUrl
                        : "../img/person.png"
                    }
                    key={index}
                  ></FollowingCard>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
