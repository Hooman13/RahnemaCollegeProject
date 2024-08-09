import { Link } from "react-router-dom";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Login } from "./Login";

const FormSchema = z.object({
  username: z
    .string()
    .min(3, "نام کاربری باید شامل حداقل ۳ حرف باشد")
    .regex(
      /^[a-zA-Z0-9_]+$/,
      " نام کاربری باید فقط شامل حروف و عدد و آندرلاین باشد"
    ),
  email: z.string().email("ایمیل وارد شده نامعتبر است"),
  password: z.string().min(8, "رمزعبور باید حداقل شامل ۸ حرف باشد"),
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

  const navigate = useNavigate();
  const handleSignupSuccess = () => {
    navigate("/login");
  };

  const onSubmit = (data: IFormInput) => {
    // console.log(data);
    axios
      .post("http://37.32.5.72:3000/auth/signup", JSON.stringify(data), {
        headers: { "Content-Type": "application/json" },
      })
      // fetch("http://37.32.5.72:3000/auth/signup", {
      //   method: "POST",
      //   headers: { "Content-Type": "application/json" },
      //   body: JSON.stringify(data),
      // })
      .then((response) => {
        console.log(response);
        if (response.status === 201) {
          handleSignupSuccess();
        }
      })
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

                <div className="mb-6">
                  <input
                    type="password"
                    {...register("password")}
                    value={formInput.password}
                    placeholder="رمز عبور"
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
                    type="confirmPassword"
                    {...register("confirmPassword")}
                    value={formInput.confirmPassword}
                    placeholder="تکرار رمز عبور"
                    onChange={({ target }) => {
                      handleUserInput(target.name, target.value);
                    }}
                    onKeyUp={validatePassInputs}
                    className="border text-right rounded-2xl w-full px-2 py-1 focus:outline-none focus:ring-0 focus:border-gray-600"
                  />
                  <p className="text-red-700">{formError.confirmPassword}</p>
                </div>
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
