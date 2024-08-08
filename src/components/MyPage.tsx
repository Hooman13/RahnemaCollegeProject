import styles from "./MyPage.module.css";
export const MyPage = () => {
  return (
    <div className={`${styles.myPage}`}>
      <h1 className={`${styles.pageTitle}`}>صفحه من</h1>

      <div className={`${styles.userAvatarBox}`}>
        <img src="./img/avatar.png" className="user-avatar" alt="" />
      </div>

      <div className={`${styles.userDetails}`}>
        <p className="user-display-name">mahnaz</p>
        <p className="user-full-name">مهشید منزه</p>
        <p className="user-followers-details">13 دنبال کننده</p>
      </div>

      <button type="button" className={`${styles.editProfileBtn}`}>
        ویرایش پروفایل
      </button>

      <hr />
    </div>
  );
};
