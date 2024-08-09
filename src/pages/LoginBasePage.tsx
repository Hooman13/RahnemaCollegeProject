import { Routes, Route, Link, BrowserRouter } from "react-router-dom";
import { Login } from "./Login";
import { NewPass } from "./NewPass";
import { PassRecovery } from "./PassRecovery";
import { Signup } from "./Signup";
import { Profile } from "./Profile";
import { EmailSent } from "./EmailSent";
import RequireAuth from "../components/RequireAuth";

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

          {/* Protected Routes */}
          <Route element={<RequireAuth />}>
            <Route path="/" element={<Profile />} />
            <Route path="/profile" element={<Profile />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
};
