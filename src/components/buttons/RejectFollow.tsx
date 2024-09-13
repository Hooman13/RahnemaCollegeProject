import axios from "axios";
import Cookies from "js-cookie";
import React, { useState, PropsWithChildren } from "react";
import { useEffect } from "react";
import { ToastR } from "../controles/ToastR";

interface IUser {
  user: string;
}

export const RejectFollow: React.FC<PropsWithChildren<IUser>> = ({
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
  const handleDeleteFollow = () => {
    // axios
    //   .patch(`http://37.32.5.72:3000/follow/` + user, {
    //     headers: {
    //       "Content-Type": "application/json",
    //       Authorization: `Bearer ${token}`,
    //     },
    //   })
    fetch("http://37.32.5.72:3000/user-relations/follow/" + user, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => {
        if (response.status === 200) {
          setToastMsg(`درخواست ${user} رو رد کردی`);
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
          onClick={handleDeleteFollow}
          type="button"
          className="text-sm font-semibold py-1 px-4 bg-[#EA5A69] rounded-[100px] text-white"
        >
          ازش خوشم نمیاد
        </button>
      </section>
    </>
  );
};
