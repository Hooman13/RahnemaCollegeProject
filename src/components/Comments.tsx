import { CommentsForm } from "./CommentsForm";
import { CommentsList } from "./CommentsList";

interface IProps {
  postId: string;
}
export const Comments: React.FC<IProps> = ({ postId }) => {
  return (
    <>
      <CommentsForm postId={postId} parentId={null} />
      <CommentsList postId={postId} />
    </>
  );
};
