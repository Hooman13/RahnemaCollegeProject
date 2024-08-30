import { faBookmark } from "@fortawesome/free-regular-svg-icons";
import { faBookmark as solidBookmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { DisplayPostApi } from "../api/axios";
import { Spinner } from "flowbite-react";
import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import { ToastR } from "./controles/ToastR";

interface IProps {
  postId: string;
  bookMarkCount: number;
}
export const PostBookmark: React.FC<IProps> = ({ postId, bookMarkCount }) => {
  useEffect(() => {}, [postId, bookMarkCount]);
  const [isLoading, setIsLoading] = useState(false);
  const [isLiked, setIsLiked] = useState(false);
  const token = Cookies.get("token");

  const [displayToast, setDispalyToast] = useState(false);
  const [toastMsg, setToastMsg] = useState("");
  const [toastType, setToastType] = useState("basic");

  const bookmarkHandle = () => {
    setIsLoading(true);
    DisplayPostApi.post(
      `/${postId}/bookmark`,
      {},
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    )
      .then((res) => {
        setIsLiked(res.data.message == "bookmarked post" ? true : false);
      })
      .catch((e) => {
        setToastMsg("خطا در لایک");
        setToastType("danger");
        setDispalyToast(true);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  return (
    <div className="flex-none w-9 gap-2 relative">
      {displayToast && <ToastR type={toastType}>{toastMsg}</ToastR>}

      <button
        onClick={() => {
          bookmarkHandle();
        }}
      >
        {isLoading && <Spinner size="sm" className="absolute"></Spinner>}
        {isLiked ? (
          <FontAwesomeIcon icon={solidBookmark} />
        ) : (
          <FontAwesomeIcon icon={faBookmark} />
        )}
      </button>

      <div>{bookMarkCount}</div>
    </div>
  );
};
