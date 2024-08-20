import axios from "axios";
import Cookies from "js-cookie";

export const Follow = () => {
  const token = Cookies.get("token");
  console.log(token);
  const handleFollow = () => {
    axios
      .patch(`http://37.32.5.72:3000/follow/ehsan12`, {
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
        <button onClick={handleFollow}>follow</button>
        <div>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Illo velit
          ipsa commodi magni, asperiores distinctio sunt. Excepturi ea vero
          cumque alias, explicabo debitis beatae animi itaque qui libero
          recusandae doloremque!
        </div>
      </section>
    </>
  );
};
