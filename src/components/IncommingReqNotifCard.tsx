import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEllipsisVertical } from "@fortawesome/free-solid-svg-icons";
import { FunctionComponent, PropsWithChildren } from "react";
import { DeleteFollowReq } from "./DeleteFollowReq";
import { AcceptFollowReq } from "./AcceptFollowReq";
import { RejectFollow } from "./RejectFollow";

interface IUsers {
  username: string;
  fName: string;
  lName: string;
  imageUrl: string;
}
interface IncommingReq {
  user: IUsers;
  createdAt: string;
  isSeen: boolean;
}

export const IncommingReqNotifCard: FunctionComponent<
  PropsWithChildren<IncommingReq>
> = ({ children, user, createdAt, isSeen }) => {
  const navigate = useNavigate();
  const visitProfile = () => {
    navigate(`/profile/${user?.username}`);
  };

  return (
    <>
      <div className="flex justify-between items-center  text-xl text-center mb-8">
        <div className="items-center flex justify-start">
          <div>
            <button onClick={() => visitProfile()}>
              <img
                className="border rounded-full ml-7 w-[56px] h-[56px]"
                src={
                  user.imageUrl
                    ? process.env.REACT_APP_IMAGE_URL + user.imageUrl
                    : "../img/person.png"
                }
                alt=""
              />
            </button>
          </div>
          <div className="grid grid-rows-2 text-right">
            <div className="row-span-1 flex text-sm h-6 font-medium">
              <div>
                {user.fName && user.lName
                  ? `${user.fName} ${user.lName}  درخواست دوستی داده `
                  : `${user.username}  درخواست دوستی داده `}
              </div>
            </div>
            <div className="text-xs h-6 font-normal ">
              <p>{createdAt} در تاریخ</p>
            </div>
          </div>
          <div className="flex mr-20">
            <div className="ml-10">
              <AcceptFollowReq user={user.username} />
            </div>
            <div>
              <RejectFollow user={user.username} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
