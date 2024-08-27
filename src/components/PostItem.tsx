import { FunctionComponent, PropsWithChildren, useState } from "react";
import { PostModal } from "./PostModal";
interface IPostProps {
  id: string;
  imgUrl: string;
}
export const PostItem: FunctionComponent<PropsWithChildren<IPostProps>> = ({
  children,
  id,
  imgUrl,
}) => {
  const [openModal, setOpenModal] = useState(false);

  return (
    <>
      <figure
        onClick={() => setOpenModal(true)}
        id={id}
        className="relative max-w-sm cursor-pointer hover:shadow-lg"
      >
        <img
          className="h-[304px] w-[304px] rounded-3xl aspect-square object-cover transition-transform duration-300 transform hover:scale-105 peer"
          src={imgUrl}
          alt=""
        />

        <figcaption className="absolute px-4 text-sm text-white bottom-6 w-100"></figcaption>
      </figure>
      {openModal && (
        <PostModal
          postId={id}
          openModal={openModal}
          setOpenModal={setOpenModal}
        />
      )}
    </>
  );
};
