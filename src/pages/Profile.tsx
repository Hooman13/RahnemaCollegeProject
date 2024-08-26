import { Header } from "../components/Header";
import { MyPage } from "../components/MyPage";
import { ProfileSidebar } from "../components/ProfileSidebar";

export const Profile = () => {
  return (
    <>
      <div className="w-screen h-full pt-8 px-10 bg-[#F5F5F5]">
        {/* header */}
        <Header />
        {/* main */}
        <div className="grid overflow-y-hidden grid-cols-12">
          {/* sideBar */}
          <ProfileSidebar />
          <div className="mr-10 grid col-span-10 overflow-y-scroll	">
            <MyPage />
          </div>
        </div>
      </div>
    </>
  );
};
