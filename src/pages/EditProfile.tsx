import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { Link } from "react-router-dom";
import styles from "./Profile.module.css";
import { useNavigate } from "react-router-dom";
import { Button, Modal } from "flowbite-react";

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
} from "@fortawesome/free-solid-svg-icons";
import { MyPage } from "../components/MyPage";
import { useEffect } from "react";
import Cookies from "js-cookie";
import { boolean, string } from "zod";

const FormSchema = z.object({
  isPrivate: z.boolean(),
  bio: z.string().optional(),
  fName: z.string().optional(),
  lName: z.string().optional(),
  email: z.string().email("Invalid email.").optional(),
  password: z
    .string()
    .min(8, "Password must not be lesser than 8 characters")
    .optional(),
  confirmPassword: z.string().min(8).optional(),
});

type IFormInput = z.infer<typeof FormSchema>;
interface IProps {
  openModal: boolean;
  setOpenModal: React.Dispatch<React.SetStateAction<boolean>>;
}
export const EditProfile: React.FC<IProps> = ({ openModal, setOpenModal }) => {
  // update profile edits
  const token = Cookies.get("token");
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IFormInput>({
    resolver: zodResolver(FormSchema),
  });

  const navigate = useNavigate();
  const handleProfileEdited = () => {
    navigate("/");
  };

  const onSubmit = (data: IFormInput) => {
    // console.log(data);
    axios
      .put("http://37.32.5.72:3000/edit-profile", JSON.stringify(data), {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        if (response.status === 200) {
          handleProfileEdited();
        }
      })
      .catch((err) => console.log(err));
  };

  const [formInput, setFormInput] = useState({
    bio: "",
    email: "",
    fName: "",
    imageUrl: "",
    isPrivate: false,
    lName: "",
    username: "",
    password: "",
    confirmPassword: "",
  });
  const [formError, setFormError] = useState({
    confirmPassword: "",
  });
  const handleUserInput = (name: string, value?: string) => {
    setFormInput({
      ...formInput,
      [name]: value,
    });
  };

  const validatePassInputs = (e: any) => {
    e.preventDefault();
    let formError = {
      confirmPassword: "",
    };
    if (formInput.confirmPassword !== formInput.password) {
      setFormError({
        ...formError,
        confirmPassword: "تکرار رمزعبور با رمزعبور یکسان نیست",
      });
      return;
    }
    setFormError(formError);
    setFormInput((prev) => ({
      ...prev,
    }));
  };

  // use last update for fields

  // const [user, setUser] = useState({
  //   data: {
  //     bio: "",
  //     email: "",
  //     fName: "",
  //     imageUrl: "",
  //     isPrivate: boolean,
  //     lName: "",
  //     username: "",
  //   },
  // });
  // const [isUserUpdated, setIsUserUpdated] = useState(false);
  // const token = Cookies.get("token");
  // const getProfileData = async () => {
  //   try {
  //     const data: any = await axios.get(
  //       "http://37.32.5.72:3000/auth/user-info",
  //       {
  //         headers: {
  //           "Content-Type": "application/json",
  //           Authorization: `Bearer ${token}`,
  //         },
  //       }
  //     );
  //     setUser(data);
  //     setIsUserUpdated(false);
  //   } catch (error) {
  //     console.log({ error });
  //   }
  // };
  // //
  // useEffect(() => {
  //   getProfileData();
  // }, [token, isUserUpdated]);
  // // console.log(user.data.username);
  // // console.log(user.data.email);
  // // console.log(user);

  return (
    <>
      <Modal show={openModal} onClose={() => setOpenModal(false)}>
        <Modal.Body className="bg-white flex items-center justify-end w-[485px] h-screen md:h-auto rounded-3xl mt-3  ">
          <form className="items-center" onSubmit={handleSubmit(onSubmit)}>
            <section>
              {/* <div className="bg-white w-screen md:w-[485px] h-screen md:h-auto  py-16 shadow-lg rounded-3xl mt-3 px-20 "> */}
              <div className="text-center text-xl justify-center font-bold mb-8">
                ویرایش حساب
              </div>
              <div className="flex justify-center mb-2">
                <img
                  className="border rounded-full  w-[90px] h-[90px] justify-center"
                  src="./img/avatar.png"
                  alt=""
                />
              </div>
              <div className="flex justify-center mb-12">
                <p className="text-sm font-medium">عکس پروفایل</p>
              </div>
              <div className="font-normal text-xs mt-6">
                <div className="mb-6">
                  <input
                    type="text"
                    {...register("fName")}
                    value={formInput.fName}
                    onChange={({ target }) => {
                      handleUserInput(target.name, target.value);
                    }}
                    // value={user.data.fName}
                    placeholder="نام"
                    className="border h-9 rounded-2xl w-full text-right px-2 py-1 focus:outline-none focus:ring-0 focus:border-gray-600"
                  />
                  {errors?.fName?.message && (
                    <p className="text-red-700">{errors.fName.message}</p>
                  )}
                </div>
                <div className="mb-6">
                  <input
                    type="text"
                    {...register("lName")}
                    value={formInput.lName}
                    onChange={({ target }) => {
                      handleUserInput(target.name, target.value);
                    }}
                    // value={user.data.lName}
                    placeholder="نام خانوادگی"
                    className="border h-9 text-right rounded-2xl w-full px-2 py-1 focus:outline-none focus:ring-0 focus:border-gray-600"
                  />
                  {errors?.lName?.message && (
                    <p className="text-red-700">{errors.lName.message}</p>
                  )}
                </div>
                <div className="mb-6">
                  <input
                    type="text"
                    {...register("email")}
                    value={formInput.email}
                    onChange={({ target }) => {
                      handleUserInput(target.name, target.value);
                    }}
                    // value={user.data.email}
                    placeholder="ایمیل"
                    className="border h-9 text-right rounded-2xl w-full px-2 py-1 focus:outline-none focus:ring-0 focus:border-gray-600"
                  />
                  {errors?.email?.message && (
                    <p className="text-red-700">{errors.email.message}</p>
                  )}
                </div>
                <div className="mb-6">
                  <input
                    type="password"
                    {...register("password")}
                    value={formInput.password}
                    placeholder="رمز عبور جدید"
                    onChange={({ target }) => {
                      handleUserInput(target.name, target.value);
                    }}
                    className="border h-9 text-right rounded-2xl w-full px-2 py-1 focus:outline-none focus:ring-0 focus:border-gray-600"
                  />
                  {errors?.password?.message && (
                    <p className="text-red-700">{errors.password.message}</p>
                  )}
                </div>
                <div className="mb-6">
                  <input
                    type="password"
                    {...register("confirmPassword")}
                    value={formInput.confirmPassword}
                    onChange={({ target }) => {
                      handleUserInput(target.name, target.value);
                    }}
                    onKeyUp={validatePassInputs}
                    placeholder="تکرار رمز عبور"
                    className="border h-9 text-right rounded-2xl w-full px-2 py-1 focus:outline-none focus:ring-0 focus:border-gray-600"
                  />
                  <p className="text-red-700">{formError.confirmPassword}</p>
                </div>
              </div>
              <div>
                <label className="flex justify-start items-center mb-6  text-sm   cursor-pointer">
                  <span className="ms-3 text-sm ml-2 font-medium ">
                    پیچ خصوصی باشه
                  </span>
                  <input
                    type="checkbox"
                    {...register("isPrivate")}
                    value=""
                    className="sr-only peer"
                  />

                  <div className="relative w-11 h-6 bg-gray-200 border-[0.5px] peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-white dark:peer-focus:ring-white rounded-full peer dark:bg-white peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
                </label>
              </div>
              <div className="text-right text-base mb-6 ">
                <p className="text-[#17494D] pb-2">بایو</p>
                <input
                  className="w-[320px] h-[88px] border solid border-[#17494D]/50 rounded-xl"
                  type="text"
                  {...register("bio")}
                  value={formInput.bio}
                  onChange={({ target }) => {
                    handleUserInput(target.name, target.value);
                  }}
                  // value={user.data.bio}
                />
              </div>
              <div className="flex items-center justify-end text-sm text-center">
                <div className="text-center mr-1 flex border-solid  text-white rounded-2xl bg-[#EA5A69] w-[102px] h-[36px] text-sm justify-center items-center px-[8px] py-[16px] ">
                  <button type={"submit"}>ثبت تغییرات</button>
                </div>
                <div className="pr-5">
                  <Link to="/">
                    <button onClick={() => setOpenModal(false)}>
                      پشیمون شدم
                    </button>
                  </Link>
                </div>
              </div>
              {/* </div> */}
            </section>
          </form>
        </Modal.Body>
      </Modal>
    </>
  );
};
