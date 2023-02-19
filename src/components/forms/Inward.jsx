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
  device: "",
  brand: "",
  tagNumber: "",
  RAM : "",
  purchasedDate : ""
};
const validation = Yup.object({
  device : Yup.string().required("Required!"),
  brand : Yup.string().required("Required!"),
  tagNumber : Yup.string().required("Required!"),
  RAM : Yup.string().required("Required!"), 
  purchasedDate : Yup.string().required("Required!")
})

const Inward = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const navigate = useNavigate()

  const { values, errors, handleBlur, touched, handleChange, handleSubmit  } =
  useFormik({
    initialValues: initialValues,
    validationSchema: validation,
    onSubmit : 
    async function EnterDevice(){
      const response = await fetch('http://127.0.0.1:5000/api/inwards' , {
        method : "POST",
        headers:{
          'Content-Type' : 'application/json'
        },
        body : JSON.stringify({
          device : values.device,
          brand : values.brand,
          tagNumber : values.tagNumber,
          RAM : values.RAM,
          purchasedDate : values.purchasedDate
        })
      })
      const data = await response.json()
      console.log(data);
      if(data.status === 'ok'){
        navigate('/inventory')
      }
    }
  });

  useEffect(()=>{
    const token = Cookies.get('token')
    const role = Cookies.get('role')
    if(!token || role !== 'manager'){
        navigate('/dashboard')
    }
  })
  return (
    <React.Fragment>
      <React.Fragment>
      <div className="register">
      <Header className='header' title="Inward_Inventory_Form" subtitle='Enter a new device to inventory'/>
      <div className="card-body">
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <input
            style={{backgroundColor : colors.primary[400]}}
              type="text"
              autoComplete="off"
              name="device"
              placeholder="Device..."
              value={values.device}
                    onChange={handleChange}
                    onBlur={handleBlur}
              className="field form-control"
            />
             {errors.device && touched.device ? (
                        <p className="text-danger">{errors.device}</p>
                      ) : null}
          </div>
          <div className="form-group">
            <input
            style={{backgroundColor : colors.primary[400]}}
              type="text"
              autoComplete="off"
              name="brand"
              placeholder="Brand..."
              value={values.brand}
                    onChange={handleChange}
                    onBlur={handleBlur} 
              className="field form-control"
            />
            {errors.brand && touched.brand ? (
                            
                            <p className="text-danger mt-3  ">{errors.brand}</p> 
                          ) : null}
          </div>
          <div className="form-group">
            <input
            style={{backgroundColor : colors.primary[400]}}
              type="text"
              autoComplete="off"
              name="tagNumber"
              placeholder="Tag..Number..."
              value={values.tagNumber}
              onChange={handleChange}
              onBlur={handleBlur}
              className="field form-control"
            />
            {errors.tagNumber && touched.tagNumber ? (
                            
                            <p className="text-danger mt-3  ">{errors.tagNumber}</p> 
                          ) : null}
          </div>
          <div className="form-group">
            <input
            style={{backgroundColor : colors.primary[400]}}
              type="text"
              autoComplete="off"
              name="RAM"
              placeholder="RAM..."
              value={values.RAM}
              onChange={handleChange}
              onBlur={handleBlur}
              className="field form-control"
            />
            {errors.RAM && touched.RAM ? (
                            
                            <p className="text-danger mt-3  ">{errors.RAM}</p> 
                          ) : null}
          </div>
          <div className="form-group">
            <input
            style={{backgroundColor : colors.primary[400]}}
              type="date"
              autoComplete="off"
              name="purchasedDate"
              placeholder="Purchased Date..."
              value={values.purchasedDate}
              onChange={handleChange}
              onBlur={handleBlur}
              className="field form-control"
            />
           {errors.purchasedDate && touched.purchasedDate ? (
                            
                            <p className="text-danger mt-3  ">{errors.purchasedDate}</p> 
                          ) : null}
          </div>
          <div className="">
            <input type="submit" value="Submit" className="button" />
          </div>
        </form>
      </div>
      </div>
    </React.Fragment>
    </React.Fragment>
  )
}

export default Inward