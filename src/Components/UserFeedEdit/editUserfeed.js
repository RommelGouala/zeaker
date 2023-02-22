
import { useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import Navbarr from '../Navbar/Navbar'
// import Navbarr from "../Navbar_f/Navbar";
import './editUserfeed.css'


export default function EditUserFeed() {
    const userId = localStorage.getItem('id')
    const INITIAL_STATE = {
        title: '',
        desc: '',
        date: '',
        timeframe: '',
        location: '',
        jobType: '',
        postOwner: userId,
        budget: ''
    }
    const navigate = useNavigate()
    


    const [data, setData] = useState(INITIAL_STATE)



    const handleChange = (e) => {
        setData({ ...data, [e.target.name]: e.target.value })
    }

    const { id } = useParams()

    const handleSubmit = async (e) => {
        e.preventDefault();
        const token = localStorage.getItem("token");
       
        const Url = process.env.REACT_APP_SERVER_URL + `/index/${id}`
        const response = await fetch(Url, {
            method: 'PUT',
            headers: {
                // 'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': token
            },
            body: JSON.stringify(data)
        })

        if(response.status !== 200){
            console.log('Error')
        }else{
        navigate('/jobfeed', { replace: true })
            console.log('Could not edit')
        }
    }

    return (

        <div className='The_Edit'>
            <Navbarr />
            <section id="Section_O_Edit">
                <form id="form_Edit">

                <label className="labels">title </label>
                    <input type='text' value={data.title} onChange={handleChange} required name='title'></input>
                    <label className="labels">Location </label>
                    <input type='text' value={data.location} onChange={handleChange} required name='location'></input>
                    <label className="labels">Date</label>
                    <input type="date"  placeholder="dd-mm-yyyy" min="1997-01-01" max="2030-12-31" value={data.date} onChange={handleChange} required name='date'></input>
                    <label className="labels">Job Description:</label>
                    <input type='text' value={data.desc} onChange={handleChange} required name='desc'></input>
                    <label className="labels">Time Frame</label>
                    <input type='number' value={data.timeframe} onChange={handleChange} required name='timeframe'></input>
                    <label className="labels">Job Type</label>
                    <select className="custom-select" value={data.jobType} onChange={handleChange} name='jobType' type='text' required >

                        <option value="">--Please choose a Job Type--</option>
                        <option value="remote">Remote</option>
                        <option value="onsite">Onsite</option>
                        <option value="hybrid">Hybrid</option>
                    </select>
                    <label className="labels">Budget</label>
                    <input type='number' value={data.budget} onChange={handleChange} name='budget'></input>
                    <button type='su' onClick={handleSubmit}>Submit Edit</button>
                </form>
            </section>
        </div>
    )
}