import { useNavigate } from "react-router-dom";
import { FunctionComponent, PropsWithChildren } from "react";
import { TimeAgoDate } from "../../utils/TimeAgoDate";

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

export const MessageCard: FunctionComponent<PropsWithChildren<IChat>> = ({
  children,
  contact,
  chatId,
}) => {
  //   const navigate = useNavigate();
  //   const visitProfile = () => {
  //     navigate(`/post/${post.postId}`);
  //   };
  //   console.log(post);

  return (
    <>
      <div className="flex items-center  text-xl text-center mb-8">
        <div className="items-center flex justify-start">
          <div>
            {/* <button onClick={() => visitProfile()}> */}
            <img
              className="border rounded-full ml-7 w-[56px] h-[56px]"
              src={
                contact.imageUrl
                  ? process.env.REACT_APP_IMAGE_URL + contact.imageUrl
                  : "../img/person.png"
              }
              alt=""
            />
            {/* </button> */}
          </div>
          <div className="text-right">
            <div className="flex mb-2 text-sm items-center font-medium">
              <div className="ml-4">
                {contact.fName && contact.lName
                  ? `${contact.fName} ${contact.lName}`
                  : `${contact.username}`}
              </div>
              <div className="text-xs font-normal ">
                <p>
                  {contact.lastMessage.createdAt &&
                    TimeAgoDate(contact.lastMessage.createdAt)}
                </p>
              </div>
            </div>
            <div className="text-xs font-normal ">
              {contact.lastMessage.content}
            </div>
          </div>
        </div>
        <div className="flex justify-center justify-items-center mr-14 w-6 h-6 border border-[#F6881F] rounded-full bg-[#F6881F] text-base">
          <p>{contact.unseenCount}</p>
        </div>
      </div>
    </>
  );
};
