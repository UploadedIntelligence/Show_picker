import { useEffect, useState } from "react";
import { Route, Routes } from "react-router-dom";
import "./App.css";
import { MainPage } from "./MainPage.tsx";
import { Login } from "./Login.tsx";
import { UserRegistration } from "./UserRegistration.tsx";
import axios from "axios";
import {
  CurrentUserContext,
  type ICurrentUserContext,
} from "./contexts/current-user-context.ts";

function App() {
  const [loggedUser, setLoggedUser] = useState<
    ICurrentUserContext["loggedUser"] | null
  >(null);

  useEffect(() => {
    async function fetchUser() {
      await axios
        .get<{
          user: {
            username: string;
            email: string;
            id: number;
            iat: number;
            exp: number;
          };
        }>("http://localhost:9000/user", { withCredentials: true })
        .then((res) =>
          setLoggedUser({
            username: res.data.user.username,
            email: res.data.user.email,
            id: res.data.user.id,
          }),
        );
    }

    fetchUser();
  }, []);

  return (
    <CurrentUserContext.Provider value={{ loggedUser }}>
      <Routes>
        <Route path="" element={<MainPage />}></Route>
        <Route
          path="/login"
          element={<Login setLoggedUser={setLoggedUser} />}
        />
        <Route path="/register" element={<UserRegistration />} />
      </Routes>
    </CurrentUserContext.Provider>
  );
}

export default App;
