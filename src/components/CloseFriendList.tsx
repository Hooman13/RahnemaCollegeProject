import { Link, useParams } from "react-router-dom";
import Cookies from "js-cookie";
import { BaseApi } from "../api/axios";
import { useQuery } from "@tanstack/react-query";
import { PagesLayout } from "../pages/PagesLayout";
import { CloseFriendCard } from "./cards/CloseFriendCard";

export const CloseFriendList = () => {
  const token = Cookies.get("token");
  const { username } = useParams();
  const userName = Cookies.get("username");
  const userInfoEndpoint = username ? `${username}` : userName;

  const getNotifs = () => {
    return BaseApi.get("/user-relations/friends", {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    }).then((res) => {
      return res.data;
    });
  };
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["myNotifs"],
    queryFn: getNotifs,
  });

  return (
    <PagesLayout>
      <div className="w-full bg-inherit flex flex-col justify-center">
        <div className="text-md font-normal mb-16 justify-start flex">
          <Link to="/close-friend">
            <button className=" ml-10">دوستان نزدیک</button>
          </Link>
          |
          <Link to="/block-list">
            <button className="text-[#A5A5A5] mr-10">لیست سیاه</button>
          </Link>
        </div>
        <div className="overflow-y-scroll">
          {data?.friends
            ? Object.values(data.friends).map(function (
                item: any,
                index: number
              ) {
                return (
                  <CloseFriendCard
                    username={item.username}
                    followersCount={item.followersCount}
                    imageUrl={
                      item.imageUrl
                        ? process.env.REACT_APP_IMAGE_URL + item.imageUrl
                        : "../img/person.png"
                    }
                    key={index}
                  />
                );
              })
            : null}
        </div>
      </div>
    </PagesLayout>
  );
};
