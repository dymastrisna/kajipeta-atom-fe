import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Grid from "./pages/grid/Grid";
import Sidebar from "./components/sidebar/Sidebar";

import "./App.css";
import Login from "./pages/login/Login";
import Allocationaccess from "./pages/allocationaccess/Allocationaccess";
import authStore from "./context/auth";
import Compare from "./pages/compare/Compare";
import MyData from "./pages/mydata/MyData";

function App() {
  const [user] = authStore((state) => [state.user]);
  const currentUser = false;
  const RequireAuth = ({ children }) => {
    return user.uid ? children : <Navigate to="/login" />;
  };

  return (
    <BrowserRouter>
      <div style={{ display: "flex" }}>
        <Routes>
          <Route element={<Sidebar />}>
            <Route
              index
              element={
                <RequireAuth>
                  <Grid />
                </RequireAuth>
              }
            />
            <Route
              path="/grid"
              element={
                <RequireAuth>
                  <Grid />
                </RequireAuth>
              }
            />
            <Route
              path="/akr"
              element={
                <RequireAuth>
                  <Grid />
                </RequireAuth>
              }
            />
            <Route
              path="/locationaccess"
              element={
                <RequireAuth>
                  <Allocationaccess />
                </RequireAuth>
              }
            />
            <Route
              path="/compare"
              element={
                <RequireAuth>
                  <Compare />
                </RequireAuth>
              }
            />
            <Route
              path="/mydata"
              element={
                <RequireAuth>
                  <MyData />
                </RequireAuth>
              }
            />
          </Route>
          <Route path="/login" element={<Login />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
