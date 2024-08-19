export const FollowerCard = () => {
  return (
    <>
      <div className="grid grid-cols-6 justify-between items-center  h-14  text-xl text-center mb-8">
        <div className="items-center col-span-4 flex justify-start w-[210px] h-14">
          <img
            className="border rounded-full ml-7 w-[56px] h-[56px]"
            src="./img/avatar.png"
            alt=""
          />
          <div className="grid grid-rows-2 text-right">
            <div className="user-display-name text-sm h-6 font-bold">
              متین دهقان
            </div>
            <div className="user-full-name text-xs h-6 font-normal ">
              170 هزار دنبال‌کننده
            </div>
          </div>
        </div>
        <div className="col-span-2 mr-4 items-end">. . .</div>
      </div>
    </>
  );
};
