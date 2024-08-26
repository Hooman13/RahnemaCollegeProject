import { Header } from "../components/Header";
import { MyPage } from "../components/MyPage";
import { ProfileSidebar } from "../components/ProfileSidebar";

export const Profile = () => {
  return (
    <>
      <div className="w-screen h-full pt-6 px-7 bg-[#F5F5F5]">
        {/* header */}
        <Header />
        {/* main */}
        <div className="grid mt-12 overflow-y-hidden grid-cols-12">
          {/* sideBar */}
          <div className="col-span-2">
            <ProfileSidebar />
          </div>
          <div className="mr-10 grid col-span-10 overflow-y-scroll	">
            <MyPage />
          </div>
        </div>
      </div>
    </>
  );
};
