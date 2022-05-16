import React from "react";
import AuthProvider from "./components/AuthProvider/AuthProvider";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import HomePage from "./pages/HomePage/HomePage";
import PageNotFound from "./pages/PageNotFound/PageNotFound";
import PetsNavbar from "./components/PetsNavbar/PetsNavbar";
import { Route, Routes } from "react-router-dom";
import SearchPetPage from "./pages/SearchPetsPage/SearchPetPage";
import MyProfile from "./pages/MyProfile/MyProfile";
import ProtectedRoute from "./components/ProtectedRoute/ProtectedRoute";
import ProtectedRouteAdmin from "./components/ProtectedRoute/ProtectedRouteAdmin";
import AddPet from "./pages/AddPet/AddPet";
import PetPage from "./pages/PetPage/PetPage";
import GetPets from "./pages/GetPets/GetPets";
import GetUsers from "./pages/GetUsers/GetUsers";
import UserPage from "./pages/UserPage/UserPage";
import MyPets from "./pages/MyPets/MyPets";

function App() {
  return (
    <AuthProvider>
      <PetsNavbar />
      <Routes>
        <Route path="/">
          <Route index element={<HomePage />} />
          <Route path="/pets">
            <Route index element={<SearchPetPage />} />
            <Route path=":id" element={<PetPage />} />
          </Route>
          <Route
            path="/profile"
            element={
              <ProtectedRoute>
                {" "}
                <MyProfile />
              </ProtectedRoute>
            }
          />
          <Route
            path="/mypets"
            element={
              <ProtectedRoute>
                {" "}
                <MyPets />
              </ProtectedRoute>
            }
          />
          <Route path="*" element={<PageNotFound />} />
        </Route>
        <Route path="/admin">
          <Route
            path="addpet"
            element={
              <ProtectedRoute>
                <ProtectedRouteAdmin>
                  {" "}
                  <AddPet />
                </ProtectedRouteAdmin>
              </ProtectedRoute>
            }
          />
          <Route
            path="getpets"
            element={
              <ProtectedRoute>
                <ProtectedRouteAdmin>
                  <GetPets />
                </ProtectedRouteAdmin>
              </ProtectedRoute>
            }
          />
          <Route path="getusers">
            <Route
              index
              element={
                <ProtectedRoute>
                  <ProtectedRouteAdmin>
                    <GetUsers />
                  </ProtectedRouteAdmin>
                </ProtectedRoute>
              }
            />
            <Route
              path=":id"
              element={
                <ProtectedRoute>
                  <ProtectedRouteAdmin>
                    <UserPage />
                  </ProtectedRouteAdmin>
                </ProtectedRoute>
              }
            />
          </Route>
        </Route>
      </Routes>
    </AuthProvider>
  );
}

export default App;
