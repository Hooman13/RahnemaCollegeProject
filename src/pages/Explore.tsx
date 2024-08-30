import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCirclePlus } from "@fortawesome/free-solid-svg-icons";
import { ProfileSidebar } from "../components/ProfileSidebar";
import { Header } from "../components/Header";
export const Explore = () => {
  return (
    <div className="w-screen  overflow-y-hidden px-7 bg-[#F5F5F5]">
      {/* header */}
      <Header />
      {/* main */}
      <div className="grid mt-16 overflow-y-hidden grid-cols-12">
        {/* sideBar */}
        <div className="col-span-2 pt-2">
          <ProfileSidebar />
        </div>
        <div className="mr-10 grid pt-2 col-span-10 overflow-y-scroll	">
          {/* <div className="mt-8 bg-inherit h-full border border-[#CDCDCD] rounded-3xl">
            <div className="flex-row min-h-screen justify-center items-center">
              <div className="flex text-4xl font-bold">
                سلام به کالج‌گرام خوش اومدی!
              </div>
              <div className="flex text-lg">
                برای دیدن پست‌ها در این صفحه باید کالج‌گرامی‌ها رو دنبال کنی.
                آماده‌ای؟
              </div>
              <div className="text-center flex border-solid  text-white rounded-2xl bg-[#EA5A69] h-7 text-xs font-semibold justify-center items-center ">
                <button type={"submit"}>جستجوی کالج‌گرامی‌ها </button>
              </div>
            </div>
          </div> */}
          <div className="mt-8 bg-inherit h-full border border-[#CDCDCD] rounded-3xl">
            <div className="flex  min-h-screen justify-center items-center">
              <div className="flex-row items-end text-center">
                <div className="mb-8 text-4xl font-bold">
                  سلام به کالج‌گرام خوش اومدی!
                </div>
                <div className="text-xl font-base mb-8">
                  برای دیدن پست‌ها در این صفحه باید کالج‌گرامی‌ها رو دنبال کنی.
                  آماده‌ای؟
                </div>
                <div className="flex justify-center">
                  <button
                    className="text-center flex border-solid text-white rounded-3xl bg-[#EA5A69] h-7 text-xs font-semibold justify-center items-center py-[16px] px-8"
                    type={"submit"}
                  >
                    جستجوی کالج‌گرامی‌ها
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
