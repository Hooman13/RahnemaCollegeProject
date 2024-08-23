import { FollowingCard } from "../components/FollowingCard";
import { Link, useParams } from "react-router-dom";
import { useState } from "react";
import { useEffect } from "react";
import Cookies from "js-cookie";
import axios from "../api/axios";
import { Button, Modal } from "flowbite-react";

interface IProps {
  openModal: boolean;
  setOpenModal: React.Dispatch<React.SetStateAction<boolean>>;
}

export const FollowingsList: React.FC<IProps> = ({
  openModal,
  setOpenModal,
}) => {
  interface IUser {
    username: string;
    followersCount: number;
    imageUrl: string;
  }
  interface IUsers extends Array<IUser> {}
  const [followingsData, setFollowingsData] = useState<IUsers>([]);
  const token = Cookies.get("token");
  const { username } = useParams();
  const userName = Cookies.get("username");
  const userInfoEndpoint = username ? `${username}` : userName;
  const getFollowingsData = async () => {
    try {
      const data: any = await axios
        .get("http://37.32.5.72:3000/" + userInfoEndpoint + "/followings", {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        })
        .then((res) => {
          const userData = res.data;
          const p = userData.followings;
          console.log(p);
          // console.log(userData);
          setFollowingsData((prevState) => ({
            ...prevState,
            ...p,
          }));
          // its a test for convert obj of obj to arr of obj
          // const nejat = Object.values(followingsData);
          // console.log(p);
        });
    } catch (error) {
      console.log({ error });
    }
  };

  useEffect(() => {
    getFollowingsData();
  }, []);

  return (
    <>
      <Modal show={openModal} onClose={() => setOpenModal(false)}>
        <Modal.Body>
          <section>
            <form>
              <div className=" bg-white w-auto h-auto py-16 rounded-3xl mt-3 px-12 ">
                <div className="flex justify-center pb-10 text-xl overflow-y-hidden font-bold text-[#191919]">
                  دنبال شونده ها
                </div>
                <div className="overflow-y-scroll">
                  {Object.values(followingsData).map(function (user, index) {
                    return (
                      <FollowingCard
                        username={user.username}
                        followersCount={user.followersCount}
                        key={index}
                      ></FollowingCard>
                    );
                  })}
                </div>
                <div className="flex items-center justify-end text-sm">
                  <div className="text-white text-center mr-1 flex border-solid rounded-2xl bg-[#EA5A69] w-[62px] h-[36px] text-sm justify-center items-center px-[8px] py-[16px] ">
                    <button onClick={() => setOpenModal(false)}>بستن</button>
                  </div>
                </div>
              </div>
            </form>
          </section>
        </Modal.Body>
      </Modal>
    </>
  );
};
