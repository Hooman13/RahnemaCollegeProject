import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCirclePlus } from "@fortawesome/free-solid-svg-icons";
import { CreatePost } from "../pages/CreatePost";

export const Header = () => {
  const [openModal, setOpenModal] = useState(false);
  return (
    <div className="fixed grid grid-cols-12 mb-2 mr-7">
      <div className="grid col-span-2 pb-4 justify-items-center	">
        <button
          onClick={() => {
            setOpenModal(true);
          }}
          className="w-auto px-10 text-sm bg-[#EA5A69] rounded-3xl text-white"
        >
          <FontAwesomeIcon className="ml-2" icon={faCirclePlus} />
          پست جدید
        </button>
      </div>
      <div className="col-span-10 flex justify-end items-center">
        <img className="w-[82px] h-[49px]" src="./img/logo.png" alt="" />
      </div>
      <CreatePost openModal={openModal} setOpenModal={setOpenModal} />
    </div>
  );
};
