import { faComment } from "@fortawesome/free-regular-svg-icons";
import { faComment as solidComment } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Spinner } from "flowbite-react";
import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import { ToastR } from "./controles/ToastR";

interface IProps {
  postId: string;
  commentCount: number;
  type: "post" | "explore";
}
export const PostComment: React.FC<IProps> = ({
  postId,
  commentCount,
  type,
}) => {
  useEffect(() => {}, [postId, commentCount]);
  const [isLoading, setIsLoading] = useState(false);
  const [isCommented, setIsCommented] = useState(false);
  const token = Cookies.get("token");

  const [displayToast, setDispalyToast] = useState(false);
  const [toastMsg, setToastMsg] = useState("");
  const [toastType, setToastType] = useState("basic");

  return (
    <div className="flex-none w-9 gap-2 relative">
      {displayToast && <ToastR type={toastType}>{toastMsg}</ToastR>}

      <button onClick={() => {}}>
        {isLoading && <Spinner size="sm" className="absolute"></Spinner>}
        {isCommented ? (
          <FontAwesomeIcon icon={solidComment} />
        ) : (
          <FontAwesomeIcon icon={faComment} />
        )}
      </button>

      <span className={type == "post" ? "block" : "inline-block mr-2"}>
        {commentCount}
      </span>
    </div>
  );
};
