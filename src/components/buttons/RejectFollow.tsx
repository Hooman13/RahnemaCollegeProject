import axios from "axios";
import Cookies from "js-cookie";
import React, { useState, PropsWithChildren } from "react";
import { useEffect } from "react";
import { ToastR } from "../controles/ToastR";
import { useMutation } from "@tanstack/react-query";
import { useQueryClient } from "@tanstack/react-query";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";

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
  const queryClient = useQueryClient();
  const cookieUsername = Cookies.get("username");

  const profileUsername = user;

  const mutation = useMutation({
    mutationFn: () => {
      return fetch(
        process.env.REACT_APP_API_BASE_URL + "user-relations/follow/" + user,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
    },
    onSuccess: (res) => {
      setToastMsg(`درخواست ${user} رو رد کردی`);
      setToastType("success");
      setDispalyToast(true);
    },
    onError: () => {
      setToastMsg("متاسفانه درخواست شما انجام نشد");
      setToastType("error");
      setDispalyToast(true);
    },
  });
  useEffect(() => {
    queryClient.invalidateQueries({ queryKey: [profileUsername, "userInfo"] });
    queryClient.invalidateQueries({ queryKey: [user, "userInfo"] });
    queryClient.invalidateQueries({ queryKey: ["myNotifs"] });
    queryClient.invalidateQueries({ queryKey: ["userSearch"] });
    queryClient.invalidateQueries({ queryKey: ["friendsNotifs"] });
  }, [mutation.isSuccess]);

  const handleDeleteFollow = (e: any) => {
    e.preventDefault();
    mutation.mutate();
  };
  return (
    <>
      <section>
        {displayToast && <ToastR type={toastType}>{toastMsg}</ToastR>}
        <button
          onClick={handleDeleteFollow}
          type="button"
          className="text-xs font-semibold py-1 px-5 bg-[#EA5A69] rounded-[100px] text-white"
        >
          ازش خوشم نمیاد
        </button>
      </section>
    </>
  );
};
