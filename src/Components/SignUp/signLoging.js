import "./signLoging.css";
import CnidiriaLogo from "../Navbar/faviconCnidiriaMain1.jpg";
import Navbarr from "../Navbar/Navbar";
import { Link } from "react-router-dom";
import { useState } from "react";
import axios from 'axios'


export default function Signing() {

  const [data, setData] = useState({ email: "", password: "" });
	const [error, setError] = useState("");

	const handleChange = ({ currentTarget: input }) => {
		setData({ ...data, [input.name]: input.value });
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		try {
			const url = process.env.REACT_APP_SERVER_URL
			const { data: res } = await axios.post(url, data);
			localStorage.setItem("token", res.data);
			window.location = "/";
		} catch (error) {
			if (
				error.response &&
				error.response.status >= 400 &&
				error.response.status <= 500
			) {
				setError(error.response.data.message);
			}
		}
	};


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
                      <form>
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
                          <form onSubmit={handleSubmit}>
                        <div className="form-outline mb-4">
                          <input
                            type="email"
                            id="form2Example17"
                            className="form-control form-control-lg"
                            onChange={handleChange}
                          />
                          <label className="form-label" for="form2Example17">
                            Email address
                          </label>
                        </div>

                        <div className="form-outline mb-4">
                          <input
                            type="password"
                            id="form2Example27"
                            className="form-control form-control-lg"
                            onChange={handleChange}
                          />
                          <label className="form-label" for="form2Example27">
                            Password
                          </label>
                        </div>

                        <div className="pt-1 mb-4">
                          <button
                            className="btn btn-dark btn-lg btn-block"
                            type="button"
                          >
                            
                            Login
                          </button>
                          
                        </div>
                        </form>
                      
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
