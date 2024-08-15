import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCirclePlus } from "@fortawesome/free-solid-svg-icons";
import { ProfileSidebar } from "../components/ProfileSidebar";
export const Messages = () => {
  return (
    <>
      <div className="w-screen h-full pt-16 px-16 bg-[#F5F5F5]">
        {/* header */}
        <div className="grid grid-cols-12 mb-4">
          <div className="grid col-span-3 py-4 justify-items-center	">
            <button
              type="submit"
              // onClick={getProfileData}
              className="w-[232px] py-4 px-2 bg-[#EA5A69] rounded-3xl text-white"
            >
              <FontAwesomeIcon className="ml-2" icon={faCirclePlus} />
              ایجاد پست جدید
            </button>
          </div>
          <div className=" col-span-9 flex justify-end">
            <img src="./img/logo.png" alt="" />
          </div>
        </div>
        {/* main */}
        <div className="grid grid-cols-12">
          {/* sideBar */}
          <ProfileSidebar />
          <div className="mr-16 grid col-span-9">پیام ها</div>
        </div>
      </div>
    </>
  );
};
