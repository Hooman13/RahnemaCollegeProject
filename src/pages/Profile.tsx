import { Header } from "../components/Header";
import { MyPage } from "../components/MyPage";
import { ProfileSidebar } from "../components/ProfileSidebar";

export const Profile = () => {

  return (
    <>
      <div className="w-screen h-full pt-16 px-16 bg-[#F5F5F5]">
        {/* header */}
        <Header/>
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
