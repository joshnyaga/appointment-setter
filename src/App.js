import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./Auth/Login";
import Register from "./Auth/Register";
import Nav from "./components/Bank/Nav/Nav";
import NavClient from "./components/Client/Nav/NavClient";
import AppointmentSettingPage from "./PagesClient/AppointmentSettingPage";
import MyAppointmentsPage from "./PagesClient/MyAppointmentsPage";
import LandingPage from "./PagesClient/LandingPage";
import AppointmentsAdminPage from "./PagesBank/AppointmentsAdminPage";
import LocationsPage from "./PagesBank/LocationsPage";
import UpdateLocationAdmin from "./PagesBank/UpdateLocationAdmin";
import AddLocationsPage from "./PagesBank/AddLocationsPage";
import RespondPage from "./PagesBank/RespondPage";
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/bank" element={<Nav/>}>
        <Route index element={<AppointmentsAdminPage/>}/>
        <Route path="locations" element={<LocationsPage/>}/>
        <Route path="locations-add" element={<AddLocationsPage/>}/>
        <Route path="location-update/*" element={<UpdateLocationAdmin/>}/>
        <Route path="respond/*" element={<RespondPage/>}/>
        </Route>
        <Route path="/client" element={<NavClient/>}>
        <Route index element={<AppointmentSettingPage/>}/>
        <Route path="myappointments" element={<MyAppointmentsPage/>}/>
        </Route>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
