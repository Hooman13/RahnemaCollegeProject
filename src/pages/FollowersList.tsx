import { useState } from "react";
import { useEffect } from "react";
import Cookies from "js-cookie";
import { BaseApi } from "../api/axios";
import { Link, useParams } from "react-router-dom";
import { Button, Modal } from "flowbite-react";
import { FollowerCard } from "../components/cards/FollowerCard";
import { useQuery } from "@tanstack/react-query";
interface IProps {
  openModal: boolean;
  setOpenModal: React.Dispatch<React.SetStateAction<boolean>>;
}

export const FollowersList: React.FC<IProps> = ({
  openModal,
  setOpenModal,
}) => {
  const { username } = useParams();
  const token = Cookies.get("token");
  const userName = Cookies.get("username");
  const followersEndpoint = username ? `${username}` : userName;
  const getFollowersData = () => {
    return BaseApi.get("/user-relations/followers/" + followersEndpoint, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    }).then((res) => {
      return res.data.followers;
    });
  };
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["FollowersList"],
    queryFn: getFollowersData,
  });

  return (
    <>
      <Modal show={openModal} onClose={() => setOpenModal(false)}>
        <Modal.Body>
          <section>
            <form>
              <div className=" bg-white w-auto h-auto py-16 rounded-3xl mt-3 px-12 ">
                <div className="flex justify-center pb-10 text-xl overflow-y-hidden font-bold text-[#191919]">
                  دنبال کننده‌ها
                </div>
                <div className="overflow-y-scroll">
                  {data
                    ? Object.values(data).map(function (user: any, index) {
                        return (
                          <FollowerCard
                            username={user.username}
                            followersCount={user.followersCount}
                            imageUrl={
                              user.imageUrl
                                ? process.env.REACT_APP_IMAGE_URL +
                                  user.imageUrl
                                : "../img/person.png"
                            }
                            key={index}
                          ></FollowerCard>
                        );
                      })
                    : null}
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
