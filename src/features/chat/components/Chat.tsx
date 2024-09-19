import { useQuery } from "@tanstack/react-query";
import { ChatBubble } from "./ChatBubble";
import { getMessage } from "../../../api/chat";
import { IMessage } from "../../../data/types";
import { ChatBubbleSkeleton } from "./ChatBubbleSkeleton";

interface IProps {
  username: string;
  imgUrl?: string;
  fullname?: string;
}

export const Chat: React.FC<IProps> = ({ username, imgUrl, fullname }) => {
  const getPvChats = () => {
    return getMessage(username).then((res) => res);
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
