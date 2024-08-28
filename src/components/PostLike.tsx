import { faHeart } from "@fortawesome/free-regular-svg-icons";
import { faHeart as solidHeart } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { DisplayPostApi } from "../api/axios";
import { Spinner } from "flowbite-react";
import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import { ToastR } from "./controles/ToastR";

interface IProps {
  postId: string;
  likeCount: number;
}
export const PostLike: React.FC<IProps> = ({ postId, likeCount }) => {
  useEffect(() => {}, [postId, likeCount]);
  const [isLoading, setIsLoading] = useState(false);
  const [isLiked, setIsLiked] = useState(false);
  const token = Cookies.get("token");

  const [displayToast, setDispalyToast] = useState(false);
  const [toastMsg, setToastMsg] = useState("");
  const [toastType, setToastType] = useState("basic");

  const likeHandle = () => {
    setIsLoading(true);
    DisplayPostApi.post(
      `/${postId}/like`,
      {},
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    )
      .then((res) => {
        setIsLiked(res.data.message == "liked post" ? true : false);
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
          likeHandle();
        }}
      >
        {isLoading && <Spinner size="sm" className="absolute"></Spinner>}
        {isLiked ? (
          <FontAwesomeIcon icon={solidHeart} />
        ) : (
          <FontAwesomeIcon icon={faHeart} />
        )}
      </button>

      <div>{likeCount}</div>
    </div>
  );
};
