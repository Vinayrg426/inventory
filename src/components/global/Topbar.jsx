import { Box, IconButton, useTheme } from "@mui/material";
import { useContext, useEffect } from "react";
import { ColorModeContext, tokens } from "../../theme";
import InputBase from "@mui/material/InputBase";
import LightModeOutlinedIcon from "@mui/icons-material/LightModeOutlined";
import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";
import NotificationsOutlinedIcon from "@mui/icons-material/NotificationsOutlined";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined";
import SearchIcon from "@mui/icons-material/Search";
import logo from '../utils/logo.png'
import { Link } from "react-router-dom";

const Topbar = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const colorMode = useContext(ColorModeContext);

  return (
    <Box  display="flex" justifyContent="space-between" p={2}>
      {/* RA INFO LOGO */}
      <Box
        display="flex"
        backgroundColor={colors.primary[400]}
        borderRadius="3px"
      >
        {theme.palette.mode === "dark" ? (
        <Link to='/'><img src={logo} alt="" width='230px' style={{backgroundColor:colors.primary[500]}}/></Link>
          ) : (
            <Link to='/'><img src={logo} alt="" width='230px' style={{backgroundColor:colors.primary[400]}}/></Link>
          )}
      </Box>
      {/* ICONS */}
    
      <Box display="flex">
        <IconButton onClick={colorMode.toggleColorMode} >
          {theme.palette.mode === "dark" ? (
            <LightModeOutlinedIcon />
          ) : (
            <DarkModeOutlinedIcon />
          )}
        </IconButton>
        {/* <IconButton>
          <NotificationsOutlinedIcon />
        </IconButton>
        <IconButton>
          <SettingsOutlinedIcon />
        </IconButton> */}
        <IconButton>
          <PersonOutlinedIcon />
        </IconButton>
      </Box>
    </Box>
  );
};

export default Topbar;