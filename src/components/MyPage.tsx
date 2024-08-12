import styles from "./MyPage.module.css";
import { Link } from "react-router-dom";
export const MyPage = () => {
  return (
    <>
      <div>
        {/* profile informations */}
        <div className="text-black border-b-2 border-[#CAC4D0] pb-6">
          <h1 className="mb-8 text-xl">صفحه من</h1>
          <div className="flex justify-between">
            <div className="flex items-center">
              <img
                className="border rounded-full ml-8 w-[132px] h-[132px]"
                src="./img/avatar.png"
                alt=""
              />
              <div className="grid grid-rows-4 h-[132px]">
                <div className="user-display-name text-sm text-[#C19008]">
                  @mahmz
                </div>
                <div className="user-full-name text-xl">مهشید منزه</div>
                <div className="text-sm flex  ">
                  <div className="user-followers-details pl-2 text-[#C19008]">
                    13 دنبال کننده
                  </div>
                  |
                  <div className="user-followers-details px-2 text-[#C19008]">
                    13 دنبال شونده
                  </div>
                  |<div className="user-followers-details pr-2">13 پست</div>
                </div>
                <div className="user-followers-details w-[377px]">
                  Lover, not a fighter, spreading ✌️all over the 🌎
                </div>
              </div>
            </div>
            <div className="flex items-center justify-items-end	">
              <Link to="/editpage">
                <button
                  type="button"
                  className="w-[197px] py-4 px-2 bg-[#EA5A69] rounded-3xl text-white "
                >
                  ویرایش پروفایل
                </button>
              </Link>
            </div>
          </div>
        </div>
        {/* posts place */}
        <div className="mt-6 bg-black h-full border rounded-t-[45px]">
          hello
        </div>
      </div>
    </>
  );
};
