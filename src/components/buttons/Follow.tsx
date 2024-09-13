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

export const Follow: React.FC<PropsWithChildren<IUser>> = ({
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
          method: "POST",
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
    queryClient.invalidateQueries({ queryKey: ["friendsNotifs"] });
    queryClient.invalidateQueries({ queryKey: ["FollowersList"] });
    queryClient.invalidateQueries({ queryKey: ["FollowingsList"] });
  }, [mutation.isSuccess]);

  const handleFollow = (e: any) => {
    e.preventDefault();
    mutation.mutate();
  };

  return (
    <>
      <section>
        {displayToast && <ToastR type={toastType}>{toastMsg}</ToastR>}
        <button
          onClick={handleFollow}
          type="button"
          className="flex items-center text-xs font-semibold py-1 px-5 bg-[#EA5A69] rounded-[100px] text-white"
        >
          <FontAwesomeIcon className="ml-2" icon={faPlus} />
          دنبال کردن
        </button>
      </section>
    </>
  );
};
