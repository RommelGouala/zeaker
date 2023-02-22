


import Navbarr from "../Navbar/Navbar"
import './postJob.css'
import { useState } from "react"
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
        budget: ''
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

        if (response.status !== 201) {

        } else {
            navigate('/jobfeed', { replace: true })

        }
    }

    // const [location, setLocation] = useState('')

    // useEffect(() => {

    //     const fetchLocation = async () => {
    //         let lat = 0
    //         let long = 0
    //         navigator.geolocation.getCurrentPosition((position) => {
    //             lat = position.coords.latitude;
    //             long = position.coords.longitude;
    //         });

    //         const UrlApi = `http://api.positionstack.com/v1/reverse?access_key=62e9f077047b2e11dd3bf8eb1abe8177&query=${lat},${long}`
    //         const responseT = await fetch(`${UrlApi}`, {
    //             method: 'GET',
    //             headers: {
    //                 'Accept': 'application/json',
    //                 'Content-Type': 'application/json',
    //             },
    //         })
    //         setLocation(`${responseT.data[0].administrative_area}, ${responseT.data[0].region}`)

    //     }

    //     // call the function
    //     fetchLocation()
    //         // make sure to catch any error
    //         .catch(console.error);
    // }, [])

    // console.log(location)

    return (
        <>

            <Navbarr />


            <form onSubmit={handleSubmit}>

                <h1> Get Finance </h1>
                {/* <!-- 2 column grid layout with text inputs for the first and last names --> */}
                <div className="row mb-4">
                    <div className="col">
                        <div className="form-outline">
                            <input onChange={handleChange} name='title' id="title" type='text' placeholder='Job Title' value={data.title} className='form-control' />
                            <label className="form-label" for="title">Title</label>
                        </div>
                    </div>
                    <div className="col">
                        <div className="form-outline">
                            <input onChange={handleChange} required id="location" name='location' type='text' placeholder='location' value={data.location} className='form-control' />
                            <label className="form-label" for="location">Location</label>
                        </div>
                    </div>
                </div>

                {/* <!-- Text input --> */}
                <div className="form-outline mb-4">
                    <input onChange={handleChange} required name='date' id="date" type='date' placeholder='Date' value={data.date} className='form-control' />
                    <label className="form-label" for="date">Date</label>
                </div>

                {/* <!-- Text input --> */}
                <div className="form-outline mb-4">
                    <input onChange={handleChange} required name='timeframe' id="timeframe" type='number' placeholder='Time Frame in days' value={data.timeframe} className='form-control' />
                    <label className="form-label" for="form6Example4">Time Frame</label>
                </div>
                {/* <!-- Number input --> */}
                <div className="form-outline mb-4">
                    <input onChange={handleChange} required name='budget' id="budget" type='number' placeholder='Budget' value={data.budget} className='form-control' />
                    <label className="form-label" for="budget">Budget</label>
                </div>

                {/* <!-- Email input --> */}
                <div className="form-outline mb-4">
                    <input onChange={handleChange} required name='desc' id="desc" type='text' placeholder='Description' value={data.desc} className='form-control' rows="4" />
                    <label className="form-label" for="desc">Description</label>
                </div>

                {/* <!-- Checkbox --> */}
                <div className="form-check d-flex justify-content-center mb-4">
                    <select className="custom-select" value={data.jobType} onChange={handleChange} name='jobType' type='text' required >

                        <option value="">--Please choose a Job Type--</option>
                        <option value="remote">remote</option>
                        <option value="onsite">onsite</option>
                        <option value="onsite">Hybrid</option>
                    </select>

                </div>

                {/* <!-- Submit button --> */}
                <button type="submit" className="btn btn-primary btn-block mb-4"> Submit</button>
            </form>


        </>
    );
}









