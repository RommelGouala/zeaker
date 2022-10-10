// ID (pkey)
// title
// desc
// date
// timeframe
// location
// jobtype = remote/onsite/hybrid
// budget
// post owner - link to user


import Navbarr from "../Navbar/Navbar"
import './postJob.css'
import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"




export default function PostJob() {
   const userId = localStorage.getItem('id')
   
    const INITIAL_STATE = {
        title: '',
        desc: '',
        date: '',
        timeframe: '',
        location: '',
        jobType: '',
        postOwner: userId,
        budget:''
    }

    const [data, setData] = useState(INITIAL_STATE)
    const navigate = useNavigate()

    const handleChange = (e) => {
        setData({ ...data, [e.target.name]: e.target.value })
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        const token = localStorage.getItem("token");

        const Url = process.env.REACT_APP_SERVER_URL + '/index/'
        const response = await fetch(`${Url}`, {
            method: 'POST',
            headers: {
                // 'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': token
            },
            body: JSON.stringify(data)
        })

        if (response.status !== 200) {

        } else {
            navigate('/', { replace: true })
        }
    }

    // useEffect(() =>{

    //     const fetchData = async () => {
    //         const token = localStorage.getItem("token");

    //     const Url = process.env.REACT_APP_SERVER_URL + '/index/user'
    //     const response = await fetch(`${Url}`, {
    //         method: 'GET',
    //         headers: {
    //             // 'Accept': 'application/json',
    //             'Content-Type': 'application/json',
    //             'Authorization': token
    //         },
    //         body: JSON.stringify(data)
    //     })
    //       }
        
    //       // call the function
    //       fetchData()
    //         // make sure to catch any error
    //         .catch(console.error);
    // },[])

    return (
        <>
            <Navbarr />
            <div className="New_Entry">
                <section id="Section_O_NewEntry">
                    <form onSubmit={handleSubmit} id="form_NE">
                        <h1> Get Finance </h1>
                        <label className="labels"> Job Title</label>
                        <input onChange={handleChange} name='title' type='text' placeholder='Job Title' value={data.title} className='form-input'/>
                        <label className="labels">Location</label>
                        <input onChange={handleChange} required name='location' type='text' placeholder='City, State/Country' value={data.location} />
                        <label className="labels">Date</label>
                        <input onChange={handleChange} required name='date' type='date' placeholder='Date' value={data.date} />

                        <label className="labels">Time Frame: (In days)</label>
                        <input onChange={handleChange} required name='timeframe' type='number' placeholder='time frame' value={data.timeframe} />
                        <label className="labels">Job Description:</label>
                        <input onChange={handleChange} required name='desc' type='text' placeholder='description' value={data.desc}/>

                        <select className="custom-select" value={data.jobType} onChange={handleChange} name='jobType' type='text' required >

                            <option value="">--Please choose a Job Type--</option>
                                            <option value="remote">remote</option>
                                            <option value="onsite">onsite</option>
                                            <option value="onsite">onsite</option>
                        </select>
                        <button type='submit'>Submit Job</button>
                    </form>
                </section>
            </div>
        </>
    );
}
