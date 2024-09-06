import { useNavigate } from "react-router-dom";
import { FunctionComponent, PropsWithChildren } from "react";
import { Follow } from "./Follow";

interface IUsers {
  username: string;
  fName: string;
  lName: string;
  imageUrl: string;
}
interface FUser {
  username: string;
  fName: string;
  lName: string;
}
interface IFollow {
  user: IUsers;
  friendUser: FUser;
  followState: string;
  createdAt: string;
  isSeen: boolean;
}

export const FreindFoCard: FunctionComponent<PropsWithChildren<IFollow>> = ({
  children,
  user,
  createdAt,
  friendUser,
  isSeen,
  followState,
}) => {
  const navigate = useNavigate();
  const visitProfile = () => {
    navigate(`/profile/${user?.username}`);
  };

  return (
    <>
      <div className="flex justify-between items-center  h-14  text-xl text-center mb-8">
        <div className="items-center flex justify-start h-14">
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
                  ? `${user.fName} ${user.lName} ${friendUser.fName} ${friendUser.lName} را دنبال کرد `
                  : `${user.username} ${friendUser.fName} ${friendUser.lName} را دنبال کرد`}
              </div>
            </div>
            <div className="text-xs h-6 font-normal ">
              <p>{createdAt} در تاریخ</p>
            </div>
          </div>
          <div className="mr-20">
            {followState === "notFollowed" ? (
              <button>
                <Follow user={user.username} />
              </button>
            ) : (
              <button>فالو شده</button>
            )}
          </div>
        </div>
      </div>
    </>
  );
};
