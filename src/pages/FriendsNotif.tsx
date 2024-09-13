import { Link, useParams } from "react-router-dom";
import { useState } from "react";
import { useEffect } from "react";
import Cookies from "js-cookie";
import { BaseApi } from "../api/axios";
import { FLikeNotifCard } from "../components/cards/FLikeNotifCard";
import { CommentNotifCard } from "../components/cards/CommentNotifCard";
import { PagesLayout } from "./PagesLayout";
import { FreindFoCard } from "../components/cards/FreindFoCard";
export const FriendsNotif = () => {
  interface IUsers {
    username: string;
    fName: string;
    lName: string;
    imageUrl: string;
  }
  interface FUser {
    username: string;
    fName: string;
    lName: string;
  }
  interface IPost {
    postId: string;
    imageUrl: string;
    CommentContent: string;
  }
  interface IComment {
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
    postId: string;
  }
  interface IFollow {
    type: string;
    user: IUsers;
    friendUser: FUser;
    followState: string;
    createdAt: string;
    isSeen: boolean;
  }

  interface INotif {
    follow?: IFollow;
    like?: ILike;
    comment?: IComment;
  }
  interface INotifs extends Array<INotif> {}
  const [notifs, setNotifs] = useState<INotifs>([]);
  const token = Cookies.get("token");
  const { username } = useParams();
  const userName = Cookies.get("username");
  const userInfoEndpoint = username ? `${username}` : userName;
  const getNotifs = async () => {
    try {
      const data: any = await BaseApi.get("/dashboard/friend-notif", {
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
            <FLikeNotifCard
              user={notif.user}
              createdAt={notif.createdAt}
              isSeen={notif.isSeen}
              postId={notif.postId}
            />
          );
        case "follow":
          return (
            <FreindFoCard
              user={notif.user}
              createdAt={notif.createdAt}
              isSeen={notif.isSeen}
              friendUser={notif.friendUser}
              followState={notif.followState}
            />
          );
        case "comment":
          return (
            <CommentNotifCard
              user={notif.user}
              createdAt={notif.createdAt}
              isSeen={notif.isSeen}
              post={notif.post}
            />
          );
        default:
          return null;
      }
    }
  };

  return (
    <PagesLayout>
      <p className="text-xl font-semibold mb-3">اعلانات</p>
      <div className="w-full bg-inherit flex flex-col justify-center">
        <div className="text-md font-normal mb-16 justify-start flex">
          <Link to="/notifs">
            <button className="text-[#A5A5A5] ml-10">اعلانات من </button>
          </Link>
          |
          <Link to="/friends-notifs">
            <button className=" mr-10">اعلانات دوستان من</button>
          </Link>
        </div>
      </div>
      <div className="overflow-y-scroll">
        {Object.values(notifs).map(function (notif) {
          return notifsType(notif);
        })}
      </div>
    </PagesLayout>
  );
};
