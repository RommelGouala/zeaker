
import Navbarr from "../Navbar/Navbar"
import './postJob.css'
import { useState } from "react"
import { useNavigate } from "react-router-dom"
import LoadingAnimation from '../LoadingAnimation/LoadingAnimation'




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

    const [isLoading, setIsLoading] = useState(false)
    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('')
    const [date, setDate] = useState('')
    const [timeframe, setTimeframe] = useState('')
    const [location, setLocation] = useState('')
    const [jobType, setJobType] = useState('')
    const [budget, setBudget] = useState('')

    const handleSubmit = async (e) => {
        const token = localStorage.getItem("token");
        const Url = process.env.REACT_APP_SERVER_URL + '/index/'
        e.preventDefault();

        const profanityRegex = /\b(ass|shit|fuck|damn|hell|bitch|bastard|cock|cunt|dick|piss|slut|whore)\b/i;
        // regex pattern to match against common profanity words
        if (profanityRegex.test(data.title)) {
            setTitle('Please change your title');
            return
        } else if (data.title.length < 3) {
            setTitle('Title is too short. It should be more than 3 characters');
            return
        } else {
            setTitle('')
        }

        const validLocations = ['Alabama', 'Alaska', 'Arizona', 'Arkansas', 'California', 'Colorado', 'Connecticut', 'Delaware', 'Florida', 'Georgia', 'Hawaii', 'Idaho', 'Illinois', 'Indiana', 'Iowa', 'Kansas', 'Kentucky', 'Louisiana', 'Maine', 'Maryland', 'Massachusetts', 'Michigan', 'Minnesota', 'Mississippi', 'Missouri', 'Montana', 'Nebraska', 'Nevada', 'New Hampshire', 'New Jersey', 'New Mexico', 'New York', 'North Carolina', 'North Dakota', 'Ohio', 'Oklahoma', 'Oregon', 'Pennsylvania', 'Rhode Island', 'South Carolina', 'South Dakota', 'Tennessee', 'Texas', 'Utah', 'Vermont', 'Virginia', 'Washington', 'West Virginia', 'Wisconsin', 'Wyoming'];

        const locationRegex = new RegExp(`^(${validLocations.join('|')})$`, 'i');

        if (!locationRegex.test(data.location)) {
            setLocation("Invalid location. It has a state from U.S.A");
            return
        } else {
            setLocation('')
        }


        const dateRegex = /^\d{4}-\d{2}-\d{2}$/; // regex pattern to match YYYY-MM-DD format

        if (!dateRegex.test(data.date)) {
            setDate('Invalid date format. Please enter a date with this format MM-DD-YYYY');
            return;
        }

        const year = parseInt(data.date.slice(0, 4));
        const month = parseInt(data.date.slice(5, 7)) - 1; // month is zero-indexed in Date objects
        const day = parseInt(data.date.slice(8, 10));

        const selectedDate = new Date(year, month, day);
        const today = new Date();
        const yesterday = new Date(today.getFullYear(), today.getMonth(), today.getDate() - 1);

        if (selectedDate <= yesterday) {
            setDate('Invalid date. Please select a date that is today or in the future.');
            return;
        } else {
            setDate('');
        }



        if (data.timeframe < 1) {
            setTimeframe('Cannot choose zero or negative numbers');
            return;
        } else if (!/^[0-9]+$/.test(data.timeframe)) {
            setTimeframe('Cannot choose negative numbers');
            return;
        } else {
            setTimeframe('');
        }

        if (data.budget < 100) {
            setBudget('Job needs to be more than $100')
            return
        } else if (!/^[0-9]+$/.test(data.budget)) {
            setBudget('Budget cannot be a negative number')
            return
        } else {
            setBudget('')
        }

        if (profanityRegex.test(data.desc)) {
            setDescription('Profanity found in description')
            return
        } else if (data.desc.length < 10) {
            setDescription('Description is too short. It should be more than 10 characters')
            return
        } else {
            setDescription('')
        }

        if (!data.jobType) {
            setJobType('Must choose a Job Type')
            return
        } else {
            setJobType('')
        }



        try {
            setIsLoading(true)
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
                setIsLoading(false)
            } else {
                navigate('/jobfeed', { replace: true })

            }
        } catch (error) {

        }
    }


    return (
        <>

            <Navbarr />

            {isLoading ? <LoadingAnimation htext='Post is Loading' /> :
                <form onSubmit={handleSubmit}>
                    <h1> Get Finance </h1>
                    {/* <!-- 2 column grid layout with text inputs for the first and last names --> */}
                    <div className="row mb-4">
                        <div className="col">
                            <div className="form-outline">
                                <input onChange={handleChange} name='title' id="title" type='text' placeholder='Job Title' value={data.title} className='form-control' />
                                <label className="form-label" htmlFor="title">Title</label>
                            </div>
                            <p className="text-danger">{title}</p>
                        </div>
                        <div className="col">
                            <div className="form-outline">
                                <input onChange={handleChange} id="location" name='location' type='text' placeholder='location' value={data.location} className='form-control' />
                                <label className="form-label" htmlFor="location">Location</label>
                            </div>
                        </div>
                    </div>
                    <p className="text-danger">{location}</p>
                    {/* <!-- Text input --> */}
                    <div className="form-outline mb-4">
                        <input onChange={handleChange} name='date' id="date" type='date' placeholder='Date' value={data.date} className='form-control' />
                        <label className="form-label" htmlFor="date">Date</label>
                    </div>
                    <p className="text-danger">{date}</p>
                    {/* <!-- Text input --> */}
                    <div className="form-outline mb-4">
                        <input onChange={handleChange} name='timeframe' id="timeframe" type='number' placeholder='Time Frame in days' value={data.timeframe} className='form-control' />
                        <label className="form-label" htmlFor="form6Example4">Time Frame</label>
                    </div>
                    <p className="text-danger">{timeframe}</p>
                    {/* <!-- Number input --> */}
                    <div className="form-outline mb-4">
                        <input onChange={handleChange} name='budget' id="budget" type='number' placeholder='Budget' value={data.budget} className='form-control' />
                        <label className="form-label" htmlFor="budget">Budget</label>
                    </div>
                    <p className="text-danger">{budget}</p>
                    {/* <!-- Email input --> */}
                    <div className="form-outline mb-4">
                        <input onChange={handleChange} name='desc' id="desc" type='text' placeholder='Description' value={data.desc} className='form-control' rows="4" />
                        <label className="form-label" htmlFor="desc">Description</label>
                    </div>
                    <p className="text-danger">{description}</p>

                    {/* <!-- Checkbox --> */}
                    <div className="form-check d-flex justify-content-center mb-4">
                        <select className="custom-select" value={data.jobType} onChange={handleChange} name='jobType' type='text'>

                            <option value="">--Please choose a Job Type--</option>
                            <option value="remote">remote</option>
                            <option value="onsite">onsite</option>
                            <option value="hybrid">hybrid</option>
                        </select>

                    </div>
                    <p className="text-danger">{jobType}</p>
                    {/* <!-- Submit button --> */}
                    <button type="submit" className="btn btn-primary btn-block mb-4"> Submit</button>
                </form>
            }


        </>
    );
}









