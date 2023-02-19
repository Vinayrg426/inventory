import React from 'react'
import { useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import axios from 'axios'
import Header from "../Header";
import { useState } from 'react'
import { tokens } from "../../theme";
import { useTheme } from "@mui/material";
import Cookies from 'cookies-js';

const UpdateUser = () => {
    const [device, setdevice] = useState('')
    const [brand, setbrand] = useState('')
    const [tagNumber, settagNumber] = useState('')
    const [RAM, setRAM] = useState('')
    const [purchasedDate, setpurchasedDate] = useState('')
    const navigate = useNavigate()
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
   const params = useParams()
   const inwardid = params.inward_id

   useEffect(()=>{
    const token = Cookies.get('token')
    const role = Cookies.get('role')
    if(!token || role !== 'manager'){
        navigate('/dashboard')
    }
    let dataUrl = `http://127.0.0.1:5000/api/inwards/${inwardid}`
    axios.get(dataUrl).then((res)=>{
        // console.log(res.data);
        setdevice(res.data.inward.device)
        setbrand(res.data.inward.brand)
        settagNumber(res.data.inward.tagNumber)
        setRAM(res.data.inward.RAM)
        setpurchasedDate(res.data.inward.purchasedDate)
    })
    .catch((error)=>{
        console.error(error);
    })
   },[])

   let handleSubmit = (e)=>{
        e.preventDefault()
        axios.put(`http://127.0.0.1:5000/api/inwards/${inwardid}` ,{
            device,
            brand,
            tagNumber,
            RAM,
            purchasedDate
        }).then((res)=>{
            console.log('device updated');
            navigate('/inventory')
        }).catch((error)=>{
            console.log(error);
        })
   }
  return (
    <React.Fragment>
        <Header title='Update Device Info' />
        
            
                       
                                <form onSubmit={handleSubmit}>
                                    <div className="form-group">
                                        <input type="text"
                                        style={{backgroundColor : colors.primary[400]}} 
                                        name='device'
                                        value={device}
                                        onChange={e=>setdevice(e.target.value)}
                                        placeholder='Deice...'
                                        className="form-control field" />
                                    </div>
                                    <div className="form-group">
                                        <input type="text" 
                                        style={{backgroundColor : colors.primary[400]}}
                                        name='brand'
                                        value={brand}
                                        onChange={e=>setbrand(e.target.value)}
                                        placeholder='Brand...'
                                        className="form-control field" />
                                    </div>
                                    <div className="form-group">
                                        <input type="text" 
                                        style={{backgroundColor : colors.primary[400]}}
                                        name='tagNumber'
                                        value={tagNumber}
                                        onChange={e=>settagNumber(e.target.value)}
                                        placeholder='TagNumber...'
                                        className="form-control field" />
                                    </div>
                                    <div className="form-group">
                                        <input type="text" 
                                        style={{backgroundColor : colors.primary[400]}}
                                        name='RAM'
                                        value={RAM}
                                        onChange={e=>setRAM(e.target.value)}
                                        placeholder='RAM..'
                                        className="form-control field" />
                                    </div>
                                    <div className="form-group">
                                        <input type="date" 
                                        style={{backgroundColor : colors.primary[400]}}
                                        name='purchasedDate'
                                        value={purchasedDate}
                                        onChange={e=>setpurchasedDate(e.target.value)}
                                        placeholder='PurchasedDate'
                                        className="form-control field" />
                                    </div>
                                    <div className="">
                                        <input type="submit" value='update Device' className='btn btn-primary btn-sm' />
                                     </div>
                                </form>
    </React.Fragment>
  )
}

export default UpdateUser