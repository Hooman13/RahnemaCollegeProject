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
  const profileUsername = cookieUsername;

  const mutation = useMutation({
    mutationFn: () => {
      return fetch(
        process.env.REACT_APP_API_BASE_URL + "user-relations/follow/" + user,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
    },
    onSuccess: (res) => {
      setToastMsg("درخواست شما با موفقیت انجام شد");
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
    queryClient.invalidateQueries({ queryKey: ["myNotifs"] });
    queryClient.invalidateQueries({ queryKey: [profileUsername, "userInfo"] });
    queryClient.invalidateQueries({ queryKey: [user, "userInfo"] });
    queryClient.invalidateQueries({ queryKey: ["userSearch"] });
    queryClient.invalidateQueries({ queryKey: ["FollowersList"] });
    queryClient.invalidateQueries({ queryKey: ["FollowingsList"] });
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
            className="text-xs font-semibold py-1 px-6 bg-[#EA5A69] rounded-[100px] text-white"
          >
            قبولهههه
          </button>
        )}
      </section>
    </>
  );
};
