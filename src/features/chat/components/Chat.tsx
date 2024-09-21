import { useQuery, useQueryClient } from "@tanstack/react-query";
import { ChatBubble } from "./ChatBubble";
import { getMessage } from "../../../api/chat";
import { IMessage } from "../../../data/types";
import { ChatBubbleSkeleton } from "./ChatBubbleSkeleton";
import { io } from "socket.io-client";
import { createContext, useEffect } from "react";
import Cookies from "js-cookie";
interface IProps {
  username: string;
  imgUrl?: string;
  fullname?: string;
}

export const Chat: React.FC<IProps> = ({ username, imgUrl, fullname }) => {
  const queryClient = useQueryClient();
  const socket = io(process.env.REACT_APP_API_SOCKET_URL as string, {
    autoConnect: false,
    secure: true,
  });

  socket.on("connect_error", (err) => {
    console.log("connect_error : " + err);
  });

  socket.on("connect", () => {
    console.log(socket.id);
  });

  socket.on("disconnect", () => {
    console.log(socket.id);
  });

  socket.on("error", (err) => {
    console.log("error : " + err);
  });

  socket.on("pvMessage", (message) => {
    console.log("revceived message : " + message);
    queryClient.invalidateQueries({ queryKey: ["pv", username] });
  });

  useEffect(() => {
    const jwt = Cookies.get("token");
    socket.auth = { jwt };
    socket.connect();
    console.log(socket);
    socket.emit("pvConnect", username);
  }, []);

  const getPvChats = () => {
    return getMessage(username).then((res) => {
      return res;
    });
  };

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["pv", username],
    queryFn: getPvChats,
  });

  const skeletonArray = new Array(5).fill("");
  if (isLoading) {
    return (
      <>
        {skeletonArray.map((item, index) => {
          return <ChatBubbleSkeleton key={index} />;
        })}
      </>
    );
  }

  if (isError) {
    return <h1>خطا:{error.message}</h1>;
  }

  return (
    <>
      <div className="flex w-full flex-col gap-2">
        {data?.map((item: IMessage, index: number) => {
          return (
            <ChatBubble
              key={index}
              content={item.content}
              createdAt={item.createdAt}
              isOwned={item.isOwned}
              messageId={item.messageId}
              image={item.image}
              username={username}
              imgUrl={imgUrl}
              fullname={fullname}
            />
          );
        })}
      </div>
    </>
  );
};
