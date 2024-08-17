import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCirclePlus } from "@fortawesome/free-solid-svg-icons";
import { ProfileSidebar } from "../components/ProfileSidebar";

import { z } from "zod";
import Cookies from "js-cookie";
import React, { useState } from "react";
import { useForm } from "react-hook-form";

import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { Link } from "react-router-dom";
import styles from "./Profile.module.css";
import { useNavigate } from "react-router-dom";

const FormSchema = z.object({
  username: z.string(),
});
type IFormInput = z.infer<typeof FormSchema>;
export const Search = () => {
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
      .put("http://37.32.5.72:3000/", JSON.stringify(data), {
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
    username: "",
  });

  const handleUserInput = (name: string, value?: string) => {
    setFormInput({
      ...formInput,
      [name]: value,
    });
  };

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="w-screen h-full pt-16 px-16 bg-[#F5F5F5]">
          {/* header */}
          <div className="grid grid-cols-12 mb-4">
            <div className="grid col-span-3 py-4 justify-items-center	">
              <button
                type="submit"
                // onClick={getProfileData}
                className="w-[232px] py-4 px-2 bg-[#EA5A69] rounded-3xl text-white"
              >
                <FontAwesomeIcon className="ml-2" icon={faCirclePlus} />
                ایجاد پست جدید
              </button>
            </div>
            <div className=" col-span-9 flex justify-end">
              <img src="./img/logo.png" alt="" />
            </div>
          </div>
          {/* main */}
          <div className="grid grid-cols-12">
            {/* sideBar */}
            <ProfileSidebar />
            <div className="mr-16 grid col-span-9">
              جستجو
              <input
                type="text"
                {...register("username")}
                value={formInput.username}
                onChange={({ target }) => {
                  handleUserInput(target.name, target.value);
                }}
              />
              <button>search</button>
            </div>
          </div>
        </div>
      </form>
    </>
  );
};
