import { FollowerCard } from "../components/FollowerCard";
import { Link, useParams } from "react-router-dom";
import { useState } from "react";
import { useEffect } from "react";
import Cookies from "js-cookie";
import axios from "../api/axios";

export const FollowersList = () => {
  interface IUser {
    imageUrl: string;
    username: string;
    followingsCount: number;
  }
  interface IUsers extends Array<IUser> {}
  const [followingsData, setFollowingsData] = useState<IUsers>([]);
  // const [followingsData, setFollowingsData] = useState([]);
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
          console.log(userData);
          setFollowingsData((prevState) => ({
            ...prevState,
            ...userData,
          }));
          console.log(followingsData);
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
      <section>
        <form>
          <div
            className="frame5 w-screen h-screen bg-no-repeat bg-center bg-cover flex justify-center items-center"
            style={{ backgroundImage: "url(./img/login-background.png)" }}
          >
            <div className=" bg-white w-screen md:w-[500px] h-screen md:h-auto  py-16 shadow-lg rounded-3xl mt-3 px-12 ">
              <div className="flex justify-center pb-10 text-xl overflow-y-hidden font-bold text-[#191919]">
                دنبال شونده‌‌ها
              </div>
              <div className="overflow-y-scroll">
                {followingsData.map((user, index) => {
                  return <FollowerCard user={user} />;
                })}
              </div>
            </div>
          </div>
        </form>
      </section>
    </>
  );
};
