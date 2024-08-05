import { Link } from "react-router-dom";
import React from "react";
import { useForm } from "react-hook-form";

export const Signup = () => {
  const { register, handleSubmit } = useForm();

  const onSubmit = (data: {}) => console.log(data);
  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <section>
          <div
            className="frame5 w-screen h-screen bg-no-repeat bg-center bg-cover flex justify-center items-center"
            style={{ backgroundImage: "url(./img/login-background.png)" }}
          >
            <div className=" bg-white w-96  py-16 shadow-lg rounded-3xl mt-3 px-20 ">
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
                برای ثبت‌نام کافیه نام کاربری، ایمیل و یک رمز عبور وارد کنید
              </div>
              <div className=" mt-6">
                <input
                  type="text"
                  {...register("name")}
                  placeholder="نام کاربری"
                  className="border rounded-2xl w-full text-right text-base mb-6 px-2 py-1 focus:outline-none focus:ring-0 focus:border-gray-600"
                />
                <input
                  type="text"
                  {...register("email", { required: true })}
                  placeholder="ایمیل"
                  className="border text-right rounded-2xl w-full text-base mb-6 px-2 py-1 focus:outline-none focus:ring-0 focus:border-gray-600"
                />
                <input
                  type="text"
                  {...register("password")}
                  placeholder="رمز عبور"
                  className="border text-right rounded-2xl w-full text-base mb-6 px-2 py-1 focus:outline-none focus:ring-0 focus:border-gray-600"
                />
                <input
                  type="text"
                  placeholder="تکرار رمز عبور"
                  className="border text-right rounded-2xl w-full text-base px-2 py-1 focus:outline-none focus:ring-0 focus:border-gray-600"
                />
              </div>
              <div className="text-center mt-6 flex border-solid rounded-2xl bg-[#EA5A69] w-[84px] ml-auto mr-auto justify-center items-center px-[16px] py-[8px] ">
                <button type={"submit"}>ثبت نام</button>
              </div>
            </div>
          </div>
        </section>
      </form>
    </>
  );
};
