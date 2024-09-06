import { faBookmark, faComment } from "@fortawesome/free-regular-svg-icons";
import { faPen } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { DisplayPostApi } from "../api/axios";
import { Carousel, Badge } from "flowbite-react";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { ToastR } from "./controles/ToastR";
import { PostBookmark } from "./PostBookmark";
import { PostLike } from "./PostLike";
import { Comments } from "./Comments";
import { PostComment } from "./PostComment";
import Cookies from "js-cookie";

interface IProps {
  postId: string;
}
export const DisplayPost: React.FC<IProps> = ({ postId }) => {
  interface IImage {
    imageId: string;
    url: string;
  }
  interface ICreator {
    username: string;
    imageUrl: string;
  }
  interface IMentions {
    postId: string;
    mentionedId: string;
    image: string;
  }
  interface Ipost {
    postId: string;
    caption: string;
    creator: ICreator;
    createdAt: string;
    updatedAt: string;
    tags: string[];
    imageInfos: IImage[];
    likeCount: number;
    commentsCount: number;
    bookMarkCount: number;
    isLiked: boolean;
    mentions: IMentions[];
    isBookMarked: boolean;
  }

  const [post, setpost] = useState<Ipost>({
    postId: "",
    caption: "",
    creator: {
      username: "",
      imageUrl: "",
    },
    createdAt: "",
    updatedAt: "",
    tags: [],
    imageInfos: [],
    likeCount: 0,
    commentsCount: 0,
    bookMarkCount: 0,
    isLiked: false,
    mentions: [],
    isBookMarked: false,
  });
  const token = Cookies.get("token");

  const getPostDetails = () => {
    try {
      DisplayPostApi.get(`/${postId}`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }).then((res) => {
        const postData = res.data;
        setpost((prev) => ({
          ...prev,
          ...postData,
        }));
      });
    } catch (error) {
      console.log(error);
      <ToastR type="danger"></ToastR>;
    }
  };

  useEffect(() => {
    getPostDetails();
  }, []);

  return (
    <>
      <article className="flex flex-row items-start gap-8 mt-8 w-full max-w-2xl format format-sm sm:format-base lg:format-lg format-blue dark:format-invert">
        <div className="basis-1/2">
          {post.imageInfos.length && (
            <div className="mb-14 h-56 sm:h-64 xl:h-80 2xl:h-96 bg-slate-500 rounded-3xl">
              <Carousel className="rounded-t-lg" dir="ltr">
                {post.imageInfos.map((item, index) => {
                  const image =
                    "http://37.32.5.72" + item.url.replace("src", "");

                  return (
                    <img
                      key={index}
                      src={image}
                      alt="image"
                      className="rounded-3xl"
                    />
                  );
                })}
              </Carousel>
            </div>
          )}
        </div>
        <div className="basis-1/2">
          <header className="mb-4 lg:mb-6 not-format">
            <address className="flex items-center mb-6 not-italic">
              <div className="grow text-sm text-gray-900 dark:text-white">
                <Link
                  to={"/profile/" + post.creator.username}
                  rel="author"
                  className="flex text-base items-center font-bold text-gray-900 dark:text-white"
                >
                  <img
                    className="w-12 h-12 rounded-full ml-3"
                    src={
                      post.creator.imageUrl
                        ? process.env.REACT_APP_IMAGE_URL +
                          post.creator.imageUrl
                        : "../img/person.png"
                    }
                    alt={post.creator.username}
                  />
                  {post.creator.username}
                </Link>
              </div>
              {post.creator.username == Cookies.get("username") && (
                <button
                  type="button"
                  className="w-auto py-2 px-4 bg-[#EA5A69] rounded-3xl text-white "
                >
                  <FontAwesomeIcon icon={faPen} className="ml-2" />
                  <span className="font-medium text-sm"></span>
                  ویرایش پست
                </button>
              )}
            </address>
          </header>
          <p
            className="text-xs font-normal
         text-neutral-800 dark:text-gray-400"
          >
            <time title="February 8th, 2022">دو ماه پیش</time>
          </p>
          <p className="text-sm font-normal text-neutral-800 my-4">
            {post.caption}
          </p>
          <div className="flex flex-wrap gap-2">
            {post.mentions.map((item, index) => {
              return (
                <Link to={"/profile/" + item.mentionedId}>
                  <Badge key={index} size="sm" color="info">
                    {item.mentionedId}
                  </Badge>
                </Link>
              );
            })}
          </div>

          <div className="flex flex-row-reverse items-center h-14 pt-4 mb-8 font-medium text-[#EA5A69]">
            <PostBookmark
              postId={postId}
              bookMarkCount={post.bookMarkCount}
              isBookMarked={post.isBookMarked}
              type="post"
            />
            <PostLike
              postId={postId}
              likeCount={post.likeCount}
              isLiked={post.isLiked}
              type="post"
            />
            <PostComment
              postId={postId}
              commentCount={post.commentsCount}
              type="post"
            />
          </div>
          <Comments postId={postId} />
        </div>
      </article>
    </>
  );
};
