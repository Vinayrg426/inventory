import React from "react";
import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { useState } from "react";
import { tokens } from "../../theme";
import { useTheme } from "@mui/material";
const UpdateUser = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [employeeId, setEmployeeId] = useState("");
  const [role, setRole] = useState("");
  const navigate = useNavigate();
  const params = useParams();
  const userid = params.user_id;

  useEffect(() => {
    let dataUrl = `http://127.0.0.1:5000/api/users/${userid}`;
    axios
      .get(dataUrl)
      .then((res) => {
        // console.log(res.data);
        setUsername(res.data.user.username);
        setEmail(res.data.user.email);
        setPhone(res.data.user.phone);
        setEmployeeId(res.data.user.employeeId);
        setRole(res.data.user.role);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  let handleSubmit = (e) => {
    e.preventDefault();
    axios
      .put(`http://127.0.0.1:5000/api/users/${userid}`, {
        username,
        email,
        phone,
        employeeId,
        role,
      })
      .then((res) => {
        console.log("user updated");
        navigate("/userdata");
      })
      .catch((error) => {
        console.log(error);
      });
  };
  return (
    <React.Fragment>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <input
            style={{backgroundColor : colors.primary[400]}}
            type="text"
            name="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="username"
            className="form-control field"
          />
        </div>
        <div className="form-group">
          <input
            type="text"
            style={{backgroundColor : colors.primary[400]}}
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="email"
            className="form-control field"
          />
        </div>
        <div className="form-group">
          <input
            type="text"
            style={{backgroundColor : colors.primary[400]}}
            name="employeeId"
            value={employeeId}
            onChange={(e) => setEmployeeId(e.target.value)}
            placeholder="employeeId"
            className="form-control field"
          />
        </div>
        <div className="form-group">
          <input
            type="text"
            style={{backgroundColor : colors.primary[400]}}
            name="role"
            value={role}
            onChange={(e) => setRole(e.target.value)}
            placeholder="role"
            className="form-control field"
          />
        </div>
        <div className="">
          <input
            type="submit"
            value="update user"
            className="btn btn-primary btn-sm"
          />
        </div>
      </form>
    </React.Fragment>
  );
};

export default UpdateUser;
