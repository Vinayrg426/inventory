import React from "react";
import { Sidebar, Menu, MenuItem } from "react-pro-sidebar";
import { tokens } from "../../theme";
import { useTheme } from "@mui/material";
import { Link } from "react-router-dom";
import { useState } from "react";
import { useEffect } from "react";
import avatar from "../utils/profile.png";
import admin from '../utils/admin.png'
import manager from '../utils/manager.png'
import user from '../utils/user.png'
import {MdInventory} from 'react-icons/md'
import {MdOutlineManageAccounts} from 'react-icons/md'
import {MdOutlineInventory} from 'react-icons/md'
import {MdFormatAlignLeft} from 'react-icons/md'
import {AiOutlineUserAdd} from 'react-icons/ai'
import {RiFolderSettingsFill} from 'react-icons/ri'
import {FaLaptopCode} from 'react-icons/fa'
import {FiLogOut} from 'react-icons/fi'
import {BsGraphUp} from 'react-icons/bs'
import Cookies from 'cookies-js';
 


const SideMenu = (props) => {
  const [designation, setDesignation] = useState("");
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [username, setUsername] = useState('')
  const [role, setRole] = useState('')
  const [token, setToken] = useState('')
  

  const logout = () => {
    Cookies.set('token' , '' ,{expires : -1});
    Cookies.set('role' , '' ,{expires : -1});
    Cookies.set('username' , '' ,{expires : -1});
  };

  
  useEffect(()=>{
    let name = Cookies.get('username')
    let role = Cookies.get('role')
    const token = Cookies.get('token')
    setUsername(name)
    setRole(role)
    setToken(token)

  },[])
  return (
    <div>

        {
          (token) ? <Sidebar>
          <main
            style={{
              display: "flex",
              backgroundColor: colors.primary[400],
              color: colors.primary[300],
              borderRadius: "3px",
              justifyContent: 'center'
            }}
          >
            <div className="text-center">
       <Menu
            style={{
              backgroundColor: colors.primary[400],
              color: colors.primary[100],
            }}
          >
            <p
              className="lead"
              style={{
                backgroundColor: colors.primary[400],
                color: colors.primary[100],
              }}
            >
              WELCOME
            </p>
            {
              (role === 'Admin') ? 
              <React.Fragment>
                <img height='100px' width='100px' src={admin}/>
              </React.Fragment> : null
            }
            {
              (role === 'user') ? 
              <React.Fragment>
                <img height='100px' width='100px' src={user}/>
              </React.Fragment> : null
            }
            {
              (role === 'manager') ? 
              <React.Fragment>
                <img height='150px' width='150px' src={manager}/>
              </React.Fragment> : null
            }
            <p className="lead text-uppercase text-bg-primary">{username}</p>
            <small>{role}</small>
          </Menu>
          <hr style={{
                backgroundColor: colors.primary[400],
                color: colors.primary[900],
              }}></hr>
        </div >
          </main>
          <Menu
            className="custom"
            style={{
              display: "flex",
              backgroundColor: colors.primary[400],
              color: colors.primary[300],
              borderRadius: "3px",
            }}
          >
            {
              (role === 'manager') ? 
              <>
              <MenuItem routerLink={<Link to="/dashboard" />}>
              <BsGraphUp/> <span className="ml-3">Dashboard</span>
            </MenuItem>
              {/* <MenuItem routerLink={<Link to="/register" />}>
              <AiOutlineUserAdd/> <span className="ml-3">Register New user</span>
            </MenuItem> */}
            <MenuItem routerLink={<Link to="/userdata" />}>
            <MdOutlineManageAccounts/> <span className=" ml-3">Manage Users</span>
            </MenuItem>
            <MenuItem routerLink={<Link to="/inventory" />}>
              <RiFolderSettingsFill/> <span className=" ml-3">Manage Inventory</span>
            </MenuItem>
            {/* <MenuItem routerLink={<Link to="/inward" />}>
              <MdFormatAlignLeft/><span className=" ml-3">Add New Device</span>
            </MenuItem> */}
            <MenuItem routerLink={<Link to="/outward" />}>
              <FaLaptopCode/><span className=" ml-3">Assign Device</span>
            </MenuItem>
            </>
               : null
            }
            <MenuItem routerLink={<Link to="/" />} onClick={logout}>
            <FiLogOut/><span className=" ml-3">Logout</span>
            </MenuItem>
          </Menu>
        </Sidebar> : null
        }
    </div>
  );
};

export default SideMenu;
