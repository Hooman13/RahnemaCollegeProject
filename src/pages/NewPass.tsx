import { Link } from "react-router-dom";

export const NewPass = () => {
  return (
    <>
      <section>
        <div
          className="frame5 w-screen h-screen bg-no-repeat bg-center bg-cover flex justify-center items-center"
          style={{ backgroundImage: "url(./img/login-background.png)" }}
        >
          <div className=" bg-white w-96  py-16 shadow-lg rounded-3xl mt-3 px-20 ">
            <div className="flex justify-center pb-10">
              <img src="./img/logo.png" alt="" />
            </div>
            <div className="mb-12 justify-evenly flex">تنظیم رمز عبور جدید</div>
            <div className="text-right mb-8">
              لطفاً رمز جدیدی برای حساب خود انتخاب کنید
            </div>
            <div className=" mt-6">
              <input
                type="text"
                placeholder="رمز عبور"
                className="border text-right rounded-2xl w-full text-base mb-6 px-2 py-1 focus:outline-none focus:ring-0 focus:border-gray-600"
              />
              <input
                type="text"
                placeholder="تکرار رمز عبور"
                className="border text-right rounded-2xl w-full mb-6 text-base px-2 py-1 focus:outline-none focus:ring-0 focus:border-gray-600"
              />
            </div>
            <div className="flex items-center">
              <div className="text-center flex border-solid rounded-2xl bg-[#EA5A69] w-[136px] h-[36px] text-sm justify-center items-center px-[8px] py-[16px] ">
                <button>ثبت رمز عبور جدید</button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};
