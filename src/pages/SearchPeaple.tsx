import { BaseApi } from "../api/axios";
import { useQuery } from "@tanstack/react-query";
import Cookies from "js-cookie";
import { ExploreItemSkeleton } from "../components/ExploreItemSkeleton";
import { ToastR } from "../components/controles/ToastR";
import { ExploreItem } from "../components/ExploreItem";
import { PeopleSkeleton } from "../components/PeopleSkeleton";
import { UserCard } from "../components/cards/UserCard";

export const SearchPeaple = () => {
  const token = Cookies.get("token");
  const getPosts = () => {
    return BaseApi.get("/dashboard/explosre", {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    }).then((res) => {
      return res.data;
    });
  };
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["explore"],
    queryFn: getPosts,
  });

  const skeletonArray = new Array(9).fill("");
  if (isLoading) {
    return (
      <div className="grid grid-cols-2 md:grid-cols-3 gap-5 px-2">
        {skeletonArray.map((item, index) => {
          return <PeopleSkeleton key={index} />;
        })}
      </div>
    );
  }

  if (isError) {
    {
      <ToastR type="danger">خطا در دریافت </ToastR>;
    }
    return <h1>خطا:{error.message}</h1>;
  }

  //   if (data.length == 0)
  //     return (
  //       <div className="flex-row items-end text-center">
  //         <div className="mb-8 text-4xl font-bold">
  //           سلام به کالج‌گرام خوش اومدی!
  //         </div>
  //         <div className="text-xl font-base mb-8">
  //           برای دیدن پست‌ها در این صفحه باید کالج‌گرامی‌ها رو دنبال کنی.
  //           آماده‌ای؟
  //         </div>
  //         <div className="flex justify-center">
  //           <button
  //             className="text-center flex border-solid text-white rounded-3xl bg-[#EA5A69] h-7 text-xs font-semibold justify-center items-center py-[16px] px-8"
  //             type={"submit"}
  //           >
  //             جستجوی کالج‌گرامی‌ها
  //           </button>
  //         </div>
  //       </div>
  //     );

  return (
    <>
      {data?.length ? (
        <div className="grid grid-cols-2 md:grid-cols-3 gap-5 px-2">
          {/* {data.map(function (item: any, index: any) {
            return (
              // <UserCard
              //  username={data.username},
              // imageUrl,
              // fName,
              // lName,
              // followersCount,
              // relationState,
              // />
            );
          })} */}
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
