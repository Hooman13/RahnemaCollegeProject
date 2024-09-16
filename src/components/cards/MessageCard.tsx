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
      <div className="flex justify-between items-center  text-xl text-center mb-8">
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
          <div className="grid grid-rows-2 text-right">
            <div className="row-span-1 flex text-sm h-6 font-medium">
              <div>
                {contact.fName && contact.lName
                  ? `${contact.fName} ${contact.lName} توی اون یکی عکس تگت کرد`
                  : `${contact.username} توی اون یکی عکس تگت کرد`}
              </div>
              <div className="text-xs h-6 font-normal ">
                <p>
                  {contact.lastMessage.createdAt &&
                    TimeAgoDate(contact.lastMessage.createdAt)}
                </p>
              </div>
            </div>
            <div className="text-xs h-6 font-normal ">
              {contact.lastMessage.content}
            </div>
          </div>
        </div>
        <div className="mr-9">{contact.unseenCount}</div>
      </div>
    </>
  );
};
