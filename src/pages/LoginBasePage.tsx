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
          <Route path="/addphoto" element={<AddPhoto />} />

          {/* Protected Routes */}
          <Route element={<RequireAuth />}>
            <Route path="/" element={<Profile />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/saved" element={<Saved />} />
            <Route path="/editpage" element={<EditProfile />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
};
