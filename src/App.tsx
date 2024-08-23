import React, { createContext, useState } from "react";
import { LoginBasePage } from "./pages/LoginBasePage";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
export const AuthContext = createContext({});

function App() {
  const [auth, setAuth] = useState({});
  const client = new QueryClient();
  return (
    <QueryClientProvider client={client}>
      <AuthContext.Provider value={{ auth, setAuth }}>
        <div className="App">
          <LoginBasePage />
        </div>
      </AuthContext.Provider>
    </QueryClientProvider>
  );
}

export default App;
