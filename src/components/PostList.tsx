import { PropsWithChildren, useEffect, useState } from "react";
import { PostItem } from "./PostItem";
import { PostListApi } from "../api/axios";
import { useQuery } from "@tanstack/react-query";
import { ToastR } from "./controles/ToastR";
import { env } from "process";
import Cookies from "js-cookie";
interface IPostListProps {
  username: string | undefined;
}
export const PostsList: React.FC<PropsWithChildren<IPostListProps>> = ({
  username,
  children,
}) => {
  const token = Cookies.get("token");
  const getUserPosts = () => {
    return PostListApi.get(`${username}`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    }).then((res) => {
      return res.data.posts;
    });
  };

  const { data, isLoading, isError, error } = useQuery({
    queryKey: [`userPostList-${username}`],
    queryFn: getUserPosts,
  });

  useEffect(() => {
    if (username) {
      getUserPosts();
    }
  }, [username]);

  const skeletonArray = new Array(9).fill("");
  if (isLoading) {
    return (
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        {skeletonArray.map((item, index) => {
          return (
            <div
              key={index}
              role="status"
              className="space-y-8 animate-pulse md:space-y-0 md:space-x-8 rtl:space-x-reverse md:flex md:items-center"
            >
              <div className="flex items-center justify-center w-full h-36 bg-gray-300 rounded sm:w-96 dark:bg-gray-700">
                <svg
                  className="w-10 h-10 text-gray-200 dark:text-gray-600"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  viewBox="0 0 20 18"
                >
                  <path d="M18 0H2a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2Zm-5.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Zm4.376 10.481A1 1 0 0 1 16 15H4a1 1 0 0 1-.895-1.447l3.5-7A1 1 0 0 1 7.468 6a.965.965 0 0 1 .9.5l2.775 4.757 1.546-1.887a1 1 0 0 1 1.618.1l2.541 4a1 1 0 0 1 .028 1.011Z" />
                </svg>
              </div>

              <span className="sr-only">Loading...</span>
            </div>
          );
        })}
      </div>
    );
  }

  if (isError) {
    {
      <ToastR type="danger">خطا در دریافت پست ها</ToastR>;
    }
    return <h1>خطا:{error.message}</h1>;
  }
  return (
    <>
      {data?.length ? (
        <div className="grid grid-cols-2 md:grid-cols-3 gap-5 px-2">
          {data.map(function (item: any, index: any) {
            return (
              <PostItem
                id={item.postId}
                imgUrl={process.env.REACT_APP_IMAGE_URL + item.imageInfo.url}
                key={index}
              ></PostItem>
            );
          })}
        </div>
      ) : (
        <div className="mt-8 bg-inherit h-full border border-[#CDCDCD] rounded-3xl">
          <div className="flex flex-row min-h-screen justify-center items-center">
            هنوز هیچ پستی توی صفحه‌ات نذاشتی! بجنب تا دیر نشده
          </div>
        </div>
      )}
    </>
  );
};
