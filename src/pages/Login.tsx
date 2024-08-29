import { Link, useLocation, useNavigate } from "react-router-dom";
import React, { useRef, useState, useEffect } from "react";
import { LoginApi } from "../api/axios";
import useAuth from "../hooks/useAuth";
import Cookies from "js-cookie";
import { ToastR } from "../components/controles/ToastR";
import { Spinner } from "flowbite-react";

export const Login = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";

  //@ts-ignore
  const { setAuth } = useAuth();
  const userRef = useRef(null);
  const errRef = useRef(null);

  const [user, setUser] = useState("");
  const [pwd, setPwd] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [errMsg, setErrMsg] = useState("");

  const [displayToast, setDispalyToast] = useState(false);
  const [toastMsg, setToastMsg] = useState("");
  const [toastType, setToastType] = useState("basic");

  const [isLoading, setIsLoading] = useState(false);
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setDispalyToast(false);
    }, 3000);
    return () => clearTimeout(timeoutId);
  }, [displayToast]);

  useEffect(() => {
    (userRef as any).current.focus();
  }, []);

  useEffect(() => {
    setErrMsg("");
  }, [user, pwd]);

  const checkIfEmailInString = (text: string) => {
    var re =
      /(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))/;
    return re.test(text);
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      let requestBody = {
        password: pwd,
        rememberMe: rememberMe,
      };

      let emailKey = "email";
      let userKey = "username";
      requestBody = checkIfEmailInString(user)
        ? { ...requestBody, [emailKey]: user }
        : { ...requestBody, [userKey]: user };

      const response = await LoginApi.post("", JSON.stringify(requestBody), {
        headers: { "Content-Type": "application/json" },
      });
      const jwt = response?.data.token;
      const roles = response?.data?.roles;
      setUser("");
      setPwd("");
      Cookies.set("token", jwt, { expires: 7 });
      Cookies.set("username", user, { expires: 7 });
      setAuth({ user, pwd, jwt });
      setToastMsg("ورود موفقیت آمیز");
      setToastType("success");
      setDispalyToast(true);
      setTimeout(() => {
        navigate(from, { replace: true });
      }, 2000);
    } catch (err: any) {
      if (!err?.response) {
        setToastMsg("سرور در دسترس نیست");
        setToastType("danger");
        setDispalyToast(true);
      } else if (err.response?.status === 400) {
        setErrMsg("نام کاربری یا رمز عبور وجود ندارد");
      } else if (err.response?.status === 401) {
        setErrMsg("نام کاربری یا رمز عبور اشتباه است");
      } else {
        setToastMsg("خطا در ورود ");
        setToastType("danger");
        setDispalyToast(true);
      }

      (errRef as any).current.focus();
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section>
      {displayToast && <ToastR type={toastType}>{toastMsg}</ToastR>}
      <form onSubmit={handleSubmit}>
        <div
          className="frame5 w-screen h-screen bg-no-repeat bg-center bg-cover flex justify-center items-center"
          style={{ backgroundImage: "url(./img/login-background.png)" }}
        >
          <div className=" bg-[#F5F5F5] w-screen md:w-[485px] h-screen md:h-auto py-8 shadow-lg rounded-3xl px-20 ">
            <div className="flex justify-center pb-5">
              <img src="./img/logo.png" alt="" />
            </div>
            <div className="text-xl mb-6 justify-evenly flex">
              <Link to="/login">
                <button>ورود</button>
              </Link>
              |
              <Link to="/signup">
                <button className="text-[#A5A5A5]">ثبت نام</button>
              </Link>
            </div>
            <div className="text-right text-sm font-normal mb-4">
              به کالج‌گرام خوش آمدید. برای ورود کافیه نام کاربری/ایمیل و رمز
              عبور خود‌تون رو وارد کنید
            </div>
            <div className="">
              <input
                type="text"
                id="username"
                ref={userRef}
                autoComplete="off"
                onChange={(e) => setUser(e.target.value)}
                value={user}
                required
                placeholder="نام کاربری یا ایمیل"
                className="border rounded-2xl w-full text-right text-base mb-4 px-2 py-1 focus:outline-none focus:ring-0 focus:border-gray-600"
                dir="ltr"
              />
              <input
                type="password"
                id="password"
                onChange={(e) => setPwd(e.target.value)}
                value={pwd}
                required
                placeholder="رمز عبور"
                className="border text-right rounded-2xl w-full text-base px-2 py-1 focus:outline-none focus:ring-0 focus:border-gray-600"
                dir="ltr"
              />
              <p
                ref={errRef}
                className={errMsg ? "errmsg text-red-700" : "offscreen"}
                aria-live="assertive"
              >
                {errMsg}
              </p>

              <div className="text-rtl flex text-center justify-start mt-6">
                <input
                  type="checkbox"
                  name=""
                  onChange={(e) => setRememberMe(Boolean(e.target.value))}
                  id="savePass"
                />
                <label htmlFor="savePass">
                  <div className="pr-2">من را به خاطر بسپار</div>
                </label>
              </div>
            </div>
            <div>
              <button
                className="text-center mt-6 flex border-solid rounded-2xl  text-white bg-[#EA5A69] w-[84px] ml-auto mr-auto justify-center items-center px-[16px] py-[8px] "
                type="submit"
              >
                {!isLoading && <span>ورود</span>}
                {isLoading && (
                  <Spinner aria-label="Loading..." size="sm"></Spinner>
                )}
              </button>
            </div>
            <div className="text-sm flex flex-col text-right mt-6">
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
