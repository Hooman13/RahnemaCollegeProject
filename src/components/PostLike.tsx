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
  isLiked: boolean;
  type: "post" | "explore";
}
export const PostLike: React.FC<IProps> = ({
  postId,
  likeCount,
  isLiked,
  type,
}) => {
  const [isLoading, setIsLoading] = useState(false);
  const token = Cookies.get("token");
  interface ILike {
    likeCount: number;
    isLiked: boolean;
  }
  const [like, setLike] = useState<ILike>({
    likeCount: likeCount,
    isLiked: isLiked,
  });

  useEffect(() => {
    setLike((prevState) => ({
      ...prevState,
      ...{ likeCount, isLiked },
    }));
  }, [likeCount, isLiked]);

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
        const isLiked_result = res.data.message == "liked post";
        const likeCount_result = res.data.likeCount;

        setLike((prevState) => ({
          ...prevState,
          likeCount: likeCount_result,
          isLiked: isLiked_result,
        }));
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
        {like.isLiked ? (
          <FontAwesomeIcon icon={solidHeart} />
        ) : (
          <FontAwesomeIcon icon={faHeart} />
        )}
      </button>
      <span className={type == "post" ? "block" : "inline-block mr-2"}>
        {like.likeCount}
      </span>
    </div>
  );
};
