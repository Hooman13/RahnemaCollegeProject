import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faThumbTack,
  faBookmark,
  faCommentDots,
  faBell,
  faTag,
  faMagnifyingGlass,
  faGripVertical,
  faCirclePlus,
  faCamera,
} from "@fortawesome/free-solid-svg-icons";

export const AddPhoto = () => {
  return (
    <>
      <section>
        <form>
          <div
            className="frame5 w-screen h-screen bg-no-repeat bg-center bg-cover flex justify-center items-center"
            style={{ backgroundImage: "url(./img/login-background.png)" }}
          >
            <div className="bg-white w-screen md:w-[485px] h-screen md:h-auto  py-16 shadow-lg rounded-3xl mt-3 px-20 ">
              {/* The Graph */}
              <div className="flex-row flex justify-evenly px-4 py-6 ">
                <div className="grid grid-rows-2 justify-items-center">
                  <div className=" border justify-items-center justify-center items-center  border-[#6F6F6F] rounded-full w-4 h-4">
                    {/* <div className="flex items-center justify-center border m-auto   border-black rounded-full w-1 h-1 bg-black"></div> */}
                  </div>
                  <p className="grid text-[#6F6F6F] row-span-1 text-[10px] mt-1">
                    تنظیمات
                  </p>
                </div>
                <div className="grid grid-rows-2 justify-items-center">
                  <div className=" border justify-items-center justify-center items-center   border-[#6F6F6F] rounded-full w-4 h-4">
                    {/* <div className="flex items-center justify-center border m-auto   border-black rounded-full w-1 h-1 bg-black"></div> */}
                  </div>
                  <p className="grid text-[#6F6F6F] row-span-1 text-[10px] mt-1">
                    متن
                  </p>
                </div>
                <div className="grid grid-rows-2 justify-items-center">
                  <div className="flex border justify-items-center justify-center items-center  border-black rounded-full w-4 h-4">
                    <div className="flex items-center justify-center border m-auto   border-black rounded-full w-1 h-1 bg-black"></div>
                  </div>
                  <p className="grid row-span-1 text-[10px] mt-1">عکس</p>
                </div>
              </div>
              {/* main */}
              <div className="text-center mt-8 text-base font-normal mb-8">
                <p>عکس‌های مورد نظرت رو آپلود کن:</p>
              </div>
              <div className="flex justify-center mb-8">
                <div className="flex relative items-center justify-center  rounded-full w-[90px] h-[90px] border-[#F7901E] border-2">
                  <div className="m-auto ">
                    <FontAwesomeIcon
                      className="w-9 h-9"
                      icon={faCamera}
                      style={{ color: "#F7901E" }}
                    />
                  </div>
                  <div>
                    <FontAwesomeIcon
                      className="absolute top-[21px] right-[54px]"
                      icon={faCirclePlus}
                      style={{ color: "#F7901E" }}
                    />
                  </div>
                </div>
              </div>

              {/* buttons */}
              <div className="flex items-center justify-end text-sm">
                <div className="flex pl-5">
                  <Link to="/login">
                    <button>پشیمون شدم</button>
                  </Link>
                </div>
                <div className="text-center mr-1 flex border-solid rounded-2xl bg-[#EA5A69] w-[62px] h-[36px] text-sm justify-center items-center px-[8px] py-[16px] ">
                  <button type={"submit"}>بعدی</button>
                </div>
              </div>
            </div>
          </div>
        </form>
      </section>
    </>
  );
};
