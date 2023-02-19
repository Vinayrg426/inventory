import React, { useState } from 'react'

const ResetPassword = () => {
    const [email, setEmail] = useState('')

    let handleSubmit = (e)=>{
        e.preventDefault()
        fetch ("http://localhost:5000/api/forgot-password" , {
            method: "POST",
            headers:{
                'Content-Type' : 'application/json'
            },
            body : JSON.stringify({
                email : email
            })
        })
        .then((res)=>res.json())
        .then((data)=>{
            console.log(data , "userRegister");
            alert(data.status)
        })
    }
  return (
    <React.Fragment>
        <section className="p-3">
            <div className="container">
                <div className="row">
                    <div className="col">
                        <form onSubmit={handleSubmit}>
                            <div className="form-group">
                                <label htmlFor="">Email : </label>
                                <input
                                value={email}
                                onChange={e=>setEmail(e.target.value)}
                                type="email" className="form-control" />
                            </div>
                            <div className="">
                                <input type="submit" className='btn btn-primary btn-sm'/>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </section>
    </React.Fragment>
  )
}

export default ResetPassword