import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faList } from "@fortawesome/free-solid-svg-icons";
import React, { useState, PropsWithChildren } from "react";
import { BlockUnBlock } from "./BlockUnblock";
import { CloseFriendB } from "./CloseFriendB";
import { CloseFriendList } from "../CloseFriendList";
import { BlockList } from "../BlockList";
import { Link } from "react-router-dom";

interface IUser {
  user: string;
}

export const MoreButton: React.FC<PropsWithChildren<IUser>> = ({
  user,
  children,
}) => {
  return (
    <Menu as="div" className="relative inline-block">
      <div>
        <MenuButton>
          <div className="w-auto mt-14 2xl:text-xl font-normal py-3 flex h-auto pr-9 hover:bg-[#F5F5F5] border-none rounded-[75px] text-center">
            <FontAwesomeIcon className="ml-4" icon={faList} />
            بیشتر
          </div>
        </MenuButton>
      </div>

      <MenuItems
        transition
        className="absolute bottom-12 z-10 w-56  rounded-t-lg rounded-bl-lg bg-white shadow-lg ring-1 ring-black ring-opacity-5 transition focus:outline-none data-[closed]:scale-95 data-[closed]:transform data-[closed]:opacity-0 data-[enter]:duration-100 data-[leave]:duration-75 data-[enter]:ease-out data-[leave]:ease-in"
      >
        <div className="py-3">
          <MenuItem>
            <a
              href="#"
              className="block px-4 py-2 text-xs font-normal text-Black data-[focus]:bg-gray-100 data-[focus]:text-gray-900"
            >
              پیام
            </a>
          </MenuItem>
          <MenuItem>
            <div className=" data-[focus]:bg-gray-100">
              <Link to="/close-friend">
                <a
                  href="#"
                  className="block px-4 py-2 text-xs font-normal text-Black data-[focus]:bg-gray-100 data-[focus]:text-gray-900"
                >
                  دوستان نزدیک
                </a>
              </Link>
            </div>
          </MenuItem>
          <MenuItem>
            <div className=" data-[focus]:bg-gray-100">
              <Link to="/block-list">
                <a
                  href="#"
                  className="block px-4 py-2 text-xs font-normal text-Black data-[focus]:bg-gray-100 data-[focus]:text-gray-900"
                >
                  لیست سیاه
                </a>
              </Link>
            </div>
          </MenuItem>
        </div>
      </MenuItems>
    </Menu>
  );
};
