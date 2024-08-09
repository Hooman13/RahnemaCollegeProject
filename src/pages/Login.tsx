import { Link, useLocation, useNavigate } from "react-router-dom";
import React, { useRef, useState, useEffect } from "react";
import axios from "../api/axios";
import useAuth from "../hooks/useAuth";

const LOGIN_URL = "/auth/login";

export const Login = () => {
  const navigate = useNavigate();
  const location = useLocation();
  // const from = location.state?.from?.pathname || "/";
  //@ts-ignore

  const { setAuth } = useAuth();
  const userRef = useRef(null);
  const errRef = useRef(null);

  const [user, setUser] = useState("");
  const [pwd, setPwd] = useState("");
  const [errMsg, setErrMsg] = useState("");
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    (userRef as any).current.focus();
  }, []);

  useEffect(() => {
    setErrMsg("");
  }, [user, pwd]);

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        LOGIN_URL,
        JSON.stringify({ username: user, password: pwd, rememberMe: false }),
        {
          headers: { "Content-Type": "application/json" },
          // withCredentials: true,
        }
      );
      debugger;
      console.log(JSON.stringify(response?.data));
      const jwt = response?.data;
      const roles = response?.data?.roles;
      setUser("");
      setPwd("");

      navigate("/profile");
      setAuth({ user, pwd, jwt });
    } catch (err: any) {
      debugger;
      if (!err?.response) {
        setErrMsg("No Server Response");
      } else if (err.response?.status === 400) {
        setErrMsg("Missing Username or Password");
      } else if (err.response?.status === 401) {
        setErrMsg("Unauthorized");
      } else {
        setErrMsg("Login Failed");
      }
      (errRef as any).current.focus();
    }
  };

  return (
    <section>
      <form onSubmit={handleSubmit}>
        <div
          className="frame5 w-screen h-screen bg-no-repeat bg-center bg-cover flex justify-center items-center"
          style={{ backgroundImage: "url(./img/login-background.png)" }}
        >
          <div className=" bg-white w-screen md:w-[485px] h-screen md:h-[695px] py-16 shadow-lg rounded-3xl mt-3 px-20 ">
            <p
              ref={errRef}
              className={errMsg ? "errmsg" : "offscreen"}
              aria-live="assertive"
            >
              {errMsg}
            </p>
            <div className="flex justify-center pb-10">
              <img src="./img/logo.png" alt="" />
            </div>
            <div className="text-xl mb-12 justify-evenly flex">
              <Link to="/login">
                <button>ورود</button>
              </Link>
              |
              <Link to="/signup">
                <button className="text-[#A5A5A5]">ثبت نام</button>
              </Link>
            </div>
            <div className="text-right text-sm mb-8">
              به کالج‌گرام خوش آمدید. برای ورود کافیه نام کاربری/ایمیل و رمز
              عبور خود‌تون رو وارد کنید
            </div>
            <div className=" mt-6">
              <input
                type="text"
                id="username"
                ref={userRef}
                autoComplete="off"
                onChange={(e) => setUser(e.target.value)}
                value={user}
                required
                placeholder="نام کاربری یا ایمیل"
                className="border rounded-2xl w-full text-right text-base mb-6 px-2 py-1 focus:outline-none focus:ring-0 focus:border-gray-600"
              />
              <input
                type="password"
                id="password"
                onChange={(e) => setPwd(e.target.value)}
                value={pwd}
                required
                placeholder="رمز عبور"
                className="border text-right rounded-2xl w-full text-base px-2 py-1 focus:outline-none focus:ring-0 focus:border-gray-600"
              />
              <div className="text-rtl flex text-center justify-start mt-6">
                <input type="checkbox" name="" id="savePass" />
                <label htmlFor="savePass">
                  <div className="pr-2">من را به خاطر بسپار</div>
                </label>
              </div>
            </div>
            <div className="text-center mt-6 flex border-solid rounded-2xl bg-[#EA5A69] w-[84px] ml-auto mr-auto justify-center items-center px-[16px] py-[8px] ">
              <button type="submit">ورود</button>
            </div>
            <div className="text-sm flex flex-col text-right mt-12">
              <Link to="/forgotpass" className="mb-4">
                فراموشی رمز عبور
              </Link>
              <Link to="/signup">ثبت نام در کالج‌گرام</Link>
            </div>
          </div>
        </div>
      </form>
    </section>
  );
};
