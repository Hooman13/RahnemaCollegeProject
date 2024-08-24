import {
  faBookmark,
  faHeart,
  faComment,
} from "@fortawesome/free-regular-svg-icons";
import { faPen } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Axios from "axios";
import { Carousel, Badge } from "flowbite-react";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { ToastR } from "./controles/ToastR";

export const DisplayPost: React.FC = () => {
  const { postId } = useParams();

  interface IImage {
    imageId: string;
    url: string;
  }
  interface ICreator {
    username: string;
    imageUrl: string;
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
  });

  const getPostDetails = () => {
    try {
      Axios.get(`http://37.32.5.72:3000/posts/${postId}`).then((res) => {
        const postData = res.data;
        setpost((prev) => ({
          ...prev,
          ...postData,
        }))
      });
    } catch (error) {
      console.log(error);
      <ToastR type="danger"></ToastR>
    }
  };

  useEffect(() => {
    getPostDetails();
  }, []);

  return (
    <>
      <article className="mx-auto w-full max-w-2xl format format-sm sm:format-base lg:format-lg format-blue dark:format-invert">
        <header className="mb-4 lg:mb-6 not-format">
          <address className="flex items-center mb-6 not-italic">
            <div className="grow text-sm text-gray-900 dark:text-white">
              <Link
                to={"/profile/" + post.creator.username}
                rel="author"
                className="flex text-base items-center font-bold text-gray-900 dark:text-white"
              >
                <img
                  className="w-16 h-16 rounded-full ml-3"
                  src="../img/person.png"
                  alt={post.creator.username}
                />
                {post.creator.username}
              </Link>
            </div>
            <button
              type="button"
              className="w-auto py-4 px-2 bg-[#EA5A69] rounded-3xl text-white "
            >
              <FontAwesomeIcon icon={faPen} />
              ویرایش پست
            </button>
          </address>
        </header>

        {post.imageInfos.length && (
          <div className="mb-14 h-56 sm:h-64 xl:h-80 2xl:h-96">
            <Carousel className="rounded-t-lg" dir="ltr">
              {post.imageInfos.map((item, index) => {
                return <img key={index} src="../img/placeholder-image.jpg" alt="image" />;
              })}
            </Carousel>
          </div>
        )}

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
          {post.tags.map((item, index) => {
            return (
              <Badge key={index} size="sm" href="#" color="info">
                {item}
              </Badge>
            );
          })}
        </div>

        <div className="flex flex-row-reverse items-center h-14 pt-4 mb-8 font-medium text-[#EA5A69]">
          <div className="flex-none w-9 gap-2 ">
            <FontAwesomeIcon icon={faBookmark} />
            <div>{post.bookMarkCount}</div>
          </div>
          <div className="flex-none w-9 gap-2">
            <FontAwesomeIcon icon={faHeart} />
            <div>{post.likeCount}</div>
          </div>
          <div className="flex-none w-9 gap-2">
            <FontAwesomeIcon icon={faComment} />
            <div>{post.commentsCount}</div>
          </div>
        </div>
      </article>
    </>
  );
};
