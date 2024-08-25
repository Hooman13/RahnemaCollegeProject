import axios from "axios";
import Cookies from "js-cookie";
import React, { useState } from "react";
import { useEffect } from "react";
import { ToastR } from "../components/controles/ToastR";

export const UnFollow = ({ user }: any) => {
  // show toast after successfully unfollow someone
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
  const handleUnFollow = () => {
    fetch("http://37.32.5.72:3000/unfollow/" + user, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => {
        if (response.status === 200) {
          setToastMsg(` با ${user} دوست نیستی دیگه`);
          setToastType("success");
          setDispalyToast(true);
          console.log(response);
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
          onClick={handleUnFollow}
          type="button"
          className="text-sm font-semibold py-1 px-4 rounded-[100px] border border-[#EA5A69] text-[#EA5A69]"
        >
          دنبال نکردن
        </button>
      </section>
    </>
  );
};
