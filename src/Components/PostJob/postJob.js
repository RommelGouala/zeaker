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

    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true)
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
            setIsLoading(false)
        } else {
            navigate('/', { replace: true })
            setIsLoading(false)
        }
    }

const [location, setLocation] = useState('')

    useEffect(() =>{
        
        const fetchLocation= async () => {
            let lat = 0
            let long = 0
            navigator.geolocation.getCurrentPosition((position) => {
                lat = position.coords.latitude;
                long = position.coords.longitude;
              });

        const UrlApi = `http://api.positionstack.com/v1/reverse?access_key=62e9f077047b2e11dd3bf8eb1abe8177&query=${lat},${long}`
        const responseT = await fetch(`${UrlApi}`, {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
        })
                setLocation(`${responseT.data[0].administrative_area}, ${responseT.data[0].region}`)
                
        }
        
          // call the function
          fetchLocation()
            // make sure to catch any error
            .catch(console.error);
    },[])

    console.log(location)

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
                        <input onChange={handleChange} required name='location' type='text' placeholder={location} value={data.location} />
                        <label className="labels">Date</label>
                        <input onChange={handleChange} required name='date' type='date' placeholder='Date' value={data.date} />

                        <label className="labels">Time Frame: (In days)</label>
                        <input onChange={handleChange} required name='timeframe' type='number' placeholder='time frame' value={data.timeframe} />
                        <label className="labels">Job Description:</label>
                        <input onChange={handleChange} required name='desc' type='text' placeholder='description' value={data.desc}/>

                        <label className="labels">Budget:</label>
                        <input onChange={handleChange} required name='budget' type='number' placeholder='description' value={data.budget}/>

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
