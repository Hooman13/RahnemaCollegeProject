import axios from "axios";
import Cookies from "js-cookie";
import React, { useState, PropsWithChildren } from "react";
import { useEffect } from "react";
import { ToastR } from "../components/controles/ToastR";

interface IUser {
  user: string;
}

export const CloseFriendB: React.FC<PropsWithChildren<IUser>> = ({
  user,
  children,
}) => {
  // show toast after successfully follow someone
  const [displayToast, setDispalyToast] = useState(false);
  const [toastMsg, setToastMsg] = useState("");
  const [toastType, setToastType] = useState("basic");
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setDispalyToast(false);
    }, 3000);
    return () => clearTimeout(timeoutId);
  }, [displayToast]);
  const token = Cookies.get("token");
  const handleFollow = () => {
    // axios
    //   .patch(`http://37.32.5.72:3000/follow/` + user, {
    //     headers: {
    //       "Content-Type": "application/json",
    //       Authorization: `Bearer ${token}`,
    //     },
    //   })
    fetch("http://37.32.5.72:3000/user-relations/friends/" + user, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => {
        if (response.status === 200) {
          setToastMsg(` کلوز فرند ${user}  شد`);
          setToastType("success");
          setDispalyToast(true);
          // changeButton()
        }
      })
      .catch((err) => {
        console.log({ err });
      });
  };
  return (
    <>
      <section>
        {displayToast && <ToastR type={toastType}>{toastMsg}</ToastR>}
        <button
          onClick={handleFollow}
          type="button"
          className="mr-5 text-sm font-semibold py-1 px-4 bg-[#EA5A69] rounded-[100px] text-white"
        >
          کلوز فرند
        </button>
      </section>
    </>
  );
};
