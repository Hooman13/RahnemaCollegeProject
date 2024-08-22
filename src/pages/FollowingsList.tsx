import { FollowerCard } from "../components/FollowerCard";
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
  // interface IUser {
  //   imageUrl: string;
  //   username: string;
  //   followingsCount: number;
  // }
  // interface IUsers extends Array<IUser> {}
  // const [followingsData, setFollowingsData] = useState<IUsers>([]);
  // const [followingsData, setFollowingsData] = useState([]);
  interface IUser {
    followedId?: string;
    updatedAt?: string;
    followingsCount?: number;
  }
  interface IUsers extends Array<IUser> {}
  const [followingsData, setFollowingsData] = useState<IUsers>([]);
  const token = Cookies.get("token");
  const userName = Cookies.get("username");
  const getFollowingsData = async () => {
    try {
      const data: any = await axios
        .get("http://37.32.5.72:3000/" + userName + "/followings", {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        })
        .then((res) => {
          const userData = res.data;
          setFollowingsData((prevState) => ({
            ...prevState,
            ...userData,
          }));
          console.log(userData);
          console.log(followingsData);
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
                  {/* {followingsData[0].followedId} */}
                  {followingsData.map((user, index) => {
                    return <FollowerCard user={user} />;
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
