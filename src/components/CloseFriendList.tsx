import { Link, useParams } from "react-router-dom";
import Cookies from "js-cookie";
import { BaseApi } from "../api/axios";
import { useQuery } from "@tanstack/react-query";
import { PagesLayout } from "../pages/PagesLayout";

export const CloseFriendList = () => {
  const token = Cookies.get("token");
  const { username } = useParams();
  const userName = Cookies.get("username");
  const userInfoEndpoint = username ? `${username}` : userName;

  const getNotifs = () => {
    return BaseApi.get("/user-relations/blocks", {
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
          <Link to="/notifs">
            <button className=" ml-10">دوستان نزدیک</button>
          </Link>
          |
          <Link to="/friends-notifs">
            <button className="text-[#A5A5A5] mr-10">لیست سیاه</button>
          </Link>
        </div>
        <div className="overflow-y-scroll">
          {/* {data?.notifs
            ? Object.values(data.notifs).map(function (notif, index) {
                return notifsType(notif);
              })
            : null} */}
        </div>
      </div>
    </PagesLayout>
  );
};
