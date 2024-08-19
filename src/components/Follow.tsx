import axios from "axios";
import Cookies from "js-cookie";

export const Follow = () => {
  const token = Cookies.get("token");
  //   const handleFollow = async () => {
  //     try {
  //       const data: any = await axios.patch(
  //         `http://37.32.5.72:3000/ + ${{user.data.username}}`,
  //         {
  //           headers: {
  //             "Content-Type": "application/json",
  //             Authorization: `Bearer ${token}`,
  //           },
  //         }
  //       );
  //     } catch (error) {
  //       console.log({ error });
  //     }
  //   };
  return (
    <>
      <section>
        <form>
          <button
          //    onClick={handleFollow}
          >
            follow
          </button>
        </form>
      </section>
    </>
  );
};
