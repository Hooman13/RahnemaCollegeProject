import { FollowerCard } from "../components/FollowerCard";

export const FollowersList = () => {
  return (
    <>
      <section>
        <form>
          <div
            className="frame5 w-screen h-screen bg-no-repeat bg-center bg-cover flex justify-center items-center"
            style={{ backgroundImage: "url(./img/login-background.png)" }}
          >
            <div className=" bg-white w-screen md:w-[500px] h-screen md:h-auto  py-16 shadow-lg rounded-3xl mt-3 px-12 ">
              <div className="flex justify-center pb-10 text-xl font-bold text-[#191919]">
                دنبال شونده‌‌ها
              </div>
              <FollowerCard />
            </div>
          </div>
        </form>
      </section>
    </>
  );
};
