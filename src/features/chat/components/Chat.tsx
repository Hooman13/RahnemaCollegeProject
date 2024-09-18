import { ChatBubble } from "./ChatBubble";

interface IProps {
  username: string;
}

export const Chat: React.FC<IProps> = ({ username }) => {
  const chats = [
    {
      messageId: "234234234",
      content: "سلام خوبی",
      image: "",
      isOwned: true,
      createdAt: '2024-09-17T18:19:47.992Z',
    },
    {
      messageId: "234234234",
      content: "سلام خوبی",
      image: "",
      isOwned: false,
      createdAt: '2024-09-17T18:20:47.992Z',
    },
    {
      messageId: "234234234",
      content: "سلام خوبی",
      image: "",
      isOwned: true,
      createdAt: '2024-09-17T18:22:47.992Z',
    },
    {
      messageId: "234234234",
      content: "سلام خوبی",
      image: "",
      isOwned: false,
      createdAt: '2024-09-17T18:45:47.992Z',
    },
    {
      messageId: "234234234",
      content: "سلام خوبی",
      image: "",
      isOwned: true,
      createdAt: '2024-09-17T18:55:47.992Z',
    },
    
  ];

  return (
    <>
      <ol className="">
        {chats.map((item, index) => {
          return (
            <ChatBubble key={index}
              content={item.content}
              createdAt={item.createdAt}
              isOwned={item.isOwned}
              messageId={item.messageId}
              image={item.image}
            />
          );
        })}
      </ol>
    </>
  );
};
