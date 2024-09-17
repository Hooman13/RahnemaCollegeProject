import { MessageCard } from "../components/cards/MessageCard";
import { PagesLayout } from "./PagesLayout";
import { Link, useParams } from "react-router-dom";
import Cookies from "js-cookie";
import { BaseApi } from "../api/axios";
import { useQuery } from "@tanstack/react-query";

interface IUsers {
  username: string;
  fName: string;
  lName: string;
  imageUrl: string;
  unseenCount: number;
  lastMessage: ILastMessage;
}
interface ILastMessage {
  content: string;
  createdAt: string;
}
interface IChat {
  contact: IUsers;
  chatId: string;
}

export const Messages = () => {
  const token = Cookies.get("token");
  const { username } = useParams();
  const userName = Cookies.get("username");
  const userInfoEndpoint = username ? `${username}` : userName;

  const getNotifs = () => {
    return BaseApi.get("/dashboard/messages?p=1&c=5", {
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
    <>
      <PagesLayout>
        <p className="text-xl font-semibold sticky z-50 top-[20px] mb-3">
          پیام‌ها
        </p>
        <div className="w-full bg-inherit flex flex-col justify-center">
          {data
            ? data.map(function (item: IChat, index: number) {
                return (
                  <MessageCard
                    contact={item.contact}
                    chatId={item.chatId}
                    key={index}
                  />
                );
              })
            : null}
        </div>
      </PagesLayout>
    </>
  );
};
