import React from 'react'
import { useNavigate } from 'react-router-dom'

const Home = () => {
    const navigate = useNavigate()
  return (
    <React.Fragment>
        <div className="landing-page">
            <div className="wrapper">
                <div className="d-flex flex-column justify-content-center align-items-center text-center h-100">
                <h5 className="display-4">
                    RA INFO INVENTORY
                </h5>
                <p className="lead">Lorem, ipsum dolor sit amet consectetur adipisicing elit. Aspernatur, sapiente ex illo iste esse nisi. Maiores consequuntur nobis possimus debitis, error, esse soluta non, perferendis adipisci culpa ullam sint. Vel velit autem saepe quod, fugit ipsam veritatis, officiis expedita facilis, sapiente assumenda praesentium debitis odit!</p>
                    <div className="grad">
                    <button onClick={e => navigate('/login')}  className="btn button3d btn-sm btn-rounded text-white" style={{width : "120px"}}>Login</button>
                    </div>
                </div>
            </div>
        </div>
    </React.Fragment>
  )
}

export default Home