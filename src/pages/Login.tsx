import { Link } from "react-router-dom";

import React from "react";
import { useForm } from "react-hook-form";

export const Login = () => {
  const { register, handleSubmit } = useForm();
  const onSubmit = (data: any) => {
    const userData = JSON.parse(localStorage.getItem(data.email)!);
    if (userData) {
      if (userData.password === data.password) {
        console.log(userData.name + " You Are Successfully Logged In");
      } else {
        console.log("Email or Password is not matching with our record");
      }
    } else {
      console.log("Email or Password is not matching with our record");
    }
  };
  return (
    <>
      <form action="">
        <section>
          <div
            className="frame5 w-screen h-screen bg-no-repeat bg-center bg-cover flex justify-center items-center"
            style={{ backgroundImage: "url(./img/login-background.png)" }}
          >
            <div className=" bg-white w-screen md:w-96 h-screen md:h-[695px] py-16 shadow-lg rounded-3xl mt-3 px-20 ">
              <div className="flex justify-center pb-10">
                <img src="./img/logo.png" alt="" />
              </div>
              <div className="mb-12 justify-evenly flex">
                <Link to="/login">
                  <button>ورود</button>
                </Link>
                |
                <Link to="/signup">
                  <button>ثبت نام</button>
                </Link>
              </div>
              <div className="text-right mb-8">
                به کالج‌گرام خوش آمدید. برای ورود کافیه نام کاربری/ایمیل و رمز
                عبور خود‌تون رو وارد کنید
              </div>
              <div className=" mt-6">
                <input
                  type="text"
                  {...register("email", { required: true })}
                  placeholder="نام کاربری یا ایمیل"
                  className="border rounded-2xl w-full text-right text-base mb-6 px-2 py-1 focus:outline-none focus:ring-0 focus:border-gray-600"
                />
                <input
                  type="password"
                  {...register("password")}
                  placeholder="رمز عبور"
                  className="border text-right rounded-2xl w-full text-base px-2 py-1 focus:outline-none focus:ring-0 focus:border-gray-600"
                />
                <div className="text-right mt-6">
                  <label htmlFor="savePass">من را به خاطر بسپار</label>
                  <input type="checkbox" name="" id="savePass" />
                </div>
              </div>
              <div className="text-center mt-6 flex border-solid rounded-2xl bg-[#EA5A69] w-[84px] ml-auto mr-auto justify-center items-center px-[16px] py-[8px] ">
                <button type={"submit"}>ورود</button>
              </div>
              <div className="flex flex-col text-right mt-12">
                <Link to="/forgotpass" className="mb-4">
                  فراموشی رمز عبور
                </Link>
                <Link to="/signup">ثبت نام در کالج‌گرام</Link>
              </div>
            </div>
          </div>
        </section>
      </form>
    </>
  );
};
