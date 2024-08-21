import axios from "axios";
import Cookies from "js-cookie";

export const UnFollow = ({ user }: any) => {
  const token = Cookies.get("token");
  const handleUnFollow = () => {
    fetch("http://37.32.5.72:3000/unfollow/" + user, {
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
          onClick={handleUnFollow}
          type="button"
          className="text-sm font-semibold py-1 px-4 rounded-[100px] border border-[#EA5A69] text-[#EA5A69]"
        >
          دنبال نکردن
        </button>
      </section>
    </>
  );
};
