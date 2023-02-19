import axios from "axios";
import React, { useEffect, useState } from "react";
import { Modal, Button } from "react-bootstrap";
import Cookies from 'cookies-js';
import { useNavigate } from "react-router-dom";
import {tokens } from "../../theme";
import { useTheme } from "@mui/material";
import {RiDeleteBinFill} from 'react-icons/ri'
import {RiFileEditFill} from 'react-icons/ri'
import Header from "../Header";


const AssignDevice = () => {
    const navigate = useNavigate()
  const [userInfo, setUserInfo] = useState("");
  const [deviceInfo, setDeviceInfo] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [employeeId, setEmployeeId] = useState("");
  const [device, setDevice] = useState("");
  const [brand, setBrand] = useState("");
  const [tagNumber, setTagNumber] = useState("");
  const [RAM, setRAM] = useState("");
  const [purchasedDate, setpurchasedDate] = useState('');
  const [deviceId, setDeviceId] = useState('')
  const [isVisible, setIsVisible] = useState(false);
  const [deviceVisible, setDeviceVisible] = useState(false)
  const [assignedDevices, setAssignedDevices] = useState([])
  const [udevice, setUdevice] = useState('')
  const [ubrand, setubrand ] = useState('')
  const [utagNumber, setuTagNumber] = useState("");
  const [URAM, setURAM] = useState("");
  const [upurchasedDate, setupurchasedDate] = useState('');
  const [show, setShow] = useState(false)
  const [id, setId] = useState('')
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const handleClose = () => setShow(false);
  const handleShow = (device) => {
    setId(device._id)
    setShow(true)
    setUdevice(device.device)
    setubrand(device.brand)
    setuTagNumber(device.tagNumber)
    setURAM(device.RAM)
    setupurchasedDate(device.purchasedDate)
  }

  let getAllUsers = () => {
    let dataurl = "http://127.0.0.1:5000/api/users";
    axios
      .get(dataurl)
      .then((res) => {
        setUserInfo(res.data.users);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  let backassignedDevice = async () =>{
      const response = await fetch('http://127.0.0.1:5000/api/inwards' , {
      method : "POST",
      headers:{
        'Content-Type' : 'application/json'
      },
      body : JSON.stringify({
        device : udevice,
        brand : ubrand,
        tagNumber : utagNumber,
        RAM :URAM,
        purchasedDate : upurchasedDate
      })
    })
    let deleteAssignedDevice = async () =>{
      let dataurl = `http://127.0.0.1:5000/api/outwards/${id}`
      axios.delete(dataurl).then((res)=>{
          getAssignedDevices()
      }).catch((error)=>{
          console.error(error);
      })
  }
    const data = await response.json()
      if(data.status === 'ok'){
          deleteAssignedDevice()
          setShow(false)
      }
    }
    

  let getalldevices = () => {
    let dataurl = "http://127.0.0.1:5000/api/inwards";
    axios
      .get(dataurl)
      .then((res) => {
        setDeviceInfo(res.data.inwards);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  let getAssignedDevices = ()=>{
    let dataUrl = "http://127.0.0.1:5000/api/outwards"
    axios
    .get(dataUrl)
      .then((res) => {
        setAssignedDevices(res.data.outwards);
      })
      .catch((err) => {
        console.log(err);
      });
  }
  useEffect(() => {
    getAllUsers();
    getalldevices();
    getAssignedDevices()
    const token = Cookies.get('token')
    const role = Cookies.get('role')
      if(!token || role !=='manager'){
        navigate('/dashboard')
      }
  },[]);
  let selectUser= (user) =>{
        setUsername(user.username)
        setEmail(user.email)
        setEmployeeId(user.employeeId)
        setIsVisible(false)
    setDeviceVisible(true)
  }

  let selectDevice = (device)=>{
    setDevice(device.device)
    setBrand(device.brand)
    setTagNumber(device.tagNumber)
    setRAM(device.RAM)
    setpurchasedDate(device.purchasedDate)
    setDeviceId(device._id)
  }
  let visible = () =>{
    setIsVisible(false)
    setDeviceVisible(true)
  }

  async function handleSubmit(){
    const response = await fetch('http://127.0.0.1:5000/api/outwards' , {
      method : "POST",
      headers:{
        'Content-Type' : 'application/json'
      },
      body : JSON.stringify({
        username : username,
        email : email,
        employeeId : employeeId,
        device : device,
        brand : brand,
        tagNumber : tagNumber,
        RAM : RAM ,
        purchasedDate :   purchasedDate
      }),
    })
    
    let deleteDevice  = () =>{
        let inwardid = deviceId
        let dataurl = `http://127.0.0.1:5000/api/inwards/${inwardid}`
        axios.delete(dataurl).then((res)=>{
            getalldevices()
        }).catch((error)=>{
            console.error(error);
        })
    }
    const data = await response.json()
    if(data.status === 'ok'){
        setIsVisible(false)
        alert('Device Assigned Successfully!!')
        deleteDevice()
        
    }
   
  }
  return (
    <React.Fragment>
      <>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header style={{backgroundColor : colors.primary[400]}}>
          <Modal.Title>Delete Assigned Device</Modal.Title>
        </Modal.Header>
        <Modal.Body className="text-primary card"><p className="lead">Are you sure?</p></Modal.Body>
        <Modal.Footer className="">
          <Button variant="secondary" onClick={handleClose}>
            Cancel
          </Button>
          <Button variant="primary" onClick={backassignedDevice}>
            Delete
          </Button>
        </Modal.Footer>
      </Modal>
    </>
      <section className="p-3">
        <div className="container">
            <div className="row">
                <div className="col">
      {isVisible && (
        <div>
            SELECT USER
            <table className="table table-success table-striped text-center">
                <thead className="bg-dark text-white">
                    <tr>
                        <th>Username</th>
                        <th>Email</th>
                        <th>Employee Id</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        userInfo.length > 0 ? <React.Fragment>
                            {
                                userInfo.map((user)=>{
                                    return(
                                        <tr key={user._id} >
                                            <td>{user.username}</td>
                                            <td>{user.email}</td>
                                            <td>{user.employeeId}</td>
                                            <td><button onClick={selectUser.bind(this , user)} className="btn btn-primary btn-sm">Select User</button></td>
                                        </tr>
                                    )
                                })
                            }
                        </React.Fragment>:null
                    }
                </tbody>
            </table>
          <button className="btn btn-info btn-sm" onClick={visible}>Select Device</button>
          <button className="btn btn-danger btn-sm" onClick={() => setIsVisible(false)}>Close Popup</button>
        </div>
      )}
      {deviceVisible && (
        <div>
            <table className="table table-success table-striped text-center">
                <thead className="bg-dark text-white">
                    <tr>
                        <th>Device</th>
                        <th>Brand</th>
                        <th>Tag Number</th>
                        <th>RAM</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        deviceInfo.length > 0 ? <React.Fragment>
                            {
                                deviceInfo.map((device)=>{
                                    return(
                                        <tr key={device._id} >
                                            <td>{device.device}</td>
                                            <td>{device.brand}</td>
                                            <td>{device.tagNumber}</td>
                                            <td>{device.RAM}</td>
                                            {/* <td>{device.purchasedDate}</td> */}
                                            <td><button onClick={selectDevice.bind(this , device)} className="btn btn-primary btn-sm">Select Device</button></td>
                                        </tr>
                                    )
                                })
                            }
                        </React.Fragment>:null
                    }
                </tbody>
            </table>
          <button className="btn btn-danger btn-sm" onClick={() => {setDeviceVisible(false)
            getAllUsers();
            getalldevices();
            getAssignedDevices()
          }}>Close Popup</button>
          <button className="btn btn-info btn-sm" onClick={handleSubmit}>Submit</button>
        </div>
      )}
                </div>
            </div>
        </div>
      </section>
      <section className="p-3">
        <div className="container">
          <div className="row">
            <div className="col">
            <Header className='header' title="Inward_Inventory_Data" subtitle='List of Devices assigned to users'/>
                <button className="btn btn-dark btn-sm ml-auto" onClick={() => setIsVisible(true)}>Assign Device</button>
              <table className="table table-striped text-center" style={{
            backgroundColor: colors.primary[400],
            color: colors.primary[100],
          }}>
                <thead style={{
              backgroundColor: colors.blueAccent[700],
              color: colors.primary[100],
            }}>
                  <tr>
                    <td>Name</td>
                    <td>EmployeeId</td>
                    <td>Email</td>
                    <td>Device</td>
                    <td>Tag Number</td>
                    <td>Actions</td>
                  </tr>
                </thead>
                <tbody>
                  {
                    (assignedDevices).length > 0 ?
                    <React.Fragment>
                        {
                          assignedDevices.map((device)=>{
                            return(
                              <tr key={device._id}>
                              <td>{device.username}</td>
                              <td>{device.employeeId}</td>
                              <td>{device.email}</td>
                              <td>{device.device}</td>
                              <td>{device.tagNumber}</td>
                              <td><RiDeleteBinFill className="m-2" cursor='pointer' onClick={handleShow.bind(this , device)}/></td>
                            </tr>
                            )
                          })
                        }
                    </React.Fragment> : null
                  }
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>
    </React.Fragment>
  );
};

export default AssignDevice;
