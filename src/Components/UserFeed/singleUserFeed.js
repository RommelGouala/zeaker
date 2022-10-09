import Navbarr from "../Navbar/Navbar";
import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { useParams } from "react-router-dom";
import { useEffect } from "react";
import axios from 'axios'
import './JobDetails.css'



export default function SingleUserFeed(){
    const { id } = useParams();
    const [job_details, setjobDetails] = useState(null)
    const Url = process.env.REACT_APP_SERVER_URL + `/user/${id}`
    const navigate = useNavigate()
   
    useEffect(() => {
        axios.get(Url, { headers: { 'Access-Control-Allow-Origin': '*' } })
            .then(response => {
                setjobDetails(response.data)
            })
    }, [Url])

    console.log(job_details)
   
    const handleEdit = () => {
        navigate(`/user/${job_details.id}/edit`, { replace: true })
    }


    const handleDelete = async () => {
        await fetch(Url, {
            method: 'DELETE'
        })
        navigate('/user/all', { replace: true })
    }


    const content = job_details && (
        <div className="The_JobDetails">


        
            <h2>Job title: {job_details.title}</h2>
            <img src={job_details.image} alt='pic'></img>
            <br />
            <p>Location : {job_details.location}</p>
            <p>Discovery Date: {job_details.date}</p>
            <p>Description: {job_details.description}</p>
            <p>Budget {job_details.budget}</p>
            <br />
            <button className="The_button" onClick={handleEdit}>Edit Job</button>
            <br />
            <button className="The_button" onClick={handleDelete}>Delete Job</button>


        </div>
    )


    return(
        <>
        <Navbarr/>
        <h1>User Details Job Feeds</h1>
        {content}
        </>
    )
}