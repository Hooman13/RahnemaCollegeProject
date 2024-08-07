import { Link } from "react-router-dom";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";

const FormSchema = z.object({
  username: z
    .string()
    .min(3, "Username must not be lesser than 3 characters")
    .regex(
      /^[a-zA-Z0-9_]+$/,
      "The username must contain only letters, numbers and underscore (_)"
    ),
  email: z.string().email("Invalid email."),
  password: z.string().min(8, "Password must not be lesser than 8 characters"),
  confirmPassword: z.string().min(8),
});

type IFormInput = z.infer<typeof FormSchema>;

export const Signup = () => {
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
      .post("http://37.32.5.72:3000/auth/signup", { data })
      .then((response) => console.log(response))
      .catch((err) => console.log(err));
  };

  const [formInput, setFormInput] = useState({
    password: "",
    confirmPassword: "",
  });
  const [formError, setFormError] = useState({
    password: "",
    confirmPassword: "",
  });

  const validatePassInputs = (e: any) => {
    e.preventDefault();
    let passError = {
      email: "",
      password: "",
      confirmPassword: "",
    };
    if (formInput.confirmPassword !== formInput.password) {
      setFormError({
        ...inputError,
        confirmPassword: "pass shoul be same",
      });
      return;
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <section>
          <div
            className="frame5 w-screen h-screen bg-no-repeat bg-center bg-cover flex justify-center items-center"
            style={{ backgroundImage: "url(./img/login-background.png)" }}
          >
            <div className=" bg-white w-screen md:w-[485px] h-screen md:h-auto  py-16 shadow-lg rounded-3xl mt-3 px-20 ">
              <div className="flex justify-center pb-10">
                <img src="./img/logo.png" alt="" />
              </div>
              <div className="text-xl mb-12 justify-evenly flex">
                <Link to="/signup">
                  <button>ثبت نام</button>
                </Link>
                |
                <Link to="/login">
                  <button className="text-[#A5A5A5]">ورود</button>
                </Link>
              </div>
              <div className="text-right text-sm mb-8 font-normal">
                برای ثبت‌نام کافیه نام کاربری، ایمیل و یک رمز عبور وارد کنید
              </div>
              <div className="font-normal text-xs mt-6">
                <div className="mb-6">
                  <input
                    type="text"
                    {...register("username")}
                    placeholder="نام کاربری"
                    className="border rounded-2xl w-full text-right px-2 py-1 focus:outline-none focus:ring-0 focus:border-gray-600"
                  />
                  {errors?.username?.message && (
                    <p className="text-red-700">{errors.username.message}</p>
                  )}
                </div>
                <div className="mb-6">
                  <input
                    type="text"
                    {...register("email", { required: true })}
                    placeholder="ایمیل"
                    className="border text-right rounded-2xl w-full px-2 py-1 focus:outline-none focus:ring-0 focus:border-gray-600"
                  />
                  {errors?.email?.message && (
                    <p className="text-red-700">{errors.email.message}</p>
                  )}
                </div>
                <form action="">
                  <div className="mb-6">
                    <input
                      type="text"
                      {...register("password")}
                      value={formInput.password}
                      placeholder="رمز عبور"
                      className="border text-right rounded-2xl w-full px-2 py-1 focus:outline-none focus:ring-0 focus:border-gray-600"
                    />
                    {errors?.password?.message && (
                      <p className="text-red-700">{errors.password.message}</p>
                    )}
                  </div>
                  <div className="mb-6">
                    <input
                      type="text"
                      {...register("confirmPassword")}
                      value={formInput.confirmPassword}
                      placeholder="تکرار رمز عبور"
                      className="border text-right rounded-2xl w-full px-2 py-1 focus:outline-none focus:ring-0 focus:border-gray-600"
                    />
                    {errors?.password?.message && (
                      <p className="text-red-700">{errors.password.message}</p>
                    )}
                  </div>
                </form>
              </div>
              <div className="font-normal text-sm text-center mt-6 flex border-solid rounded-2xl bg-[#EA5A69] w-[84px] mr-auto justify-center items-center px-[16px] py-[8px] ">
                <button type={"submit"}>ثبت نام</button>
              </div>
            </div>
          </div>
        </section>
      </form>
    </>
  );
};
