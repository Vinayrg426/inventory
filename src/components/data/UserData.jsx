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
import { useSortBy, useTable, useGlobalFilter , usePagination , useRowSelect  } from "react-table";
import Cookies from 'cookies-js';
import {Modal , Button} from 'react-bootstrap'


const UserData = () => {
  const theme = useTheme();
  const [users, setUsers] = useState([]);
  const [role, setRole] = useState('')
  const [show, setShow] = useState(false)
  const [id, setId] = useState('')
  const [buffer, setBuffer] = useState(true)
  const [token, setToken] = useState('')
  const colors = tokens(theme.palette.mode);
  const navigate = useNavigate()


  const handleClose = () => setShow(false);
  const handleShow = (userid) => {setShow(true)
    setId(userid)
  }
  let getAllUsers = () =>{
    let dataurl ='http://127.0.0.1:5000/api/users'
    axios
      .get(dataurl)
      .then((res) => {
        setUsers(res.data.users); 
      })
      .catch((err) => {
        console.log(err);
      });
  }
  useEffect(() => {
    getAllUsers()
    const token = Cookies.get('token')
    const role = Cookies.get('role')
    console.log(role);
    if(role !== 'manager'){
      setBuffer(false)
    }
      if(!token){
        navigate('/dashboard')
      }
  }, []);

  const COLUMNS = [
    { Header: "UserName", accessor: "username" },
    { Header: "Email", accessor: "email" },
    { Header: "EmployeeId", accessor: "employeeId" },
    { Header: "Role", accessor: "role" },
  ];

  const columns = useMemo(() => COLUMNS, []);
  const data = useMemo(() => users, [users]);
  const tableHooks = (hooks)=>{
        if(!buffer){
          hooks.visibleColumns.push((columns)=>[
            ...columns,
            {
              id : 'delete',
              Header : "Actions",
              Cell : ({row})=>(
                <span style={{backgorundColor : colors.primary[400]}}>
                  <RiDeleteBinFill style={{marginRight : '15px'}} title="delete_user" cursor='pointer' onClick={handleShow.bind(this,row.original._id)}/>
                  <Link style={{color : colors.greenAccent[500]}} to={`/users/${row.original._id}`}><RiFileEditFill title="edit_user"/></Link>
                </span> 
              )
            },
          ]) 
        }
  }

  let deleteUser = ()=>{
    let dataurl = `http://127.0.0.1:5000/api/users/${id}`
    axios.delete(dataurl).then((res)=>{
        getAllUsers()
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
      role
    },
    tableHooks,
    useGlobalFilter,
    useSortBy,
    usePagination,
    useRowSelect,
  );

  
  const HEADERS = [
    {label : 'username' , key : 'username'},
    {label : 'email' , key : 'email'},
    {label : 'employeeId' , key : 'employeeId'},
    {label : 'role' , key : 'role'},
  ]
  const csvReport = {
    headers : HEADERS,
    data : users,
    filename : "users.csv"
  }

  const { globalFilter ,pageIndex } = state;
  return (
    <React.Fragment>
      <>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header className="bg-dark text-white card">
          <Modal.Title>Delete User</Modal.Title>
        </Modal.Header>
        <Modal.Body className="text-primary card"><p className="lead">Are you sure?</p></Modal.Body>
        <Modal.Footer className="">
          <Button variant="secondary" onClick={handleClose}>
            Cancel
          </Button>
          <Button variant="primary" onClick={deleteUser}>
            Delete
          </Button>
        </Modal.Footer>
      </Modal>
    </>
      <section className="p-3">
      <Header
        title="User_Data"
        subtitle="List of all the registered users"
      />     
      <>
      <CSVLink {...csvReport} style={{color : colors.primary[100] , marginLeft : '1140px'}}>
                <ImDownload3/><span className="">Export To CSV</span>
                </CSVLink>
        <form action="" className="form-inline">
          <div className="">
            <input
             style={{backgroundColor : colors.primary[400] , width:'200px'}}
             type="text"
             autoComplete="off"
             placeholder="Search..."
              value={globalFilter || ""}
              onChange={(e) => setGlobalFilter(e.target.value)}
              className='form-control field'
            />
          </div>
      <input type='submit'  className="btn btn-info ml-auto" onClick={e => navigate('/register')} value="Create new user"/>
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

export default UserData;
