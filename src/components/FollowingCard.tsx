import { useNavigate } from "react-router-dom";
import { FunctionComponent, PropsWithChildren } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEllipsisVertical } from "@fortawesome/free-solid-svg-icons";
interface IUsers {
  username: string;
  followersCount: number;
  imageUrl: string;
}

export const FollowingCard: FunctionComponent<PropsWithChildren<IUsers>> = ({
  children,
  username,
  followersCount,
  imageUrl,
}) => {
  const navigate = useNavigate();
  const visitProfile = () => {
    navigate(`/profile/${username}`);
  };

  return (
    <>
      <div className="grid grid-cols-6 justify-between items-center  h-14  text-xl text-center mb-8">
        <div className="items-center col-span-4 flex justify-start w-[210px] h-14">
          <button onClick={() => visitProfile()}>
            <img
              className="border rounded-full ml-7 w-[56px] h-[56px]"
              src={imageUrl}
              alt=""
            />
          </button>
          <div className="grid grid-rows-2 text-right">
            <div className="user-display-name text-sm h-6 font-bold">
              {username}
            </div>
            <div className="user-full-name text-xs h-6 font-normal text-black">
              <p>{followersCount} دنبال کننده</p>
            </div>
          </div>
        </div>
        <div className="text-[#EA5A69] col-span-2 items-end">
          <FontAwesomeIcon icon={faEllipsisVertical} />
        </div>
      </div>
    </>
  );
};
