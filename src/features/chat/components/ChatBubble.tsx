import { faCheck } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { IMessage } from "../../../data/types";

export const ChatBubble: React.FC<IMessage> = ({
  messageId,
  content,
  image,
  isOwned,
  createdAt,
}) => {
  return (
    <>
      <li className="rounded-3xl rounded-tr-none bg-orange-500 p-2 mb-3 w-fit">
        <div className="pt-1 pr-0 pb-1 pl-2">
          <div className="text-right mb-2 font-normal text-sm text-white">
            {content}
          </div>
          <div className="text-left">
            <span className="text-xs font-light text-white">{createdAt}</span>
            <span>
              <FontAwesomeIcon
                icon={faCheck}
                className="w-6 h-6 text-red-400"
              />
            </span>
          </div>
        </div>
      </li>
    </>
  );
};
