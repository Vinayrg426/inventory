/* eslint-disable no-restricted-globals */
import React, { useEffect, useMemo } from "react";
import Header from "../Header";
import axios from "axios";
import { tokens } from "../../theme";
import { useTheme } from "@mui/material";
import { useState } from "react";
import {RiDeleteBinFill} from 'react-icons/ri'
import {RiFileEditFill} from 'react-icons/ri'
import { ImDownload3 } from "react-icons/im";
import { CSVLink } from "react-csv";
import { Link, useNavigate } from "react-router-dom";
import { useSortBy, useTable, useGlobalFilter , usePagination } from "react-table";
import {Modal , Button} from 'react-bootstrap'
import Cookies from 'cookies-js';

const InventoryData = () => {
  const theme = useTheme();
  const [devices, setDevices] = useState([]);
  const[show , setShow] = useState(false)
  const [id, setId] = useState('')
  const colors = tokens(theme.palette.mode);
  const navigate = useNavigate()

  const handleClose = () => setShow(false);
  const handleShow = (inwardid) => {setShow(true)
    setId(inwardid)
  }


  useEffect(() => {
      getalldevices()
      const token = Cookies.get('token')
      const role = Cookies.get('role')
      if(!token || role !== 'manager'){
        navigate('/dashboard')
      }
  }, []);   
  let getalldevices = (inwardid) =>{
    let dataurl ="http://127.0.0.1:5000/api/inwards"
    axios
      .get(dataurl)
      .then((res) => {
        setDevices(res.data.inwards);
      })
      .catch((err) => {
        console.log(err);
      });
  }
  const COLUMNS = [
    // { Header: "Id", accessor: "_id" },
    { Header: "Device", accessor: "device" },
    { Header: "Brand", accessor: "brand" },
    { Header: "TagNumber", accessor: "tagNumber" },
    { Header: "RAM", accessor: "RAM" },
    { Header: "Purchased Date", accessor: "purchasedDate" },
  ];

  const columns = useMemo(() => COLUMNS, []);
  const data = useMemo(() => devices, [devices]);
  const tableHooks = (hooks)=>{
    hooks.visibleColumns.push((columns)=>[
      ...columns,
      {
        id : 'delete',
        Header : "Actions",
        Cell : ({row})=>(
          <span style={{backgorundColor : colors.primary[400]}}>
            <RiDeleteBinFill style={{marginRight : '15px'}} title="device" cursor='pointer' onClick={handleShow.bind(this,row.original._id)}/>
            <Link style={{color : colors.greenAccent[500]}} to={`/inwards/${row.original._id}`}><RiFileEditFill title="device"/></Link>
          </span> 
        )
      },
    ])
  }

//   let deleteDevice = (inwardid)=>{
//     let con = confirm("This device will be deleted from the table")
//     if(con){
//       let dataurl = `http://127.0.0.1:5000/api/inwards/${inwardid}`
//     axios.delete(dataurl).then((res)=>{
//         getalldevices()
//     }).catch((error)=>{
//         console.error(error);
//     })
//     } else{
//       alert("user not deleted!!!")
//     }
// }

let deleteDevice = ()=>{
  let dataurl = `http://127.0.0.1:5000/api/inwards/${id}`
    axios.delete(dataurl).then((res)=>{
        getalldevices()
        setShow(false)
    }).catch((error)=>{
        console.error(error);
    })
  } 
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    page,
    nextPage,
    previousPage,
    canNextPage,
    canPreviousPage,
    pageOptions,
    gotoPage,
    pageCount,
    prepareRow,
    state,
    setGlobalFilter,
  } = useTable(
    {
      columns,
      data,
    },
    tableHooks,
    useGlobalFilter,
    useSortBy,
    usePagination
  );

  const HEADERS = [
    {label : 'device' , key : 'device'},
    {label : 'brand' , key : 'brand'},
    {label : 'tagNumber' , key : 'tagNumber'},
    {label : 'RAM' , key : 'RAM'},
    {label : 'purchasedDate' , key : 'purchasedDate'}
  ]
  const csvReport = {
    headers : HEADERS,
    data : devices,
    filename : "devicedata.csv"
  }


  const { globalFilter ,pageIndex } = state;
  return (
    <React.Fragment>
      <>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header className="bg-dark text-white card">
          <Modal.Title>Delete Device</Modal.Title>
        </Modal.Header>
        <Modal.Body className="text-primary card"><p className="lead">Are you sure?</p></Modal.Body>
        <Modal.Footer className="">
          <Button variant="secondary" onClick={handleClose}>
            Cancel
          </Button>
          <Button variant="primary" onClick={deleteDevice}>
            Delete
          </Button>
        </Modal.Footer>
      </Modal>
    </>
      <section className="p-3">
      <Header
        title="Inventory_Data"
        subtitle="List of all the devices in inventory"
      />
      <CSVLink {...csvReport} style={{color : colors.primary[100] , marginLeft : '1140px'}}>
                <ImDownload3/><span className="">Export To CSV</span>
                </CSVLink>
      <>

        <form action="">
          <div className="form-group form-inline" style={{ marginBottom : '5px'}}>
            <label htmlFor="">Search :</label>
            <input
             style={{backgroundColor : colors.primary[500] , width:'200px'}}
             type="text"
             autoComplete="off"
             placeholder="Search..."
              value={globalFilter || ""}
              onChange={(e) => setGlobalFilter(e.target.value)}
              className='form-control field  filter'
            />
      <input type='submit'  className="btn btn-info ml-auto" onClick={e => navigate('/inward')} value="Add New Device"/>
          </div>
        </form>
        <table
          className="table table-striped text-center"
          style={{
            backgroundColor: colors.primary[400],
            color: colors.primary[100],
          }}
          {...getTableProps()}
        >
          <thead
            style={{
              backgroundColor: colors.blueAccent[700],
              color: colors.primary[100],
            }}
          >
            {headerGroups.map((headerGroup) => (
              <tr {...headerGroup.getHeaderGroupProps()}>
                {headerGroup.headers.map((column) => (
                  <th {...column.getHeaderProps(column.getSortByToggleProps())}>
                    {column.render("Header")}
                    <span>
                      {column.isSorted
                        ? column.isSortedDesc
                          ? "⬇️"
                          : "⬆️"
                        : ""}
                    </span>
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody {...getTableBodyProps()}>
            {page.map((row) => {
              prepareRow(row);
              return (
                <tr {...row.getRowProps()}>
                  {row.cells.map((cell) => {
                    return (
                      <td {...cell.getCellProps()}>{cell.render("Cell")}</td>
                    );
                  })}
                </tr>
              );
            })}
          </tbody>
        </table>
        <div className="text-center">
            <span>
                Page {''}
                <strong>{pageIndex + 1} of{pageOptions.length} </strong>
            </span>
            <button onClick={()=>gotoPage(0)} disabled={!canPreviousPage} className="btn btn-sm btn-blue-grey">{'<<'}</button>
            <button onClick={()=> previousPage()} className="btn btn-info btn-sm" disabled={!canPreviousPage}>Previous</button>
            <button onClick={()=> nextPage()} className="btn btn-info btn-sm" disabled={!canNextPage}>Next</button>
            <button onClick={()=>gotoPage(pageCount - 1)} disabled={!canNextPage} className="btn btn-sm btn-blue-grey">{'>>'}</button>

        </div>
      </>
      </section>
    </React.Fragment>
  );
};

export default InventoryData;
