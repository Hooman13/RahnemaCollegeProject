import { Link, useParams } from "react-router-dom";
import { useState } from "react";
import { useEffect } from "react";
import Cookies from "js-cookie";
import axios from "../api/axios";

export const FollowerCard = () => {
  interface IUser {
    imageUrl: string;
    username: string;
    followingsCount: number;
  }
  const [user, setUser] = useState<IUser>({
    imageUrl: "",
    username: "",
    followingsCount: 0,
  });
  const { username } = useParams();
  const token = Cookies.get("token");
  const userName = Cookies.get("username");
  const getFollowingsData = async () => {
    try {
      const data: any = await axios
        .get("http://37.32.5.72:3000/" + userName + "/followings", {
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

  useEffect(() => {
    getFollowingsData();
  }, []);

  return (
    <>
      <div className="grid grid-cols-6 justify-between items-center  h-14  text-xl text-center mb-8">
        <div className="items-center col-span-4 flex justify-start w-[210px] h-14">
          <img
            className="border rounded-full ml-7 w-[56px] h-[56px]"
            src="./img/avatar.png"
            alt=""
          />
          <div className="grid grid-rows-2 text-right">
            <div className="user-display-name text-sm h-6 font-bold">
              {user.username}
            </div>
            <div className="user-full-name text-xs h-6 font-normal ">
              {user.followingsCount}
            </div>
          </div>
        </div>
        <div className="col-span-2 mr-4 items-end">. . .</div>
      </div>
    </>
  );
};
