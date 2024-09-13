import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faEllipsisVertical } from "@fortawesome/free-solid-svg-icons";
import React, { useState, PropsWithChildren } from "react";
import { RemoveFollowing } from "./buttons/RemoveFollowing";

interface IUser {
  user: string;
}

export const FollowingMenu: React.FC<PropsWithChildren<IUser>> = ({
  user,
  children,
}) => {
  return (
    <Menu as="div" className="relative inline-block">
      <div>
        <MenuButton className="text-[#EA5A69] text-4xl items-end">
          <FontAwesomeIcon icon={faEllipsisVertical} />
        </MenuButton>
      </div>

      <MenuItems
        transition
        className="absolute left-0 z-10 w-56 origin-top-right rounded-tr-lg rounded-b-lg bg-white shadow-lg ring-1 ring-black ring-opacity-5 transition focus:outline-none data-[closed]:scale-95 data-[closed]:transform data-[closed]:opacity-0 data-[enter]:duration-100 data-[leave]:duration-75 data-[enter]:ease-out data-[leave]:ease-in"
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
              <RemoveFollowing user={user} />
            </div>
          </MenuItem>
        </div>
      </MenuItems>
    </Menu>
  );
};
