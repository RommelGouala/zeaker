import Navbarr from "../Navbar/Navbar";
import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { useParams } from "react-router-dom";
import { useEffect } from "react";
import axios from 'axios'
import './JobDetails.css'



export default function JobDetails(){
    const { id } = useParams();
    const [job_details, setjobDetails] = useState(null)
    const Url = process.env.REACT_APP_SERVER_URL + `/index/${id}`
    const navigate = useNavigate()
    const [postOnerResponse, setPostOwnerResponse] = useState(null)
    
    useEffect(() => {
        axios.get(Url, { headers: { 'Access-Control-Allow-Origin': '*' } })
            .then(response => {
                setjobDetails(response.data)
                setPostOwnerResponse(response.data.postOwner)
            })
    }, [Url])

    const handleEdit = () => {
        navigate(`/index/${id}`, { replace: true })
    }

    const handleDelete = async () => {
        const token = localStorage.getItem("token")
        await fetch(Url, {
            method: 'DELETE',
            headers: {
                // 'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': token
            }
        })
        navigate('/jobfeed', { replace: true })
    }
   
    const userId = localStorage.getItem("id");

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
            { postOnerResponse === userId &&
            <>
            <button className="The_button" onClick={handleEdit}>Edit Entry</button>
            <br/>
            <button className="The_button" onClick={handleDelete}>Delete Entry</button>
            </>
            }


        </div>
    )


    return(
        <>
        <Navbarr/>
        <h1>Details</h1>
        {content}
        </>
    )
}