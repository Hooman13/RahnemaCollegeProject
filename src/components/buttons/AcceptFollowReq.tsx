import Cookies from "js-cookie";
import React, { useState, PropsWithChildren } from "react";
import { useEffect } from "react";
import { ToastR } from "../controles/ToastR";
import { useMutation } from "@tanstack/react-query";
import { useQueryClient } from "@tanstack/react-query";

interface IUser {
  user: string;
}

export const AcceptFollowReq: React.FC<PropsWithChildren<IUser>> = ({
  user,
  children,
}) => {
  const [followAccepted, setFollowAccepted] = useState(true);
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
      return fetch("http://37.32.5.72:3000/user-relations/follow/" + user, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
    },
  });
  useEffect(() => {
    queryClient.invalidateQueries({ queryKey: [profileUsername, "userInfo"] });
  }, [mutation.isSuccess]);

  const handleAcceptFollow = (e: any) => {
    e.preventDefault();
    mutation.mutate();
  };

  return (
    <>
      <section>
        {displayToast && <ToastR type={toastType}>{toastMsg}</ToastR>}
        {followAccepted && (
          <button
            onClick={handleAcceptFollow}
            type="button"
            className="text-sm font-semibold py-1 px-4 bg-[#EA5A69] rounded-[100px] text-white"
          >
            قبوله
          </button>
        )}
      </section>
    </>
  );
};
