import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import Cookies from "js-cookie";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faThumbTack,
  faBookmark,
  faCommentDots,
  faBell,
  faTag,
  faMagnifyingGlass,
  faGripVertical,
  faCirclePlus,
  faCamera,
} from "@fortawesome/free-solid-svg-icons";

const FormSchema = z.object({
  images: z.string().optional(),
  mention: z.string().optional(),
  caption: z.string().optional(),
});
type FormData = z.infer<typeof FormSchema>;
export const CreatePost = () => {
  const [showAddPhoto, setShowAddPhoto] = useState(true);
  const [showCaptionPage, setShowCaptionPage] = useState(true);
  const [showSendPost, setShowSendPost] = useState(true);
  const [file, setFile] = useState<File | undefined>();
  const token = Cookies.get("token");
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(FormSchema),
  });

  const onSubmit = (data: FormData) => {
    console.log(data);
    console.log(file);
    if (typeof file === undefined) return;
    const formData = new FormData();
    // formData.append("file", file);

    // axios
    //   .post("http://37.32.5.72:3000/", JSON.stringify(data), {
    //     headers: {
    //       "Content-Type": "application/json",
    //       Authorization: `Bearer ${token}`,
    //     },
    //   })
    //   .then((response) => {
    //     // if (response.status === 200) {
    //     //   handlecaptionSent();
    //     // }
    //   })
    //   .catch((err) => console.log(err));
  };

  const [formInput, setFormInput] = useState({
    images: "",
    caption: "",
    mention: ["", ","],
  });

  const handleUserInput = (name: string, value?: string) => {
    setFormInput({
      ...formInput,
      [name]: value,
    });
  };

  // AddPhoto logic
  // const fileSelectedHandler = (event: React.SyntheticEvent) => {
  //   console.log(event.target.image.value);
  // };

  const handleOnChangePhoto = (e: React.FormEvent<HTMLInputElement>) => {
    const target = e.target as HTMLInputElement & {
      files: FileList;
    };
    console.log("target", target.files);
    setFile(target.files[0]);
  };
  return (
    <>
      <section>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div
            className="frame5 w-screen h-screen bg-no-repeat bg-center bg-cover flex justify-center items-center"
            style={{ backgroundImage: "url(./img/login-background.png)" }}
          >
            <div className="bg-white w-screen md:w-[485px] h-screen md:h-auto  py-16 shadow-lg rounded-3xl mt-3 px-20 ">
              <div>
                {/* addphoto page start */}
                {showAddPhoto && (
                  <div>
                    {/* The Graph */}
                    <div className="flex-row flex justify-evenly px-4 py-6 ">
                      <div className="grid grid-rows-2 justify-items-center">
                        <div className=" border justify-items-center justify-center items-center  border-[#6F6F6F] rounded-full w-4 h-4">
                          {/* <div className="flex items-center justify-center border m-auto   border-black rounded-full w-1 h-1 bg-black"></div> */}
                        </div>
                        <p className="grid text-[#6F6F6F] row-span-1 text-[10px] mt-1">
                          تنظیمات
                        </p>
                      </div>
                      <div className="grid grid-rows-2 justify-items-center">
                        <div className=" border justify-items-center justify-center items-center   border-[#6F6F6F] rounded-full w-4 h-4">
                          {/* <div className="flex items-center justify-center border m-auto   border-black rounded-full w-1 h-1 bg-black"></div> */}
                        </div>
                        <p className="grid text-[#6F6F6F] row-span-1 text-[10px] mt-1">
                          متن
                        </p>
                      </div>
                      <div className="grid grid-rows-2 justify-items-center">
                        <div className="flex border justify-items-center justify-center items-center  border-black rounded-full w-4 h-4">
                          <div className="flex items-center justify-center border m-auto   border-black rounded-full w-1 h-1 bg-black"></div>
                        </div>
                        <p className="grid row-span-1 text-[10px] mt-1">عکس</p>
                      </div>
                    </div>
                    {/* main */}
                    <div className="text-center mt-8 text-base font-normal mb-8">
                      <p>عکس‌های مورد نظرت رو آپلود کن:</p>
                    </div>
                    <div className="flex justify-center mb-8">
                      <div className="flex relative items-center justify-center  rounded-full w-[90px] h-[90px] border-[#F7901E] border-2">
                        <div className="m-auto relative   ">
                          <FontAwesomeIcon
                            className="w-9 h-9"
                            icon={faCamera}
                            style={{ color: "#F7901E" }}
                          />
                          <input
                            type="file"
                            onChange={handleOnChangePhoto}
                            className="absolute top-0 right-0 left-0 bottom-0 opacity-0 cursor-pointer "
                          />
                        </div>
                        <div>
                          <FontAwesomeIcon
                            className="absolute top-[21px] right-[54px]"
                            icon={faCirclePlus}
                            style={{ color: "#F7901E" }}
                          />
                        </div>
                      </div>
                    </div>
                    {/* buttons */}
                    <div className="flex items-center justify-end text-sm">
                      <div className="flex pl-5">
                        <Link to="/login">
                          <button>پشیمون شدم</button>
                        </Link>
                      </div>
                      <div className="text-white text-center mr-1 flex border-solid rounded-2xl bg-[#EA5A69] w-[62px] h-[36px] text-sm justify-center items-center px-[8px] py-[16px] ">
                        <button onClick={() => setShowAddPhoto(!showAddPhoto)}>
                          بعدی
                        </button>
                      </div>
                    </div>
                    {/* addphoto page end */}
                  </div>
                )}
                {/* caption page start */}
                {showCaptionPage && (
                  <div>
                    {/* The Graph */}
                    <div className="flex-row flex justify-evenly px-4 py-6 ">
                      <div className="grid grid-rows-2 justify-items-center">
                        <div className=" border justify-items-center justify-center items-center  border-[#6F6F6F] rounded-full w-4 h-4">
                          {/* <div className="flex items-center justify-center border m-auto   border-black rounded-full w-1 h-1 bg-black"></div> */}
                        </div>
                        <p className="grid text-[#6F6F6F] row-span-1 text-[10px] mt-1">
                          تنظیمات
                        </p>
                      </div>
                      <div className="grid grid-rows-2 justify-items-center">
                        <div className="flex border justify-items-center justify-center items-center  border-black rounded-full w-4 h-4">
                          <div className="flex items-center justify-center border m-auto   border-black rounded-full w-1 h-1 bg-black"></div>
                        </div>
                        <p className="grid row-span-1 text-[10px] mt-1">متن</p>
                      </div>
                      <div className="grid grid-rows-2 justify-items-center">
                        <div className=" border justify-items-center justify-center items-center   border-[#6F6F6F] rounded-full w-4 h-4">
                          {/* <div className="flex items-center justify-center border m-auto   border-black rounded-full w-1 h-1 bg-black"></div> */}
                        </div>
                        <p className="grid text-[#6F6F6F] row-span-1 text-[10px] mt-1">
                          عکس
                        </p>
                      </div>
                    </div>
                    {/* main */}
                    <div className="text-center mt-8 text-base font-normal mb-8">
                      <p>کپشن مورد نظرت رو بنویس:</p>
                    </div>
                    <div className="flex justify-center mb-8">
                      <div className="text-right text-sm font-bold mb-6 ">
                        <p className="text-[#191919] pb-2">کپشن</p>
                        <input
                          className="w-[320px] h-[88px] border solid border-[#17494D]/50 rounded-xl"
                          type="text"
                          {...register("caption")}
                          value={formInput.caption}
                          onChange={({ target }) => {
                            handleUserInput(target.name, target.value);
                          }}
                        />
                      </div>
                    </div>
                    {/* buttons */}
                    <div className="flex items-center justify-end text-sm">
                      <div className="flex pl-5">
                        <Link to="/">
                          <button>پشیمون شدم</button>
                        </Link>
                      </div>
                      <div className="text-white text-center mr-1 flex border-solid rounded-2xl bg-[#EA5A69] w-[62px] h-[36px] text-sm justify-center items-center px-[8px] py-[16px] ">
                        <button
                          onClick={() => setShowCaptionPage(!showCaptionPage)}
                        >
                          بعدی
                        </button>
                      </div>
                    </div>
                    {/* caption page end */}
                  </div>
                )}
                {/* sendpost start */}
                {showSendPost && (
                  <div>
                    {/* The Graph */}
                    <div className="flex-row flex justify-evenly px-4 py-6 ">
                      <div className="grid grid-rows-2 justify-items-center">
                        <div className="flex border justify-items-center justify-center items-center  border-black rounded-full w-4 h-4">
                          <div className="flex items-center justify-center border m-auto   border-black rounded-full w-1 h-1 bg-black"></div>
                        </div>
                        <p className="grid row-span-1 text-[10px] mt-1">
                          تنظیمات
                        </p>
                      </div>
                      <div className="grid grid-rows-2 justify-items-center">
                        <div className=" border justify-items-center justify-center items-center  border-[#6F6F6F] rounded-full w-4 h-4">
                          {/* <div className="flex items-center justify-center border m-auto   border-black rounded-full w-1 h-1 bg-black"></div> */}
                        </div>
                        <p className="grid text-[#6F6F6F] row-span-1 text-[10px] mt-1">
                          متن
                        </p>
                      </div>
                      <div className="grid grid-rows-2 justify-items-center">
                        <div className=" border justify-items-center justify-center items-center   border-[#6F6F6F] rounded-full w-4 h-4">
                          {/* <div className="flex items-center justify-center border m-auto   border-black rounded-full w-1 h-1 bg-black"></div> */}
                        </div>
                        <p className="grid text-[#6F6F6F] row-span-1 text-[10px] mt-1">
                          عکس
                        </p>
                      </div>
                    </div>
                    {/* main */}
                    <div className="text-center mt-8 text-base font-normal mb-8">
                      <p>اینجا می‌تونی دوستانت رو منشن کنی:</p>
                    </div>
                    <div className="flex justify-center mb-8">
                      <div className="text-right text-sm font-bold mb-6 ">
                        <input
                          className="w-[320px] h-[32px] border solid border-[#17494D]/50 rounded-xl"
                          type="text"
                          {...register("mention")}
                          value={formInput.mention}
                          onChange={({ target }) => {
                            handleUserInput(target.name, target.value);
                          }}
                        />
                      </div>
                    </div>
                    {/* buttons */}
                    <div className="flex items-center justify-end text-sm">
                      <div className="flex pl-5">
                        <Link to="/">
                          <button>پشیمون شدم</button>
                        </Link>
                      </div>
                      <div className="text-white text-center mr-1 flex border-solid rounded-2xl bg-[#EA5A69] w-[137px] h-[36px] text-sm justify-center items-center px-[8px] py-[16px] ">
                        <button
                          // onClick={() => setShowSendPost(!showSendPost)}
                          type={"submit"}
                        >
                          ثبت و انتشار پست
                        </button>
                      </div>
                    </div>
                  </div>
                )}
                {/* sendpost end */}
              </div>
            </div>
          </div>
        </form>
      </section>
    </>
  );
};
