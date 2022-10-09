import axios from 'axios'
import { useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import Navbarr from '../Navbar/Navbar'
// import Navbarr from "../Navbar_f/Navbar";
// import './Edit.css'


export default function EditUserFeed() {
    const { id } = useParams()
    const Url = process.env.REACT_APP_SERVER_URL + `/user/${id}`
    const navigate = useNavigate()

const [title, setTitle] = useState('')
const [location, setLocation] = useState('')
const [date, setDate] = useState('')
const [desc, setDescription] = useState('')
const [timeframe, setTimeFrame] = useState('')
const [jobType, setJobtype] = useState('')
const [postOwner, setPostOwner] = useState('')
    


    const handleSubmit = (e) => {
        e.preventDefault();
        axios.put(Url, {
            title,
            desc,
            date,
            timeframe,
            location,
            jobType,
            postOwner: ''
        }).then(response => console.log('Data Posted', response)).catch(err => console.log(err))
        navigate('/user/all', { replace:true })
    }

    return (

        <div className='The_Edit'>
            <Navbarr />
            <section id="Section_O_Edit">
                <form id="form_Edit">
                    
                    
                    <input type='text' value={title} onChange={(e) => setTitle(e.target.value)}></input>
                    <label className="labels">Location </label>
                    <input type='text' value={location} onChange={(e) => setLocation(e.target.value)} ></input>
                    <label className="labels">Date</label>
                    <input type="date" name="date_picker" placeholder="dd-mm-yyyy" min="1997-01-01" max="2030-12-31" value={date} onChange={(e) => setDate(e.target.value)}></input>
                    <label className="labels">Job Description:</label>
                    <input type='text' value={desc} onChange={(e) => setDescription(e.target.value)}></input>
                    <label className="labels">Time Frame</label>
                    <input type='text' value={timeframe} onChange={(e) => setTimeFrame(e.target.value)}></input>
                    <label className="labels">Job Type</label>
                    <input type='text' value={jobType} onChange={(e) => setJobtype(e.target.value)} ></input>
                    
                    <button onClick={handleSubmit}>Submit Edit</button>
                </form>
            </section>
        </div>
    )
}