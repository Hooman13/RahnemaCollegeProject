import { Button, Modal } from "flowbite-react";
import { createContext, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import Cookies from "js-cookie";
import { BaseApi, DisplayPostApi, EditPostApi } from "../../../api/axios";
import { useMutation } from "@tanstack/react-query";
import { string, z } from "zod";
import { AddPhoto } from "../../AddPhoto";
import { CaptionPage } from "../../CaptionPage";
import { MentionPost } from "../../MentionPost";

interface IProps {
  postId: string;
}
interface IImage {
  imageId: string;
  url: string;
}
interface ICreator {
  username: string;
  imageUrl: string;
}
export interface IMentions {
  postId: string;
  mentionedId: string;
  image: string;
}
export interface Ipost {
  postId: string;
  caption: string;
  creator: ICreator;
  createdAt: string;
  updatedAt: string;
  tags: string[];
  imageInfos: IImage[];
  likeCount: number;
  commentsCount: number;
  bookMarkCount: number;
  isLiked: boolean;
  mentions: string[];
  isBookMarked: boolean;
}

export const EditPostContext = createContext({
  postData: {} as Ipost | null,
  setPostData: (postData: Ipost) => {},
  files: null as any,
  setFiles: null as any,
  deletedImages: [] as string[],
  setDeletedImages: (images: string[]) => {},
});

export function EditPostModal({
  children,
  postID,
}: {
  children: React.ReactNode;
  postID: number | string;
}) {
  const [openModal, setOpenModal] = useState(false);

  const [step, setStep] = useState(0);

  const [postData, setPostData] = useState(null as Ipost | null);
  const [files, setFiles] = useState<File[]>([]);
  const [deletedImages, setDeletedImages] = useState([] as string[]);
  const modalSize = "md";

  const token = Cookies.get("token");
  const getPostDetails = () => {
    return DisplayPostApi.get(`/${postID}`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    }).then((res) => {
      return res.data as Ipost;
    });
  };

  const { mutate } = useMutation({
    mutationFn: async () => {
      const formData = new FormData() as any;
      if (files?.length > 0) {
        for (let i = 0; i < files.length; i++) {
          formData.append("images", files[i]);
        }
      }
      formData.append("caption", postData?.caption);
      let arr: any = postData?.mentions;
      //   .replaceAll("@", "")
      //   .split(" ")
      //   .filter((m) => m !== "");
      // console.log(arr);

      for (let i = 0; i < arr.length; i++) {
        formData.append(`mentions[${i}]`, arr[i]);
      }

      return EditPostApi.put(`/${postID}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
      });
    },
    onSuccess: () => {
      setOpenModal(false);
    },
  });
  const { data, status, error } = useQuery({
    queryKey: ["postdetails"],
    queryFn: async () => {
      const data = await getPostDetails();
      setPostData(data);
      return data;
    },
  });

  function stepTick() {
    if (step === 2) {
      // validate caption
      // if get error
      mutate();
    }
    setStep(step + 1);
  }

  return (
    <>
      <button onClick={() => setOpenModal(true)}>{children}</button>
      <EditPostContext.Provider
        value={{
          postData: postData,
          setPostData: setPostData,
          files: files,
          setFiles: setFiles,
          deletedImages: deletedImages,
          setDeletedImages: setDeletedImages,
        }}
      >
        <Modal
          size={modalSize}
          show={openModal}
          dismissible
          onClose={() => setOpenModal(false)}
        >
          <Modal.Header>ویرایش پست</Modal.Header>
          <Modal.Body>
            {status == "pending" && (
              <>
                <div>در حال بارگزاری...</div>
              </>
            )}
            {step === 0 ? (
              <AddPhoto />
            ) : step === 1 ? (
              <CaptionPage />
            ) : step === 2 ? (
              <MentionPost />
            ) : null}
          </Modal.Body>
          <Modal.Footer className="">
            <Button
              className="bg-white border-none"
              onClick={() => setOpenModal(false)}
            >
              پشیمون شدم
            </Button>
            <Button
              className="text-white text-center mr-1 flex border-solid rounded-2xl bg-[#EA5A69] w-[62px] h-[36px] text-sm justify-center items-center px-[8px] py-[16px] "
              onClick={() => stepTick()}
            >
              بعدی
            </Button>
          </Modal.Footer>
        </Modal>
      </EditPostContext.Provider>
    </>
  );
}
