import { useState } from "react";
import { LanguageServiceMode } from "typescript";
import { useNavigate } from "react-router-dom";
import { Follow } from "../buttons/Follow";
import { UnFollow } from "../buttons/UnFollow";
import { DeleteFollowReq } from "../buttons/DeleteFollowReq";
import { useQueryClient } from "@tanstack/react-query";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faEllipsisVertical } from "@fortawesome/free-solid-svg-icons";
import { useEffect } from "react";
interface IProps {
  username: string;
  imageUrl: string;
  fName: string;
  lName: string;
  followersCount: number;
  relationState: string;
}
export const UserCard: React.FC<IProps> = ({
  username,
  imageUrl,
  fName,
  lName,
  followersCount,
  relationState,
}) => {
  const navigate = useNavigate();
  const visitProfile = () => {
    navigate(`/profile/${username}`);
  };

  // swich case
  const buttonType = () => {
    {
      switch (relationState) {
        case "notFollowed":
          return <Follow user={username} />;
        case "followed":
          return <UnFollow user={username} />;
        case "requestedFollow":
          return <DeleteFollowReq user={username} />;
        // case "blocked":
        //   return <UnBlock user={data?.username} />;
        case "gotBlocked":
          return (
            <div
              className="flex items-center text-xs font-semibold
            py-3 px-16 bg-[#A5A5A5] rounded-[100px] text-white"
            >
              <FontAwesomeIcon className="ml-2" icon={faPlus} />
              دنبال کردن
            </div>
          );
        case "twoWayBlocked":
          return (
            <div
              className="flex items-center text-xs font-semibold
            py-3 px-16 bg-[#A5A5A5] rounded-[100px] text-white"
            >
              <FontAwesomeIcon className="ml-2" icon={faPlus} />
              دنبال کردن
            </div>
          );
        default:
          return (
            <div
              className="flex items-center text-xs font-semibold
            py-3 px-16 bg-[#A5A5A5] rounded-[100px] text-white"
            >
              <FontAwesomeIcon className="ml-2" icon={faPlus} />
              دنبال کردن
            </div>
          );
      }
    }
  };
  useEffect(() => {
    buttonType();
  }, [relationState]);

  return (
    <>
      <div className="flex-col mt-4 p-8 border border-solid border-black rounded-3xl">
        <div className="flex">
          <button onClick={() => visitProfile()}>
            <img
              className="border rounded-full ml-7 w-[56px] h-[56px]"
              // src={imageUrl}
              src="./img/person.png"
              alt=""
            />
          </button>
          <div className="grid grid-rows-2 text-right">
            <div className="user-display-name text-sm h-6 font-bold">
              {/* {username} */}
              متین دهقان
            </div>
            <div className="user-full-name text-xs h-6 font-normal ">
              <p>{followersCount} دنبال کننده</p>
            </div>
          </div>
        </div>
        <div className="flex justify-center items-center mt-8">
          <div>{buttonType()}</div>
        </div>
      </div>
    </>
  );
};
