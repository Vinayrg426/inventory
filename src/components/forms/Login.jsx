import React, { useEffect }  from "react";
import {tokens } from "../../theme";
import { useTheme } from "@mui/material";
import { useFormik } from "formik";
import '../forms/Registration.css'
import * as Yup from 'yup'
import Header from '../Header'
import { useNavigate } from "react-router-dom";
import Cookies from 'cookies-js';
import { Link } from "react-router-dom";


const initialValues = {
    email: "",
    password: ""
  };

const Login = () => {
    const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const navigate = useNavigate()
  const LoginSchema = Yup.object({
    email : Yup.string().email().required("Required!"),
    password : Yup.string().required("Required!")
})
const { values, errors, handleBlur, touched, handleChange, handleSubmit  } =
  useFormik({
    initialValues: initialValues,
    validationSchema: LoginSchema,
    onSubmit : 
    async function loginUser (values) {
        const response = await fetch("http://localhost:5000/api/login" , {
      method : "POST",
      headers:{
        'Content-Type' : 'application/json'
      },
      body : JSON.stringify({
        email : values.email,
        password : values.password
      })
    })

    const data = await response.json()
    if(data.status === 'ok'){
      const token = data.token
      const client = data.user.user
      Cookies.set('token', token, { path: '/'});
      Cookies.set('role', client.role, { path: '/'});
      Cookies.set('username', client.username, { path: '/'});
      alert('login Successfull')
      navigate('/dashboard')
    }
    else{
      alert("please enter valid credentials")
    }
    }
  });

  useEffect(()=>{
    const token = Cookies.get('token')
    if(token){
      navigate('/dashboard')
    }
  })
  return (
    <React.Fragment>
        <Header title='LOGIN' subtitle='Login with your credentials'/>
        <form onSubmit={handleSubmit}>
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
          <div className="">
            <Link to='/reset'>Forgot Password?</Link>
            <input type="submit" value="Login" className="button" />
          </div>
        </form>
    </React.Fragment>
  )
}

export default Login