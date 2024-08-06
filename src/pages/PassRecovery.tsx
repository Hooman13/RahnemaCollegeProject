import { Link } from "react-router-dom";

export const PassRecovery = () => {
  return (
    <>
      <section>
        <div
          className="frame5 w-screen h-screen bg-no-repeat bg-center bg-cover flex justify-center items-center"
          style={{ backgroundImage: "url(./img/login-background.png)" }}
        >
          <div className=" bg-white w-screen md:w-[485px] h-screen md:h-[695px] py-16 shadow-lg rounded-3xl mt-3 px-20 ">
            <div className="flex justify-center pb-10">
              <img src="./img/logo.png" alt="" />
            </div>
            <div className="mb-12 justify-evenly flex">بازیابی رمز عبور</div>
            <div className="text-right mb-8">
              لطفاً نام‌ کاربری یا ایمیل خودتون رو وارد کنید
            </div>
            <div className=" mt-6">
              <input
                type="text"
                placeholder="نام کاربری یا ایمیل"
                className="border rounded-2xl w-full text-right text-base mb-6 px-2 py-1 focus:outline-none focus:ring-0 focus:border-gray-600"
              />
            </div>
            <div className="flex items-center">
              <div className="text-center mr-1 flex border-solid rounded-2xl bg-[#EA5A69] w-[181px] h-[36px] text-sm ml-auto justify-center items-center px-[8px] py-[16px] ">
                <Link to="/newpass">
                  <button>ارسال لینک بازیابی رمز عبور</button>
                </Link>
              </div>
              <div className="flex">
                <Link to="/login">
                  <button>انصراف</button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};
