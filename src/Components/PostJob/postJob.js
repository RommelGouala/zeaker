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
import { useState } from "react"
import { useNavigate } from "react-router-dom"




export default function PostJob() {
    const INITIAL_STATE = {
        Id: '',
        title: '',
        desc: '',
        date: '',
        timeframe: '',
        location: '',
        jobType: '',
        postOwner: ''
    }

    const [data, setData] = useState(INITIAL_STATE)
    const navigate = useNavigate()

    const handleChange = (e) => {
        setData({ ...data, [e.target.name]: e.target.value })
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        const Url = process.env.REACT_APP_SERVER_URL + '/index/'
        const response = await fetch(`${Url}`, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })

        if (response.status !== 200) {

        } else {
            navigate('/', { replace: true })
        }
    }

    return (
        <>
            <Navbarr />
            <div className="New_Entry">
                <section id="Section_O_NewEntry">
                    <form onSubmit={handleSubmit} id="form_NE">
                        <h1> Get Finance </h1>
                        <label className="labels">Job ID:</label>
                        <input onChange={handleChange} required name='id' type='number' placeholder='Job ID' value={data.id} />
                        <label className="labels"> Job Title</label>
                        <input onChange={handleChange} name='title' type='text' placeholder='Job Title' value={data.title} className='form-input'/>
                        <label className="labels">Location</label>
                        <input onChange={handleChange} required name='location' type='text' placeholder='City, State/Country' value={data.location} />
                        <label className="labels">Date</label>
                        <input onChange={handleChange} required name='date' type='date' placeholder='Date' value={data.date} />

                        <label className="labels">Time Frame:</label>
                        <input onChange={handleChange} required name='date' type='datetime-local' placeholder='time frame' value={data.timeframe} />
                        <label className="labels">Job Description:</label>
                        <input onChange={handleChange} required name='desc' type='text' placeholder='description' value={data.desc}/>
                        <label className="labels">Job Type</label>
                        <input onChange={handleChange} name='jobType' type='text' placeholder='Job Type' value={data.jobType} required />

                        <select className="custom-select">
                            <option selected>job Type</option>
                            <option value="1">remote</option>
                            <option value="2">onsite</option>
                            <option value="3">hybrid</option>
                        </select>
                        <button type='submit'>Submit New Entry</button>
                    </form>
                </section>
            </div>
        </>
    );
}
