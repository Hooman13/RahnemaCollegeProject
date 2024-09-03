import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { array, string, z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { EditProfileApi } from "../api/axios";
import { Link } from "react-router-dom";
import { Button, Modal } from "flowbite-react";
import { ToastR } from "../components/controles/ToastR";
import { useEffect } from "react";
import Cookies from "js-cookie";
import { UserInfoApi } from "../api/axios";
import { Spinner } from "flowbite-react";

const FormSchema = z.object({
  isPrivate: z.boolean(),
  bio: z.string().optional(),
  fName: z.string().min(3, "نام باید شامل حداقل ۳ حرف باشد").optional(),
  lName: z
    .string()
    .min(3, "نام خانوادگی باید شامل حداقل ۳ حرف باشد")
    .optional(),
  email: z.string().email("ایمیل وارد شده نامعتبر است").optional(),
  password: z.optional(z.string().min(8, "رمزعبور باید حداقل شامل ۸ حرف باشد")),
  confirmPassword: z.optional(z.string().min(8)),
});

type FormData = z.infer<typeof FormSchema>;
interface IProps {
  openModal: boolean;
  setOpenModal: React.Dispatch<React.SetStateAction<boolean>>;
}
export const EditProfile: React.FC<IProps> = ({ openModal, setOpenModal }) => {
  // show toast after successfully profile edited
  const [displayToast, setDispalyToast] = useState(false);
  const [toastMsg, setToastMsg] = useState("");
  const [toastType, setToastType] = useState("basic");
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setDispalyToast(false);
    }, 3000);
    return () => clearTimeout(timeoutId);
  }, [displayToast]);

  // modalSize
  const modalSize = "md";

  // show selected photos
  const [selectedImages, setSelectedImages] = useState([{}]);
  const [photo, setPhoto] = useState<string | undefined>();
  const [file, setFile] = useState<File>();
  const [isLoading, setIsLoading] = useState(false);

  // update profile edits
  const token = Cookies.get("token");
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(FormSchema),
  });
  const [user, setUser] = useState({
    data: {
      bio: "",
      email: "",
      fName: "",
      imageUrl: "",
      isPrivate: false,
      lName: "",
      username: "",
    },
  });
  const [isUserUpdated, setIsUserUpdated] = useState(false);
  const userName = Cookies.get("username");
  // const token = Cookies.get("token");
  const getProfileData = async () => {
    try {
      const data: any = await UserInfoApi.get(userName ?? "", {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      setUser(data);
      setIsUserUpdated(false);
    } catch (error) {
      console.log({ error });
    }
  };
  //
  useEffect(() => {
    getProfileData();
  }, [token, isUserUpdated]);

  useEffect(() => {
    if (user) {
      setFormInput({
        ...formInput,
        fName: user.data.fName,
        lName: user.data.lName,
        email: user.data.email,
        bio: user.data.bio,
      });
    }
  }, [user]);

  const onSubmit = () => {
    setIsLoading(true);
    // console.log(data);
    const formData = new FormData();
    if (typeof file !== "undefined") formData.append("image", file);
    formData.append("fName", formInput.fName);
    formData.append("lName", formInput.lName);
    formData.append("bio", formInput.bio);
    formData.append("email", formInput.email);
    formData.append("password", formInput.password);
    formData.append("confirmPassword", formInput.confirmPassword);

    EditProfileApi.put("", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => {
        if (response.status === 200) {
          setToastMsg("پروفایل با موفقیت ویرایش شد");
          setToastType("success");
          setDispalyToast(true);
          setTimeout(() => {
            window.location.reload();
          }, 1);
          setTimeout(() => {
            setOpenModal(false);
          }, 2000);
        }
      })
      .catch((err) => console.log(err))
      .finally(() => {
        setIsLoading(false);
      });
  };
  interface formInput {
    bio: string | undefined;
    email: string | undefined;
    fName: string | undefined;
    isPrivate: boolean;
    lName: string | undefined;
    username: string | undefined;
    password: string | undefined;
    confirmPassword: string | undefined;
  }
  const [formInput, setFormInput] = useState({
    bio: "",
    email: "",
    fName: "",
    isPrivate: false,
    lName: "",
    username: "",
    password: "",
    confirmPassword: "",
  });
  const [formError, setFormError] = useState({
    confirmPassword: "",
  });
  const handleUserInput = (name: string, value?: string) => {
    setFormInput({
      ...formInput,
      [name]: value,
    });
  };

  const validatePassInputs = (e: any) => {
    e.preventDefault();
    let formError = {
      confirmPassword: "",
    };
    if (formInput.confirmPassword !== formInput.password) {
      setFormError({
        ...formError,
        confirmPassword: "تکرار رمزعبور با رمزعبور یکسان نیست",
      });
      return;
    }
    setFormError(formError);
    setFormInput((prev) => ({
      ...prev,
    }));
  };

  // use last update for fields

  const handleOnChangePhoto = (e: React.FormEvent<HTMLInputElement>) => {
    const target = e.target as HTMLInputElement & {
      files: FileList;
    };
    const selectedPhotos = target.files;
    const selectedPhotosArray = Array.from(selectedPhotos);
    setFile(selectedPhotosArray[0]);
    setPhoto(URL.createObjectURL(target.files[0]));
  };

  return (
    <>
      <Modal
        size={modalSize}
        show={openModal}
        onClose={() => setOpenModal(false)}
      >
        <Modal.Body className=" flex w-auto items-center justify-center py-7 rounded-3xl   ">
          {displayToast && <ToastR type={toastType}>{toastMsg}</ToastR>}
          <form className="items-center" onSubmit={handleSubmit(onSubmit)}>
            <section>
              <div className="text-center text-sm justify-center font-bold mb-3">
                ویرایش حساب
              </div>
              <div className="w-full flex items-center justify-center mb-1">
                <div className="flex relative items-center justify-center  rounded-full w-[65px] h-[65px] border-[#F7901E] border-2">
                  <input
                    type="file"
                    accept="image/png,image/jpg"
                    onChange={handleOnChangePhoto}
                    className="absolute top-0 right-0 left-0 bottom-0 opacity-0 cursor-pointer z-50 "
                  />
                  {!file && (
                    <div className="z-0">
                      <img
                        className="flex relative items-center justify-center  rounded-full w-[60px] h-[60px] border-2"
                        src={`http://37.32.5.72${user.data.imageUrl}`}
                        alt=""
                      />
                    </div>
                  )}
                  {file && (
                    <div className="z-0">
                      <img
                        className="flex relative items-center justify-center  rounded-full w-[60px] h-[60px] border-2"
                        src={photo}
                        alt=""
                      />
                    </div>
                  )}
                </div>
              </div>
              <div className="flex justify-center">
                <p className="text-xs font-medium">عکس پروفایل</p>
              </div>
              <div className="mt-3">
                <div className="mb-3">
                  <input
                    type="text"
                    {...register("fName")}
                    value={formInput.fName}
                    onChange={({ target }) => {
                      handleUserInput(target.name, target.value);
                    }}
                    placeholder="نام"
                    className="text-sm border rounded-2xl w-full text-right px-2 py-[2px] focus:outline-none focus:ring-0 focus:border-gray-600"
                  />
                  {errors?.fName?.message && (
                    <p className="text-red-700">{errors.fName.message}</p>
                  )}
                </div>
                <div className="mb-3">
                  <input
                    type="text"
                    {...register("lName")}
                    value={formInput.lName}
                    onChange={({ target }) => {
                      handleUserInput(target.name, target.value);
                    }}
                    placeholder="نام خانوادگی"
                    className="text-sm border text-right rounded-2xl w-full px-2 py-[2px] focus:outline-none focus:ring-0 focus:border-gray-600"
                  />
                  {errors?.lName?.message && (
                    <p className="text-red-700">{errors.lName.message}</p>
                  )}
                </div>
                <div className="mb-3">
                  <input
                    type="text"
                    {...register("email")}
                    value={formInput.email}
                    onChange={({ target }) => {
                      handleUserInput(target.name, target.value);
                    }}
                    placeholder="ایمیل"
                    className="text-sm border text-right rounded-2xl w-full px-2 py-[2px] focus:outline-none focus:ring-0 focus:border-gray-600"
                  />
                  {errors?.email?.message && (
                    <p className="text-red-700">{errors.email.message}</p>
                  )}
                </div>
                <div className="mb-3  ">
                  <input
                    type="password"
                    {...register("password")}
                    value={formInput.password}
                    // onClick={() => {
                    //   setValue("password", `${user.data.password}`);
                    // }}
                    placeholder="رمز عبور جدید"
                    onChange={({ target }) => {
                      handleUserInput(target.name, target.value);
                    }}
                    className="text-sm border text-right rounded-2xl w-full px-2 py-[2px] focus:outline-none focus:ring-0 focus:border-gray-600"
                  />
                  {errors?.password?.message && (
                    <p className="text-red-700">{errors.password.message}</p>
                  )}
                </div>
                <div className="mb-3">
                  <input
                    type="password"
                    {...register("confirmPassword")}
                    value={formInput.confirmPassword}
                    onChange={({ target }) => {
                      handleUserInput(target.name, target.value);
                    }}
                    onKeyUp={validatePassInputs}
                    placeholder="تکرار رمز عبور"
                    className="text-sm border text-right rounded-2xl w-full px-2 py-[2px] focus:outline-none focus:ring-0 focus:border-gray-600"
                  />
                  <p className="text-red-700">{formError.confirmPassword}</p>
                </div>
              </div>
              <div>
                <label className="flex justify-start items-center mb-2  text-sm   cursor-pointer">
                  <span className="ms-3 text-xs ml-2 font-medium ">
                    پیچ خصوصی باشه
                  </span>
                  <input
                    type="checkbox"
                    {...register("isPrivate")}
                    value=""
                    className="sr-only peer"
                  />

                  <div className="relative w-11 h-6 bg-gray-200 border-[0.5px] peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-white dark:peer-focus:ring-white rounded-full peer dark:bg-white peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
                </label>
              </div>
              <div className="text-right text-xs mb-3 ">
                <p className="text-[#17494D] pb-3">بایو</p>
                <textarea
                  className="w-[320px] h-[68px] border solid border-[#17494D]/50 rounded-xl"
                  {...register("bio")}
                  value={formInput.bio}
                  onChange={({ target }) => {
                    handleUserInput(target.name, target.value);
                  }}
                />
              </div>
              <div className="flex items-center justify-end text-sm text-center">
                <div>
                  <button
                    className="text-center mr-1 flex border-solid  text-white rounded-2xl bg-[#EA5A69] h-7 text-xs font-semibold justify-center items-center px-8 py-[16px] "
                    type={"submit"}
                  >
                    {!isLoading && <span>ثبت تغییرات</span>}
                    {isLoading && (
                      <Spinner aria-label="edit..." size="sm"></Spinner>
                    )}
                  </button>
                </div>
                <div className="pr-5 text-xs font-semibold ">
                  <Link to="/profile">
                    <button onClick={() => setOpenModal(false)}>
                      پشیمون شدم
                    </button>
                  </Link>
                </div>
              </div>
              {/* </div> */}
            </section>
          </form>
        </Modal.Body>
      </Modal>
    </>
  );
};
