import axios from "axios";
const BASE_URL= process.env.REACT_APP_API_BASE_URL;
export const BaseApi = axios.create({
  baseURL: BASE_URL,
});

export const LoginApi = axios.create({
  baseURL: BASE_URL + "auth/login",
});

export const SignupApi = axios.create({
  baseURL: BASE_URL + "auth/signup",
});

export const CreatePostApi = axios.create({
  baseURL: BASE_URL + "posts",
});

export const DisplayPostApi = axios.create({
  baseURL: BASE_URL + "posts",
});

export const PostListApi = axios.create({
  baseURL: BASE_URL + "posts/user/",
});

export const FollowApi = axios.create({
  baseURL: BASE_URL + "follow/",
});

export const EditProfileApi = axios.create({
  baseURL: BASE_URL + "edit-profile",
});

export const UserInfoApi = axios.create({
  baseURL: BASE_URL,
});
