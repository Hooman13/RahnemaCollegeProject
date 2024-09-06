import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Header } from "../components/Header";
import { ProfileSidebar } from "../components/ProfileSidebar";
import { DisplayPost } from "../components/DisplayPost";
import { useParams } from "react-router-dom";

export const PostPage = () => {
  const { postId } = useParams();
  return (
    <>
      <div className="w-screen min-h-screen  overflow-y-hidden px-7 bg-[#F5F5F5]">
        {/* header */}
        <Header />
        {/* main */}
        <div className="grid mt-16 overflow-y-hidden grid-cols-12">
          {/* sideBar */}
          <div className="col-span-2 pt-2">
            <ProfileSidebar />
          </div>
          <div className="mr-10 grid pt-2 col-span-10 overflow-y-scroll">
            {postId && <DisplayPost postId={postId} />}
          </div>
        </div>
      </div>
    </>
  );
};
