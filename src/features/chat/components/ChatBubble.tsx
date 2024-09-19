import { IMessage } from "../../../data/types";
import moment from "jalali-moment";
import { IUserInfo } from "../../../data/types";
import { useQueryClient } from "@tanstack/react-query";
import Cookies from "js-cookie";
interface IProps extends IMessage{
  username:string;
  fullname?:string;
  imgUrl?:string;
}
export const ChatBubble: React.FC<IProps> = ({
  messageId,
  content,
  image,
  isOwned,
  createdAt,
  username,
  imgUrl,
  fullname,
}) => {

  const userName = Cookies.get("username");
  const queryClient = useQueryClient();
  const userInfo: IUserInfo | undefined = queryClient.getQueryData([
    userName,
    "userInfo",
  ]);


  if (isOwned)
    return (
      <>
        <div className="flex items-start gap-2">
          <img
            className="w-8 h-8 rounded-full"
            src={
              userInfo?.imageUrl
                ? process.env.REACT_APP_IMAGE_URL + userInfo?.imageUrl
                : "../img/person.png"
            }
            alt=""
          />

          <div className="ml-auto flex min-w-32 max-w-[80%] flex-col gap-2 rounded-3xl rounded-tr-none bg-orange-500 p-2 mb-3 w-fit">
            <div className="text-right mb-2 font-normal text-sm text-white">
              {content}
            </div>
            <div className="text-left">
              <span className="text-xs font-light text-white">{createdAt && moment(createdAt).format("HH:mm")}</span>
            </div>
          </div>
        </div>
      </>
    );
  else
    return (
      <>
        <div className="flex items-start gap-2">
          <div className="mr-auto flex min-w-32 max-w-[80%] flex-col gap-2 rounded-3xl rounded-tl-none bg-slate-400 p-2 mb-3 w-fit">
            <div className="text-right mb-2 font-normal text-sm text-white">
              {content}
            </div>
            <div className="text-left">
              <span className="text-xs font-light text-white">{createdAt && moment(createdAt).format("HH:mm")}</span>
            </div>
          </div>
          <img
            className="w-8 h-8 rounded-full flex-none"
            src={
              imgUrl
                ? process.env.REACT_APP_IMAGE_URL + imgUrl
                : "../img/person.png"
            }
            alt=""
          />
        </div>
      </>
    );
};
