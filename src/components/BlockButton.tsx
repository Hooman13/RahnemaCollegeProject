import axios from "axios";
import Cookies from "js-cookie";
import React, { useState, PropsWithChildren } from "react";
import { useEffect } from "react";
import { ToastR } from "../components/controles/ToastR";
import { useMutation } from "@tanstack/react-query";
import { useQueryClient } from "@tanstack/react-query";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserLock } from "@fortawesome/free-solid-svg-icons";
import { Follow } from "./Follow";

interface IUser {
  user: string;
  relation: string;
}

export const BlockButton: React.FC<PropsWithChildren<IUser>> = ({
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
      return fetch("http://37.32.5.72:3000/user-relations/blocks/" + user, {
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

  const handleBlock = (e: any) => {
    e.preventDefault();
    mutation.mutate();
  };

  // swich case
  const buttonType = (relation: string) => {
    {
      switch (relation) {
        case "blocked":
          return <div>قبلا بلاک کردی</div>;
        default:
          return (
            <button
              onClick={handleBlock}
              type="button"
              className="flex px-4 py-2 text-xs"
            >
              <FontAwesomeIcon icon={faUserLock} />
              <div className="mr-2">بلاک کردن</div>
            </button>
          );
      }
    }
  };

  return (
    <>
      <section>
        {displayToast && <ToastR type={toastType}>{toastMsg}</ToastR>}
        {buttonType(relation)}
      </section>
    </>
  );
};
