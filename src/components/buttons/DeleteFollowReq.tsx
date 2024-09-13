import axios from "axios";
import Cookies from "js-cookie";
import React, { useState, PropsWithChildren } from "react";
import { useEffect } from "react";
import { useMutation } from "@tanstack/react-query";
import { useQueryClient } from "@tanstack/react-query";
import { ToastR } from "../controles/ToastR";

interface IUser {
  user: string;
}

export const DeleteFollowReq: React.FC<PropsWithChildren<IUser>> = ({
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
        "http://37.32.5.72:3000/user-relations/follow/" + user + "/req",
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
    },
  });
  useEffect(() => {
    queryClient.invalidateQueries({ queryKey: [profileUsername, "userInfo"] });
    queryClient.invalidateQueries({ queryKey: ["myNotifs"] });
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
          className="text-xs font-semibold py-1 px-6 rounded-[100px] border border-[#EA5A69] text-[#EA5A69]"
        >
          حذف درخواست
        </button>
      </section>
    </>
  );
};
