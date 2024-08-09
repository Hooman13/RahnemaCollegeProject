import React, { createContext, useState } from "react";
import { LoginBasePage } from "./pages/LoginBasePage";
export const AuthContext = createContext({});

function App() {
  const [auth, setAuth] = useState({});

  return (
    <AuthContext.Provider value={{ auth, setAuth }}>
      <div className="App">
        <LoginBasePage />
      </div>
    </AuthContext.Provider>
  );
}

export default App;
