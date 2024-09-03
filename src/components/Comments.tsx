import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPaperPlane,
  faHeart,
  faArrowCircleLeft,
  faArrowsTurnRight,
} from "@fortawesome/free-solid-svg-icons";

interface IProps {
  postId: string;
}
export const Comments: React.FC<IProps> = ({ postId }) => {
  return (
    <div>
      {/* comment form */}
      <div className="flex flex-row py-0.5 items-center justify-between mb-4">
        <div className="grow-0">
          <img
            className="w-10 h-10 rounded-full ml-3"
            src="../img/person.png"
            alt=""
          />
        </div>
        <div className="grow">
          <input
            className="py-2 px-4 border-zinc-300 border-l rounded-2xl h-9"
            placeholder="نظر خود را بنویسید ..."
          ></input>
        </div>
        <div className="grow-0">
          <button className="">
            <FontAwesomeIcon
              icon={faPaperPlane}
              className="w-6 h-6 text-red-400"
            />
          </button>
        </div>
      </div>
      <div className="my-2">
        <div className="flex flex-row py-0.5 items-center">
          <div className="basis-1/6 grow text-xs font-bold text-zinc-900">
            مهشید منزه
          </div>
          <div className="basis-1/6 grow text-[10px] font-bold text-neutral-400">
            5 هفته پیش
          </div>
          <div className="basis-1/6 grow-0 text-xs font-black text-red-400">
            <button onClick={() => {}}>
              <span className="ml-2">2</span>
              <FontAwesomeIcon icon={faHeart} />
            </button>
          </div>
          <div className="basis-1/6 grow-0 text-xs font-black text-red-400">
            <button onClick={() => {}}>
              <span className="ml-2">پاسخ</span>
              <FontAwesomeIcon icon={faArrowsTurnRight} />
            </button>
          </div>
        </div>
        <div className="flex flex-row py-0.5 items-center justify-between">
          <div className="basis-full mt-4 font-normal text-xs text-right text-zinc-900">
            خیلی عکس قشنگ و جالبیه. جایی رو می‌شناسی که این دکور رو بسازن؟{" "}
          </div>
        </div>
      </div>
      <div className="my-2 pr-12">
        <div className="flex flex-row py-0.5 items-center">
          <div className="basis-1/6 grow text-xs font-bold text-zinc-900">
            مهتاب فروغی
          </div>
          <div className="basis-1/6 grow text-[10px] font-bold text-neutral-400">
            5 هفته پیش
          </div>
          <div className="basis-1/6 grow-0 text-xs font-black text-red-400">
            <button onClick={() => {}}>
              <span className="ml-2">2</span>
              <FontAwesomeIcon icon={faHeart} />
            </button>
          </div>
          <div className="basis-1/6 grow-0 text-xs font-black text-red-400">
            <button onClick={() => {}}>
              <span className="ml-2">پاسخ</span>
              <FontAwesomeIcon icon={faArrowsTurnRight} />
            </button>
          </div>
        </div>
        <div className="flex flex-row py-0.5 items-center justify-between">
          <div className="basis-full mt-4 font-normal text-xs text-right text-zinc-900">
            نه متاسفانه نمی شناسم
          </div>
        </div>
      </div>
    </div>
  );
};
