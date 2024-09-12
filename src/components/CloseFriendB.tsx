import Cookies from "js-cookie";
import React, { useState, PropsWithChildren } from "react";
import { useEffect } from "react";
import { ToastR } from "../components/controles/ToastR";
import { useMutation } from "@tanstack/react-query";
import { useQueryClient } from "@tanstack/react-query";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserPlus } from "@fortawesome/free-solid-svg-icons";

interface IUser {
  user: string;
  relation?: string;
}

export const CloseFriendB: React.FC<PropsWithChildren<IUser>> = ({
  user,
  relation,
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
      return fetch("http://37.32.5.72:3000/user-relations/friends/" + user, {
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

  const handleCloseFriend = (e: any) => {
    e.preventDefault();
    mutation.mutate();
  };
  // swich case
  const buttonType = (relation: string | undefined) => {
    {
      switch (relation) {
        case "friend":
          return null;
        default:
          return (
            <section>
              {displayToast && <ToastR type={toastType}>{toastMsg}</ToastR>}
              <button
                onClick={handleCloseFriend}
                type="button"
                className="flex px-4 py-2 text-xs"
              >
                <FontAwesomeIcon icon={faUserPlus} />
                <div className="mr-2">افزودن به دوستان نزدیک</div>
              </button>
            </section>
          );
      }
    }
  };

  return (
    <>
      <section>{buttonType(relation)}</section>
    </>
  );
};
