import { Routes, Route, Link, BrowserRouter } from "react-router-dom";
import { Login } from "./Login";
import { NewPass } from "./NewPass";
import { PassRecovery } from "./PassRecovery";
import { Signup } from "./Signup";
import { Profile } from "./Profile";
import { EmailSent } from "./EmailSent";
import { EditProfile } from "./EditProfile";
import RequireAuth from "../components/RequireAuth";
import { ErrorPage } from "./Error";
import { AddPhoto } from "../components/AddPhoto";
import { Saved } from "./Saved";
import { Messages } from "./Messages";
import { Search } from "./Search";
import { Explore } from "./Explore";
import { Tags } from "./Tags";
import { Notifs } from "./Notifs";
import { CaptionPage } from "../components/CaptionPage";
import { SendPost } from "../components/SendPost";
import { CreatePost } from "./CreatePost";
import { PostPage } from "./PostPage";

export const LoginBasePage = () => {
  return (
    <>
      <BrowserRouter>
        <Routes>
          {/* Public Routes */}
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/forgotpass" element={<PassRecovery />} />
          <Route path="/reset-password" element={<NewPass />} />
          <Route path="/email-sent-page" element={<EmailSent />} />
          <Route path="/error" element={<ErrorPage />} />
          {/* <Route path="/addphoto" element={<AddPhoto />} />
          <Route path="/addcaption" element={<CaptionPage />} />
          <Route path="/sendpost" element={<SendPost />} /> */}
          <Route path="*" element={<ErrorPage />} />


          {/* Protected Routes */}
          <Route element={<RequireAuth />}>
            <Route path="/" element={<Profile />} />
            <Route path="/post/:id" element={<PostPage />} />
            <Route path="/profile/:username?" element={<Profile />} />
            <Route path="/saved" element={<Saved />} />
            <Route path="/messages" element={<Messages />} />
            <Route path="/search" element={<Search />} />
            <Route path="/explore" element={<Explore />} />
            <Route path="/tags" element={<Tags />} />
            <Route path="/Notifs" element={<Notifs />} />
            <Route path="/editpage" element={<EditProfile />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
};
