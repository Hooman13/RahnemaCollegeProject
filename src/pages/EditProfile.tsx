import { Link } from "react-router-dom";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";

const FormSchema = z.object({
  isPrivate: z.boolean(),
  bio: z.string().optional(),
  fName: z.string().optional(),
  lName: z.string().optional(),
  email: z.string().email("Invalid email."),
  password: z
    .string()
    .min(8, "Password must not be lesser than 8 characters")
    .optional(),
  confirmPassword: z.string().min(8).optional(),
});

type IFormInput = z.infer<typeof FormSchema>;

export const EditProfile = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IFormInput>({
    resolver: zodResolver(FormSchema),
  });

  const onSubmit = (data: IFormInput) => {
    // console.log(data);
    axios
      .post("http://37.32.5.72:3000/edit-profile", JSON.stringify(data), {
        headers: { "Content-Type": "application/json" },
      })
      .then((response) => console.log(response))
      .catch((err) => console.log(err));
  };

  const [formInput, setFormInput] = useState({
    password: "",
    confirmPassword: "",
  });
  const [formError, setFormError] = useState({
    confirmPassword: "",
  });
  const handleUserInput = (name: string, value: string) => {
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

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <section>
          <div
            className="frame5 w-screen h-screen bg-no-repeat bg-center bg-cover flex justify-center items-center"
            style={{ backgroundImage: "url(./img/login-background.png)" }}
          >
            <div className="bg-white w-screen md:w-[485px] h-screen md:h-auto  py-16 shadow-lg rounded-3xl mt-3 px-20 ">
              <div className="flex justify-center pb-10">
                {/* <img src="./img/logo.png" alt="" /> */}
              </div>

              <div className="font-normal text-xs mt-6">
                <div className="mb-6">
                  <input
                    type="text"
                    {...register("fName")}
                    placeholder="نام"
                    className="border rounded-2xl w-full text-right px-2 py-1 focus:outline-none focus:ring-0 focus:border-gray-600"
                  />
                  {errors?.fName?.message && (
                    <p className="text-red-700">{errors.fName.message}</p>
                  )}
                </div>
                <div className="mb-6">
                  <input
                    type="text"
                    {...register("lName")}
                    placeholder="نام خانوادگی"
                    className="border text-right rounded-2xl w-full px-2 py-1 focus:outline-none focus:ring-0 focus:border-gray-600"
                  />
                  {errors?.lName?.message && (
                    <p className="text-red-700">{errors.lName.message}</p>
                  )}
                </div>
                <div className="mb-6">
                  <input
                    type="text"
                    {...register("email")}
                    placeholder="ایمیل"
                    className="border text-right rounded-2xl w-full px-2 py-1 focus:outline-none focus:ring-0 focus:border-gray-600"
                  />
                  {errors?.email?.message && (
                    <p className="text-red-700">{errors.email.message}</p>
                  )}
                </div>
                <div className="mb-6">
                  <input
                    type="password"
                    placeholder="رمز عبور"
                    {...register("password")}
                    value={formInput.password}
                    onChange={({ target }) => {
                      handleUserInput(target.name, target.value);
                    }}
                    className="border text-right rounded-2xl w-full px-2 py-1 focus:outline-none focus:ring-0 focus:border-gray-600"
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
                    className="border text-right rounded-2xl w-full px-2 py-1 focus:outline-none focus:ring-0 focus:border-gray-600"
                  />
                  <p className="text-red-700">{formError.confirmPassword}</p>
                </div>
              </div>
              <div>
                <label className="flex justify-end items-center mb-6  text-sm   cursor-pointer">
                  <span className="ms-3 rtl pr-6 text-sm font-medium ">
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
                />
              </div>
              <div className="flex items-center text-sm text-center">
                <div className="text-center mr-1 flex border-solid rounded-2xl bg-[#EA5A69] w-[102px] h-[36px] text-sm justify-center items-center px-[8px] py-[16px] ">
                  <button type={"submit"}>ثبت تغییرات</button>
                </div>
                <div className="pr-5">
                  <Link to="/login">
                    <button>پشیمون شدم</button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>
      </form>
    </>
  );
};
