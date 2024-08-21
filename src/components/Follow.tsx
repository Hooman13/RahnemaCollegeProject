import axios from "axios";
import Cookies from "js-cookie";

export const Follow = ({ user }: any) => {
  const token = Cookies.get("token");
  console.log(token);
  const handleFollow = () => {
    // axios
    //   .patch(`http://37.32.5.72:3000/follow/` + user, {
    //     headers: {
    //       "Content-Type": "application/json",
    //       Authorization: `Bearer ${token}`,
    //     },
    //   })
    fetch("http://37.32.5.72:3000/follow/" + user, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => {
        console.log(response);
      })
      .catch((err) => {
        console.log({ err });
      });
  };
  return (
    <>
      <section>
        <button
          onClick={handleFollow}
          type="button"
          className="text-sm font-semibold py-1 px-4 bg-[#EA5A69] rounded-[100px] text-white"
        >
          دنبال کردن
        </button>
      </section>
    </>
  );
};
