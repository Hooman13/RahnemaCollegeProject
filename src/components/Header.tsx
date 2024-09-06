import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCirclePlus } from "@fortawesome/free-solid-svg-icons";
import { CreatePost } from "../pages/CreatePost";

export const Header = () => {
  const [openModal, setOpenModal] = useState(false);
  const [modalSize, setModalSize] = useState<string>("5xl");
  return (
    <div className="fixed bg-[#F5F5F5] z-50 grid grid-cols-12 w-screen pt-6 mr-2">
      <div className="grid col-span-2 pb-4 justify-items-center	">
        <button
          onClick={() => {
            setOpenModal(true);
            setModalSize("xl");
          }}
          className="w-auto px-12 text-sm bg-[#EA5A69] rounded-3xl text-white"
        >
          <FontAwesomeIcon className="ml-2" icon={faCirclePlus} />
          پست جدید
        </button>
      </div>
      <div className="col-span-10 mr-[900px] flex items-center">
        <img className="w-[82px] h-[49px]" src="../img/logo.png" alt="" />
      </div>
      <CreatePost openModal={openModal} setOpenModal={setOpenModal} />
    </div>
  );
};
