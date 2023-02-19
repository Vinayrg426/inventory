import { React, useEffect, useState } from "react";
import Topbar from "./components/global/Topbar";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { ColorModeContext, useMode } from "./theme";
import { ProSidebarProvider } from "react-pro-sidebar";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import SideMenu from "./components/global/SideMenu";
import Registration from "./components/forms/Registration";
import InventoryData from "./components/data/InventoryData";
import UserData from "./components/data/UserData";
import UserdatUpdate from "./components/forms/UserdatUpdate";
import Inward from "./components/forms/Inward";
import UpdateDeviceData from "./components/forms/UpdateDeviceData";
import Login from "./components/forms/Login";
import Dashboard from "./components/dashboard/Dashboard";
import { useLocation } from "react-router-dom";
import AssignDevice from "./components/forms/AssignDevice";
import ResetPassword from "./components/forms/ResetPassword";
import Home from "./components/home/Home";

function App(props) {
  const [role, setRole] = useState('')
  const [token, setToken] = useState('')
  const location = useLocation()

  useEffect(()=>{
    const token = sessionStorage.getItem('token')
    setToken(token)
    const role = sessionStorage.getItem('role')
    setRole(role)
  },[])
  const [theme, colorMode] = useMode();
  return (
    <div>
      <ColorModeContext.Provider value={colorMode}>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <div className="app">
            <ProSidebarProvider>
            {
              (location.pathname !== '/login') && (location.pathname !== '/')? <SideMenu/>: null
            }
            </ProSidebarProvider>
            <main className="content">
            {
              (location.pathname !== '/')? <Topbar/>: null
            }
              <Routes>
              <Route path="/" element={<Home/>}/>
              <Route path="/dashboard" element={<Dashboard/>}/>
                <Route path="/register" element={<Registration/>}/>
                <Route path="/login" element={<Login/>}/>
                <Route path="/userdata" element={<UserData/>}/>
                <Route path="/inventory" element={<InventoryData/>}/>
                <Route path="/users/:user_id" element={<UserdatUpdate/>}/>
                <Route path="/inward" element={<Inward/>}/>
                <Route path="/inwards/:inward_id" element={<UpdateDeviceData/>}/>
                <Route path="/outward" element={<AssignDevice/>}/>
                <Route path="/reset" element={<ResetPassword/>}/>
              </Routes>
            </main>
          </div>
        </ThemeProvider>
      </ColorModeContext.Provider>
    </div>
  );
}

export default App;
