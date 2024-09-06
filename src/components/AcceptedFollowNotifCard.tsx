import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEllipsisVertical } from "@fortawesome/free-solid-svg-icons";
import { FunctionComponent, PropsWithChildren } from "react";

interface IUsers {
  username: string;
  fName: string;
  lName: string;
  imageUrl: string;
}
interface IacceptedFollow {
  user: IUsers;
  createdAt: string;
  isSeen: boolean;
}

export const AcceptedFollowNotifCard: FunctionComponent<
  PropsWithChildren<IacceptedFollow>
> = ({ children, user, createdAt, isSeen }) => {
  const navigate = useNavigate();
  const visitProfile = () => {
    navigate(`/profile/${user?.username}`);
  };

  return (
    <>
      <div className="grid grid-cols-6 justify-between items-center  h-14  text-xl text-center mb-8">
        <div className="items-center col-span-4 flex justify-start w-[210px] h-14">
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
          <div className="grid grid-rows-2 text-right">
            <div className="user-display-name text-sm h-6 font-bold">
              {user.fName}
            </div>
            <div className="user-full-name text-xs h-6 font-normal ">
              <p>{createdAt} در تاریخ</p>
            </div>
          </div>
        </div>
        <div className="text-[#EA5A69] col-span-2 mr-4 items-end">
          <FontAwesomeIcon icon={faEllipsisVertical} />
        </div>
      </div>
    </>
  );
};
