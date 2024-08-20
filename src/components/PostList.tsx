import { useEffect, useState } from "react";
import { PostItem } from "./PostItem";
import Axios from "axios";

export const PostsList = () => {
  interface IPost {
    id: string;
    caption: string;
    imgUrl: string; //first image only
  }

  type posts = IPost[];
  const [posts, setPosts] = useState<posts>();

  useEffect(() => {
    //Acios get posts
    // Axios.get()
  }, []);
  const p: posts = [
    {
      id: "1",
      caption: "یک روز در جنگل",
      imgUrl: "./img/post-images/n1.jpg",
    },
    {
      id: "2",
      caption: "جاده چالوس نیست!",
      imgUrl: "./img/post-images/n2.jpg", //first image only
    },
    {
      id: "3",
      caption: "چه خبرتونه!",
      imgUrl: "./img/post-images/n3.jpg", //first image only
    },
    {
      id: "4",
      caption: "بنفشه ...",
      imgUrl: "./img/post-images/n4.jpg",
    },
    {
      id: "5",
      caption: "ویوو ره ره ! آدم دلش میخواد زوزه بکشه ",
      imgUrl: "./img/post-images/n5.jpg", //first image only
    },
    {
      id: "6",
      caption: "خاطرات شمال محاله یادم بره",
      imgUrl: "./img/post-images/n6.jpg", //first image only
    },
  ];

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
      {p.map(function (item, index) {
        return (
          <PostItem
            id={item.id}
            caption={item.caption}
            imgUrl={item.imgUrl}
            key={index}
          ></PostItem>
        );
      })}
    </div>
  );
};
