import React, { useEffect }  from "react";
import {tokens } from "../../theme";
import { useTheme } from "@mui/material";
import { useFormik } from "formik";
import '../forms/Registration.css'
import * as Yup from 'yup'
import Header from '../Header'
import { useNavigate } from "react-router-dom";
import Cookies from 'cookies-js';


const initialValues = {
  username: "",
  password: "",
  email: "",
  employeeId : "",
  role : ""
};
const Registration = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const navigate = useNavigate()
  const signUpSchema = Yup.object({
    username : Yup.string().min(3).max(25).required("Required!").matches(/^[a-z_-]{3,16}$/ , "username must contain only lowercase letters without spaces and special characters"),
    password : Yup.string().min(8).max(25).required("Required!").matches(/^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])[A-Za-z0-9_-]{8,16}$/ , "should contain minimum of 8 characters with 1 numbber and an Uppercase letter"),
    email : Yup.string().email().required("Required!"),
    employeeId : Yup.string().min(4).max(25).required("Required!").matches(/^[A-Za-z0-9_-]{3,16}$/ , "employee Id should not have spaces and special characters"),
    role : Yup.string().required("Required!").matches(/^[A-Za-z_(.)]{3,16}/  , "Designation must contain only lowercase letters without spaces"),
})
const { values, errors, handleBlur, touched, handleChange, handleSubmit  } =
  useFormik({
    initialValues: initialValues,
    validationSchema: signUpSchema,
    onSubmit : 
    async function registerUser(){
      const response = await fetch('http://127.0.0.1:5000/api/users' , {
        method : "POST",
        headers:{
          'Content-Type' : 'application/json'
        },
        body : JSON.stringify({
          username : values.username,
          password : values.password,
          email : values.email,
          employeeId : values.employeeId,
          role : values.role
        })
      })
      const data = await response.json()
      console.log(data);
      if(data.status === 'ok'){
        navigate('/userdata')
      }
    }
  });

 useEffect(()=>{
      const token = Cookies.get('token',{ path: '/'});
      const role = Cookies.get('role', { path: '/'});
      const name = Cookies.get('username',{ path: '/'});
      console.log(token);
      console.log(role);
      console.log(name);
      if(role !== 'manager'){
        navigate('/dashboard')
      }
 } , [])

  return (
    <React.Fragment>
      <div className="register">
      <Header className='header' title="Registration Form" subtitle='Create a New User Profile'/>
      <div className="card-body">
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <input
            style={{backgroundColor : colors.primary[400]}}
              type="text"
              autoComplete="off"
              name="username"
              placeholder="Username..."
              value={values.username}
                    onChange={handleChange}
                    onBlur={handleBlur}
              className="field form-control"
            />
             {errors.username && touched.username ? (
                        <p className="text-danger">{errors.username}</p>
                      ) : null}
          </div>
          <div className="form-group">
            <input
            style={{backgroundColor : colors.primary[400]}}
              type="email"
              autoComplete="off"
              name="email"
              placeholder="Email..."
              value={values.email}
                    onChange={handleChange}
                    onBlur={handleBlur} 
              className="field form-control"
            />
            {errors.email && touched.email ? (
                            
                            <p className="text-danger mt-3  ">{errors.email}</p> 
                          ) : null}
          </div>
          <div className="form-group">
            <input
            style={{backgroundColor : colors.primary[400]}}
              type="password"
              autoComplete="off"
              name="password"
              placeholder="Password..."
              value={values.password}
              onChange={handleChange}
              onBlur={handleBlur}
              className="field form-control"
            />
            {errors.password && touched.password ? (
                            
                            <p className="text-danger mt-3  ">{errors.password}</p> 
                          ) : null}
          </div>
          <div className="form-group">
            <input
            style={{backgroundColor : colors.primary[400]}}
              type="text"
              autoComplete="off"
              name="employeeId"
              placeholder="EmployeeId..."
              value={values.employeeId}
              onChange={handleChange}
              onBlur={handleBlur}
              className="field form-control"
            />
            {errors.employeeId && touched.employeeId ? (
                            
                            <p className="text-danger mt-3  ">{errors.employeeId}</p> 
                          ) : null}
          </div>
          <div className="form-group">
            <input
            style={{backgroundColor : colors.primary[400]}}
              type="text"
              autoComplete="off"
              name="role"
              placeholder="Role..."
              value={values.role}
              onChange={handleChange}
              onBlur={handleBlur}
              className="field form-control"
            />
           {errors.role && touched.role ? (
                            
                            <p className="text-danger mt-3  ">{errors.role}</p> 
                          ) : null}
          </div>
          <div className="">
            <input type="submit" value="Register" className="button" />
          </div>
        </form>
      </div>
      </div>
    </React.Fragment>
  );
};

export default Registration;
