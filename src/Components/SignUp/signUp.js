import './signUp.css'
import Navbarr from '../Navbar/Navbar'
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function SignUp() {
    const [data, setData] = useState({
        name: "",
        email: "",
        password: "",
        role: "",
        phone: ""
    });
    
    const navigate = useNavigate();

    const handleChange = (e) => {
        setData({ ...data, [e.target.name]: e.target.value });
    };

    const [naming, SetNaming] = useState('')
    const [emailing, SetEmailing] = useState('')
    const [passwording, SetPasswording] = useState('')
    const [roling, SetRoling] = useState('')
    const [phoning, SetPhoning] = useState('')
    
    const handleSubmit = async (e) =>{
        const url = process.env.REACT_APP_SERVER_URL + '/user/'
        e.preventDefault();

        if(data.name.length < 3){
            SetNaming('Please enter a valid name');
            return;
        }else{
            SetNaming('')
        }

        if(data.email.length < 3){
            SetEmailing('Email is too short')
            return
        } else if (!/\S+@\S+\.\S+/.test(data.email)){
            SetEmailing('Please enter a valid email. E.g: joe@joe.com')
            return
        }else{
            SetEmailing('')
        }

        if(!data.password || data.password.trim().length < 8){
            SetPasswording('Password must be at least 8 characters')
            return
        }else{
                SetPasswording('')
        }

        if(!data.role){
            SetRoling('Please select a role')
            return
        }else{
            SetRoling('')
        }

        if(!data.phone || data.phone.trim().length < 10){
            SetPhoning('Enter a valid phone number. E.g: 1234567890')
            return
        }else{
            SetPhoning('')
        }
    
    
        try {
        const response = await fetch(`${url}`, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })
        if (response.status !== 200) {
            
        } else {
            navigate('/signing', { replace:true })
        }
    } catch (error) {
        
    }
    }


    return (

        <>
            <Navbarr />
            <section className="background-radial-gradient overflow-hidden">

                <div className="container px-4 py-5 px-md-5 text-center text-lg-start my-5">
                    <div className="row gx-lg-5 align-items-center mb-5">
                        <div className="col-lg-6 mb-5 mb-lg-0" id="col_div">
                            <h1 className="my-5 display-5 fw-bold ls-tight" id='h1_color'>
                                Finance your creation with The best offer <br />
                                <span id='span_color'>for your business</span>
                            </h1>
                            <p className="mb-4 opacity-70" id='p_color'>
                                Lorem ipsum dolor, sit amet consectetur adipisicing elit.
                                Temporibus, expedita iusto veniam atque, magni tempora mollitia
                                dolorum consequatur nulla, neque debitis eos reprehenderit quasi
                                ab ipsum nisi dolorem modi. Quos?
                            </p>
                        </div>

                        <div className="col-lg-6 mb-5 mb-lg-0 position-relative">
                            <div id="radius-shape-1" className="position-absolute rounded-circle shadow-5-strong"></div>
                            <div id="radius-shape-2" className="position-absolute shadow-5-strong"></div>

                            <div className="card bg-glass">
                                <div className="card-body px-4 py-5 px-md-5">
                                    <form onSubmit={handleSubmit}>
                                        {/*  2 column grid layout with text inputs for the first and last names  */}
                                        <div className="row">
                                            <div className="col-md-6 mb-4">
                                                <div className="form-outline">
                                                    <input type="text"  className="form-control" name='firstName'  onChange={handleChange}/>
                                                    <label className="form-label" >First name</label>
                                                </div>
                                            </div>
                                            <div className="col-md-6 mb-4">
                                                <div className="form-outline">
                                                    <input type="text"  className="form-control" name='name' onChange={handleChange} value={data.name} />
                                                    <label className="form-label" >Last name</label>
                                                </div>
                                            </div>
                                            <p className='text-danger'>{naming}</p>
                                        </div>

                                        {/* Email input*/}
                                        <div className="form-outline mb-4">
                                            <input type="text" className="form-control" name='email' onChange={handleChange} value={data.email} />
                                            <label className="form-label" >Email address</label>
                                        </div>
                                        <p className='text-danger'>{emailing}</p>

                                        {/* Password input  */}
                                        <div className="form-outline mb-4">
                                            <input type="text"  className="form-control" name='password' onChange={handleChange} value={data.password} />
                                            <label className="form-label" >Password</label>
                                        </div>
                                        <p className='text-danger'>{passwording}</p>
                                        {/* Role */}
                                
                                        <select name="role" id="pet-select" className='form-select' onChange={handleChange} value={data.role}>
                                            <option value="">--Please choose a Role--</option>
                                            <option value="Poster">Poster</option>
                                            <option value="Zeaker">Zeaker</option>
                                        </select>
                                        <label className="form-label">Role</label>
                                        <p className='text-danger'>{roling}</p>
                                        
                                        {/* Phone */}
                                        <div className="form-outline mb-4">
                                            <input type="number" maxLength={10} className="form-control" name='phone' onChange={handleChange} value={data.phone} />
                                            <label className="form-label">Phone</label>
                                        </div>
                                        <p className='text-danger'>{phoning}</p>


                                        {/* Submit button */}
                                        <button type="submit" className="btn btn-primary btn-block mb-4">
                                            Sign up
                                        </button>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>


    )
}