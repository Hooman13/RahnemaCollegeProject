import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPaperPlane } from "@fortawesome/free-solid-svg-icons";
import { useEffect, useRef, useState } from "react";
import { BaseApi } from "../api/axios";
import Cookies from "js-cookie";
import { useMutation } from "@tanstack/react-query";
import { Spinner } from "flowbite-react";
import { useQueryClient } from "@tanstack/react-query";

interface IProps {
  postId: string;
  parentId: string | null;
}
export const CommentsForm: React.FC<IProps> = ({ postId, parentId }) => {
  const queryClient = useQueryClient();
  const [commentInput, setCommentInput] = useState("");
  const token = Cookies.get("token");
  const commentInputRef = useRef(null);

  const mutation = useMutation({
    mutationFn: () => {
      return BaseApi.post(
        `/posts/${postId}/comments`,
        {
          type: "comment",
          content: commentInput,
          parentId: parentId,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
    },
  });

  useEffect(() => {
    queryClient.invalidateQueries({ queryKey: [postId, "postComments"] });
    setCommentInput("");
  }, [mutation.isSuccess]);

  const submitComment = (e: any) => {
    e.preventDefault();
    mutation.mutate();
  };
  return (
    <form
      onSubmit={submitComment}
      className="flex flex-row py-0.5 items-center justify-between mb-4"
    >
      <div className="grow-0">
        <img
          className="w-10 h-10 rounded-full ml-3"
          src="../img/person.png"
          alt=""
        />
      </div>
      <div className="grow">
        <input
          type="text"
          ref={commentInputRef}
          value={commentInput}
          onChange={(e) => {
            setCommentInput(e.target.value);
          }}
          required
          className="py-2 px-4 border-zinc-300 border-l rounded-2xl h-9"
          placeholder="نظر خود را بنویسید ..."
        ></input>
      </div>
      <div className="grow-0">
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
  );
};
