import { ProfileSidebar } from "../components/ProfileSidebar";
import { Header } from "../components/Header";
import { MyPage } from "../components/MyPage";
export const Messages = () => {
  return (
    <>
      <div className="w-screen  overflow-y-hidden px-7 bg-[#F5F5F5]">
        {/* header */}
        <Header />
        {/* main */}
        <div className="grid mt-16 overflow-y-hidden grid-cols-12">
          {/* sideBar */}
          <div className="col-span-2 pt-2">
            <ProfileSidebar />
          </div>
          {/* <div className="mr-10 grid pt-2 col-span-10 overflow-y-scroll	">
            <MyPage />
          </div> */}
        </div>
      </div>
    </>
  );
};
