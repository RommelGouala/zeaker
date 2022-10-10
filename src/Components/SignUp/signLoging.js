import "./signLoging.css";
import CnidiriaLogo from "../Navbar/faviconCnidiriaMain1.jpg";
import Navbarr from "../Navbar/Navbar";
import { Link, resolvePath, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";



export default function Signing() {  
const [token, setToken] = useState(null)
const navigate = useNavigate()

const [data, setData] = useState({
  name: "",
  password: ""
});

// useEffect(() =>{
//   const fetchToken = async () =>{
//     const url = process.env.REACT_APP_SERVER_URL + '/user/login'
//     const response = await fetch(url, {
//         method: 'POST',
//         headers: {
//             'Accept': 'application/json',
//             'Content-Type': 'application/json'
//         },
//         body: JSON.stringify(data)
//     })
//     console.log('We are here', response.json())
//   }

//   fetchToken()
// },[])

const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
};


const handleSubmit = async (e) =>{
  e.preventDefault();
  const url = process.env.REACT_APP_SERVER_URL + '/user/login'
  console.log('This is Url', url)
  const response = await fetch(url, {
      method: 'POST',
      headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
  })

  const resData = await response.json()
  console.log('We are here', response)
  if (!resData) {
      console.log('No Data')
  } else {
      // navigate('/home', { replace:true })
     localStorage.setItem('token', resData.token)
     localStorage.setItem('id', resData.id)
     console.log("This is it",resData)
  }
}



console.log(token)

  return (
    <>
      <Navbarr />
      <section className="vh-100" id="background">
        <div className="container py-5 h-100">
          <div className="row d-flex justify-content-center align-items-center h-100">
            <div className="col col-xl-10">
              <div className="card" id="card">
                <div className="row g-0">
                  <div className="col-md-6 col-lg-5 d-none d-md-block">
                    <img
                      src={CnidiriaLogo}
                      alt="login form"
                      className="img-fluid"
                      id="login_form"
                    />
                  </div>
                  <div className="col-md-6 col-lg-7 d-flex align-items-center">
                    <div className="card-body p-4 p-lg-5 text-black">
                      <form onSubmit={handleSubmit}>
                        <div className="d-flex align-items-center mb-3 pb-1">
                          <i
                            className="fas fa-cubes fa-2x me-3"
                            id="favicon1"
                          ></i>
                          <span className="h1 fw-bold mb-0">Zeaker</span>
                        </div>

                        <h5 className="fw-normal mb-3 pb-3" id="text_One">
                          Sign into your account
                        </h5>
                          <div>
                        <div className="form-outline mb-4">
                          <input
                            type="text"
                            id="form2Example17"
                            className="form-control form-control-lg"
                            onChange={handleChange}
                            value={data.name}
                            name='name'
                            required

                          />
                          <label className="form-label" for="form2Example17">
                            Name
                          </label>
                        </div>

                        <div className="form-outline mb-4">
                          <input
                            type="password"
                            id="form2Example27"
                            className="form-control form-control-lg"
                            onChange={handleChange}
                            name='password'
                            value={data.password}
                            required
                          />
                          <label className="form-label" for="form2Example27">
                            Password
                          </label>
                        </div>

                        <div className="pt-1 mb-4">
                          <button
                            className="btn btn-dark btn-lg btn-block"
                            type="submit"
                          >
                            
                            Login
                          </button>
                          
                        </div>
                        </div>
                      
                        <p className="mb-5 pb-lg-2">
                          Don't have an account? <Link to='/signup'>Register here</Link>
                        </p>
                        <a href="#!" className="small text-muted">
                          Terms of use.
                        </a>
                        <a href="#!" className="small text-muted">
                          Privacy policy
                        </a>
                      </form>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

    </>
  );
}
