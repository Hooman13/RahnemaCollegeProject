import { FunctionComponent, PropsWithChildren } from "react";
import { Link } from "react-router-dom";
interface IPostProps {
  id: string;
  caption: string;
  imgUrl: string; //first image only
}
export const PostItem: FunctionComponent<PropsWithChildren<IPostProps>> = ({
  children,
  id,
  caption,
  imgUrl,
}) => {
  const postUrl = `/post/${id}`;
  return (
    <figure
      id={id}
      className="relative max-w-sm cursor-pointer hover:shadow-lg"
    >
      <Link to={postUrl}>
        <img
          className="h-auto max-w-full  rounded-t-lg aspect-square object-cover transition-transform duration-300 transform hover:scale-105 peer"
          src={imgUrl}
          alt={caption}
        />
      </Link>
      <figcaption className="absolute px-4 text-sm text-white bottom-6 w-100">
        <p>{caption}</p>
      </figcaption>
    </figure>
  );
};
