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
import { Saved } from "./Saved";
import { Messages } from "./Messages";
import { Search } from "./Search";
import { Explore } from "./Explore";
import { Tags } from "./Tags";
import { Notifs } from "./Notifs";
import { PostPage } from "./PostPage";
import { FollowersList } from "./FollowersList";
import { Follow } from "../components/Follow";
import { UnFollow } from "../components/UnFollow";
import { Home } from "./Home";

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
          <Route path="/home" element={<Home />} />
          {/* <Route path="/addphoto" element={<AddPhoto />} />
          <Route path="/addcaption" element={<CaptionPage />} />
          <Route path="/sendpost" element={<SendPost />} /> */}
          {/* <Route path="/createpost" element={<CreatePost />} /> */}
          <Route path="*" element={<ErrorPage />} />

          {/* <Route path="/followerslist" element={<FollowersList />} /> */}

          {/* Protected Routes */}
          <Route element={<RequireAuth />}>
            <Route path="/" element={<Explore />} />
            <Route path="/post/:postId" element={<PostPage />} />
            <Route path="/profile/:username?" element={<Profile />} />
            <Route path="/saved" element={<Saved />} />
            <Route path="/messages" element={<Messages />} />
            <Route path="/search" element={<Search />} />
            <Route path="/explore" element={<Explore />} />
            <Route path="/tags" element={<Tags />} />
            <Route path="/Notifs" element={<Notifs />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
};
