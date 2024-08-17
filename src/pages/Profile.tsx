import styles from "./Profile.module.css";
import { MyPage } from "../components/MyPage";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCirclePlus } from "@fortawesome/free-solid-svg-icons";
import { ProfileSidebar } from "../components/ProfileSidebar";
import { Link } from "react-router-dom";

export const Profile = () => {
  // console.log(user.data.username);
  // console.log(user.data.email);
  // console.log(user);
  return (
    <>
      <div className="w-screen h-full pt-16 px-16 bg-[#F5F5F5]">
        {/* header */}
        <div className="grid grid-cols-12 mb-4">
          <div className="grid col-span-3 py-4 justify-items-center	">
            <Link to="/createpost">
              <button
                type="submit"
                // onClick={getProfileData}
                className="w-[232px] py-4 px-2 bg-[#EA5A69] rounded-3xl text-white"
              >
                <FontAwesomeIcon className="ml-2" icon={faCirclePlus} />
                ایجاد پست جدید
              </button>
            </Link>
          </div>
          <div className=" col-span-9 flex justify-end">
            <img src="./img/logo.png" alt="" />
          </div>
        </div>
        {/* main */}
        <div className="grid overflow-y-hidden	 grid-cols-12">
          {/* sideBar */}
          <ProfileSidebar />
          <div className="mr-16 grid col-span-9 overflow-y-scroll	">
            <MyPage />
          </div>
        </div>
      </div>
    </>
  );
};
