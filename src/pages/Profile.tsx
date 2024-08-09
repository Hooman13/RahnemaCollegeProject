import { Link } from "react-router-dom";
import styles from "./Profile.module.css";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faThumbTack,
  faBookmark,
  faCommentDots,
  faBell,
  faTag,
  faMagnifyingGlass,
  faGripVertical,
  faCirclePlus,
} from "@fortawesome/free-solid-svg-icons";
import { MyPage } from "../components/MyPage";

export const Profile = () => {
  return (
    <div
      className="container  w-screen h-screen mx-auto px-5 pt-5"
      style={{ background: "#F5F5F5" }}
    >
      <div className="m-8 grid grid-cols-12 gap-2 justify-evenly">
        <div className={`"bg-green-300 col-span-3 " ${styles.newPostBox}`}>
          <button type="button" className={`${styles.newPostBtn}`}>
            <FontAwesomeIcon icon={faCirclePlus} />
            ایجاد پست جدید
          </button>
        </div>

        <div className={`"bg-green-500 col-span-9 " ${styles.headerLogobox}`}>
          <img className={`${styles.logo}`} src="./img/logo.png" alt="" />
        </div>
      </div>
      <div className="m-8 grid grid-cols-12 gap-2 justify-evenly">
        <div className={`" col-span-3 " ${styles.userMenu}`}>
          <div className={`${styles.userNameBox}`}>
            <div className={`${styles.userAvatarBox}`}>
              <img src="./img/avatar.png" className="user-avatar" alt="" />
            </div>
            <span className="user-display-name">mahnaz</span>
          </div>
          <Link to="/editpage" className={`${styles.userMenuItem}`}>
            <FontAwesomeIcon icon={faThumbTack} transform={{ rotate: 40 }} />
            صفحه من
          </Link>
          <Link to="/editpage" className={`${styles.userMenuItem}`}>
            <FontAwesomeIcon icon={faBookmark} />
            ذخیره ها
          </Link>
          <Link to="/editpage" className={`${styles.userMenuItem}`}>
            <FontAwesomeIcon icon={faCommentDots} />
            پیام ها
          </Link>
          <Link to="/editpage" className={`${styles.userMenuItem}`}>
            <FontAwesomeIcon icon={faBell} />
            اعلانات
          </Link>
          <Link to="/editpage" className={`${styles.userMenuItem}`}>
            <FontAwesomeIcon icon={faTag} />
            تگ شده ها
          </Link>

          <hr />
          <Link to="/editpage" className={`${styles.userMenuItem}`}>
            <FontAwesomeIcon icon={faGripVertical} />
            اکسپلور
          </Link>
          <Link to="/editpage" className={`${styles.userMenuItem}`}>
            <FontAwesomeIcon icon={faMagnifyingGlass} />
            جستجو
          </Link>
        </div>

        <div className="col-span-9 p-1">
          <MyPage />
        </div>
      </div>
    </div>
  );
};
