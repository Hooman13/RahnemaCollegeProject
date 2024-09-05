import { useEffect, useState } from "react";
import { PostListApi } from "../api/axios";
import { useQuery } from "@tanstack/react-query";
import { ToastR } from "./controles/ToastR";
import { ExploreItem } from "./ExploreItem";
import { ExploreItemSkeleton } from "./ExploreItemSkeleton";

export const ExploreList = () => {
  const posts = [
    {
      postId: "1c191f39-9a98-4c71-aacb-216a0f08398a",
      creator: {
        imageUrl: "/images/4fa0a26a-0347-481d-b710-4fbae56c7d9a.jpeg",
        username: "mostafa11",
        fullname: "مصطفی حسینی",
        followersCount: 12,
      },
      postImage: "/images/539001e7-8a8b-4c3b-b99f-91b9cea6c5db.jpeg",
      commentCount: 23,
      isLiked: true,
      likeCount: 12,
      isBookmarked: false,
      bookmarkCount: 32,
    },
    {
      postId: "1c191f39-9a98-4c71-aacb-216a0f08398a",
      creator: {
        imageUrl: "/images/4fa0a26a-0347-481d-b710-4fbae56c7d9a.jpeg",
        username: "mostafa11",
        fullname: "مصطفی حسینی",
        followersCount: 12,
      },
      postImage: "/images/539001e7-8a8b-4c3b-b99f-91b9cea6c5db.jpeg",
      commentCount: 23,
      isLiked: true,
      likeCount: 12,
      isBookmarked: false,
      bookmarkCount: 32,
    },
    {
      postId: "1c191f39-9a98-4c71-aacb-216a0f08398a",
      creator: {
        imageUrl: "/images/4fa0a26a-0347-481d-b710-4fbae56c7d9a.jpeg",
        username: "mostafa11",
        fullname: "مصطفی حسینی",
        followersCount: 12,
      },
      postImage: "/images/539001e7-8a8b-4c3b-b99f-91b9cea6c5db.jpeg",
      commentCount: 23,
      isLiked: true,
      likeCount: 12,
      isBookmarked: false,
      bookmarkCount: 32,
    },
  ];
  const getPosts = () => {
    return PostListApi.get(`mostafa`).then((res) => {
      return posts;
    });
  };
  const { data, isLoading, isError, error } = useQuery({
    queryKey: [`explore-`],
    queryFn: getPosts,
  });

  //   useEffect(() => {
  //     if (username) {
  //         getPosts();
  //     }
  //   }, [username]);

  const followingsCount = 2;
  const skeletonArray = new Array(9).fill("");
  if (isLoading) {
    return (
      <div className="grid grid-cols-2 md:grid-cols-3 gap-5 px-2">
        {skeletonArray.map((item, index) => {
          return (
            <ExploreItemSkeleton key={index}/>
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

  if (!followingsCount)
    return (
      <div className="flex-row items-end text-center">
        <div className="mb-8 text-4xl font-bold">
          سلام به کالج‌گرام خوش اومدی!
        </div>
        <div className="text-xl font-base mb-8">
          برای دیدن پست‌ها در این صفحه باید کالج‌گرامی‌ها رو دنبال کنی.
          آماده‌ای؟
        </div>
        <div className="flex justify-center">
          <button
            className="text-center flex border-solid text-white rounded-3xl bg-[#EA5A69] h-7 text-xs font-semibold justify-center items-center py-[16px] px-8"
            type={"submit"}
          >
            جستجوی کالج‌گرامی‌ها
          </button>
        </div>
      </div>
    );

  return (
    <>
      {data?.length ? (
        <div className="grid grid-cols-2 md:grid-cols-3 gap-5 px-2">
          {data.map(function (item: any, index: any) {
            return (
              <ExploreItem
                postId={item.postId}
                postImage={process.env.REACT_APP_IMAGE_URL + item.postImage}
                key={index}
                userAvatar={item.creator.imageUrl}
                userName={item.creator.username}
                userFName={item.creator.fullname}
                bookmarkCount={item.bookmarkCount}
                commentCount={item.commentCount}
                isBookmarked={item.isBookmarked}
                isLiked={item.isLiked}
                likeCount={item.likeCount}
                userFollowersCount={item.userFollowersCount}
              ></ExploreItem>
            );
          })}
        </div>
      ) : (
        <div className="mt-8 bg-inherit h-full border border-[#CDCDCD] rounded-3xl">
          <div className="flex flex-row min-h-screen justify-center items-center">
            پستی برای نمایش وجود ندارد
          </div>
        </div>
      )}
    </>
  );
};
