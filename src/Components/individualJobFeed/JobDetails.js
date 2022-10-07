import Navbarr from "../Navbar/Navbar";
import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { useParams } from "react-router-dom";




export default function JobDetails(){
    const { id } = useParams();
    const [job_details, setjobDetails] = useState(null)
    const Url = process.env.REACT_APP_SERVER_URL + '/index/'
    const navigate = useNavigate()
   
   
   
    const content = job_details && (
        <div className="The_JobDetails">


        
            <h2>SCP Designation: {job_details.title}</h2>
            <img src={job_details.image} alt='pic'></img>
            <br />
            <p>Location : {job_details.location}</p>
            <p>Discovery Date: {job_details.date}</p>
            <p>Description: {job_details.description}</p>
            <p>Budget {job_details.budget}</p>
            <br />
            <button className="The_button" >Edit Job</button>
            <br />
            <button className="The_button" >Delete Job</button>


        </div>
    )


    return(
        <>
        <Navbarr/>
        <h1>Details</h1>
        </>
    )
}