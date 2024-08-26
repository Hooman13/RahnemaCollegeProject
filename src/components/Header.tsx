import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCirclePlus } from "@fortawesome/free-solid-svg-icons";
import { CreatePost } from "../pages/CreatePost";

export const Header = () => {
  const [openModal, setOpenModal] = useState(false);
  return (
    <div className="grid grid-cols-12 mb-4">
      <div className="grid col-span-2 pb-4 justify-items-center	">
        <button
          onClick={() => {
            setOpenModal(true);
          }}
          className="w-[200px] bg-[#EA5A69] rounded-3xl text-white"
        >
          <FontAwesomeIcon className="ml-2" icon={faCirclePlus} />
          ایجاد پست جدید
        </button>
      </div>
      <div className="col-span-9 flex justify-end items-center">
        <img className="w-[82px] h-[49px]" src="./img/logo.png" alt="" />
      </div>
      <CreatePost openModal={openModal} setOpenModal={setOpenModal} />
    </div>
  );
};
