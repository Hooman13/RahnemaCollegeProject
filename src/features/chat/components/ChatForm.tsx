import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPaperPlane } from "@fortawesome/free-solid-svg-icons";
import { useRef, useState } from "react";
import { BaseApi } from "../../../api/axios";
import Cookies from "js-cookie";
import { useMutation } from "@tanstack/react-query";
import { Spinner } from "flowbite-react";
import { useQueryClient } from "@tanstack/react-query";
import { ToastR } from "../../../components/controles/ToastR";
import { IUserInfo } from "../../../data/types";
interface IProps {
  ReciverUsername: string;
}
export const ChatForm: React.FC<IProps> = ({ ReciverUsername }) => {
  const queryClient = useQueryClient();
  const [msgInput, setMsgInput] = useState("");
  const token = Cookies.get("token");
  const userName = Cookies.get("username");
  const msgInputRef = useRef(null);

  const [displayToast, setDispalyToast] = useState(false);
  const [toastMsg, setToastMsg] = useState("");
  const [toastType, setToastType] = useState("basic");

  const mutation = useMutation({
    mutationFn: (formdata: FormData) => {
      return BaseApi.post(
        `/dashboard/messages/${ReciverUsername}`,
        formdata,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
          },
        }
      );
    },
    onSuccess: () => {
      setMsgInput("");
    },
    onError: (error) => {
      console.log(error);
      setToastMsg("خطا در ارسال پیام");
      setToastType("danger");
      setDispalyToast(true)
    },
  });

  const submitComment = (e: any) => {
    e.preventDefault();
    const formdata = new FormData();
    formdata.append("content", msgInput);
    mutation.mutate(formdata);
  };

  const userInfo: IUserInfo | undefined = queryClient.getQueryData([
    userName,
    "userInfo",
  ]);

  return (
    <>
      {displayToast && <ToastR type={toastType}>{toastMsg}</ToastR>}
      <form
      onSubmit={submitComment}
      className="flex flex-row py-0.5 items-center mb-4 w-full gap-2"
    >
      <div className="flex-none">
        <img
          className="w-10 h-10 rounded-full ml-3"
          src={
            userInfo?.imageUrl
              ? process.env.REACT_APP_IMAGE_URL + userInfo?.imageUrl
              : "../img/person.png"
          }
          alt=""
        />
      </div>
      <div className="flex-auto">
        <input
          type="text"
          ref={msgInputRef}
          value={msgInput}
          onChange={(e) => {
            setMsgInput(e.target.value);
          }}
          required
          className="py-2 px-4 border-zinc-300 border-l rounded-2xl h-9 w-full"
          placeholder="نظر خود را بنویسید ..."
        ></input>
      </div>
      <div className="flex-none">
        <button className="">
          {mutation.isPending ? (
            <Spinner aria-label="Loading..." size="sm"></Spinner>
          ) : (
            <FontAwesomeIcon
              icon={faPaperPlane}
              className="w-6 h-6 text-red-400"
            />
          )}
        </button>
      </div>
    </form>
    </>
    
  );
};
