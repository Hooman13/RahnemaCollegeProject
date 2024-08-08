import { Routes, Route, Link, BrowserRouter } from "react-router-dom";
import { Login } from "./Login";
import { NewPass } from "./NewPass";
import { PassRecovery } from "./PassRecovery";
import { Signup } from "./Signup";
import { Profile } from "./Profile";

export const LoginBasePage = () => {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/forgotpass" element={<PassRecovery />} />
          <Route path="/newpass" element={<NewPass />} />
          <Route path="/profile" element={<Profile />} />
        </Routes>
      </BrowserRouter>
    </>
  );
};
