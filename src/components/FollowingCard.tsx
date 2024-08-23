import { Link, useParams } from "react-router-dom";
import { useState } from "react";
import { useEffect } from "react";
import Cookies from "js-cookie";
import axios from "../api/axios";
import { FunctionComponent, PropsWithChildren } from "react";
interface IUsers {
  followedId: string;
  updatedAt: string;
}

export const FollowingCard: FunctionComponent<PropsWithChildren<IUsers>> = ({
  children,
  followedId,
  updatedAt,
}) => {
  return (
    <>
      <div className="grid grid-cols-6 justify-between items-center  h-14  text-xl text-center mb-8">
        <div className="items-center col-span-4 flex justify-start w-[210px] h-14">
          <img
            className="border rounded-full ml-7 w-[56px] h-[56px]"
            src="./img/avatar.png"
            alt=""
          />
          <div className="grid grid-rows-2 text-right">
            <div className="user-display-name text-sm h-6 font-bold">
              {followedId}
            </div>
            <div className="user-full-name text-xs h-6 font-normal ">
              {updatedAt}
            </div>
          </div>
        </div>
        <div className="col-span-2 mr-4 items-end">. . .</div>
      </div>
    </>
  );
};
