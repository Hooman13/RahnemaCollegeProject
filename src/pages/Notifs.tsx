import { Header } from "../components/Header";
import { ProfileSidebar } from "../components/ProfileSidebar";
import { Link, useParams } from "react-router-dom";
import { MentionCard } from "../components/MentionCard";
import { useState } from "react";
import { useEffect } from "react";
import Cookies from "js-cookie";
import { BaseApi } from "../api/axios";
import { any, object } from "zod";
import { LikeNotifCard } from "../components/LikeNotifCard";
import { AcceptedFollowNotifCard } from "../components/AcceptedFollowNotifCard";
export const Notifs = () => {
  interface IUsers {
    username: string;
    fName: string;
    lName: string;
    imageUrl: string;
  }
  interface IPost {
    postId: string;
    imageUrl: string;
  }
  interface IMention {
    type: string;
    user: IUsers;
    createdAt: string;
    isSeen: boolean;
    post: IPost;
  }
  interface ILike {
    type: string;
    user: IUsers;
    createdAt: string;
    isSeen: boolean;
    post: IPost;
  }
  interface IacceptedFollow {
    type: string;
    user: IUsers;
    createdAt: string;
    isSeen: boolean;
  }
  interface FollowedBy {
    type: string;
    user: IUsers;
    createdAt: string;
    isSeen: boolean;
    followState: string;
  }
  interface IncommingReq {
    type: string;
    user: IUsers;
    createdAt: string;
    isSeen: boolean;
  }
  interface INotif {
    acceptedFollow?: IacceptedFollow;
    like?: ILike;
    mention?: IMention;
    incommingReq?: IncommingReq;
    followedBy?: FollowedBy;
  }
  interface INotifs extends Array<INotif> {}
  const [notifs, setNotifs] = useState<INotifs>([]);
  const token = Cookies.get("token");
  const { username } = useParams();
  const userName = Cookies.get("username");
  const userInfoEndpoint = username ? `${username}` : userName;
  const getNotifs = async () => {
    try {
      const data: any = await BaseApi.get("/dashboard/notif", {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }).then((res) => {
        const userNotifs = res.data.notifs;
        setNotifs((prevState) => ({
          ...prevState,
          ...userNotifs,
        }));
      });
    } catch (error) {
      console.log({ error });
    }
  };

  useEffect(() => {
    getNotifs();
  }, []);

  // swich case
  const notifsType = (notif: any) => {
    {
      switch (notif.type) {
        case "like":
          return (
            <LikeNotifCard
              user={notif.user}
              createdAt={notif.createdAt}
              isSeen={notif.isSeen}
              post={notif.post}
            />
          );
        case "mention":
          return (
            <MentionCard
              user={notif.user}
              createdAt={notif.createdAt}
              isSeen={notif.isSeen}
              post={notif.post}
            />
          );
        case "accepedFollow":
          return (
            <AcceptedFollowNotifCard
              user={notif.user}
              createdAt={notif.createdAt}
              isSeen={notif.isSeen}
            />
          );
        default:
          return null;
      }
    }
  };

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
          <div className="mr-10 grid pt-2 col-span-10 overflow-y-scroll	">
            <h1 className="text-xl font-medium mb-8">اعلانات</h1>
            <div className="text-md font-normal mb-16 justify-start flex">
              <Link to="/my-notifs">
                <button className="text-[#A5A5A5] ml-10">اعلانات من </button>
              </Link>
              |
              <Link to="/friends-notifs">
                <button className="mr-10">اعلانات دوستان من</button>
              </Link>
            </div>
            <div className="overflow-y-scroll">
              {Object.values(notifs).map(function (notif, index) {
                console.log(notif);

                return notifsType(notif);
              })}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
