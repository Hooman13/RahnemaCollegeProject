import { ProfileSidebar } from "../components/ProfileSidebar";
import { Header } from "../components/Header";
import { ExploreList } from "../components/ExploreList";
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
          
          <div className="mt-8 bg-inherit h-full border border-[#CDCDCD] rounded-3xl">
            <div className="flex  min-h-screen justify-center items-center">
                <ExploreList/>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
