
import axios from "axios";
import { useEffect, useState } from "react";
import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';
import Button from 'react-bootstrap/Button';
import './jobfeed.css'
import { Link } from "react-router-dom";
import Navbarr from '../Navbar/Navbar'

export default function Jobfeed(){
    const Url = process.env.REACT_APP_SERVER_URL + '/index/all'
    const [Jobfeeds, setjobfeed] = useState(null)

    let content = null

  

    useEffect(() => {
        axios.get(Url, { headers: {'Access-Control-Allow-Origin': '*'}})
            .then(response => {
                setjobfeed(response.data)
            })
    }, [Url]);


    if (Jobfeeds) {
        content = Jobfeeds.map(Jobfeed => {
            return (
                <Card style={{ width: '18rem' }} key={Jobfeed.id}>
                    <Card.Img className="Carousel_img" variant="top" src={Jobfeed.image} />
                    <Card.Body>
                        <Card.Title>ID {Jobfeed.id}</Card.Title>
                        <Card.Text>
                            Title: <br />{Jobfeed.title}
                        </Card.Text>
                    </Card.Body>
                    <ListGroup className="list-group-flush">

                        <ListGroup.Item>Location: <br /> {Jobfeed.location}</ListGroup.Item>
                        <ListGroup.Item>Date: <br /> {Jobfeed.date} <br /> </ListGroup.Item>
                    </ListGroup>
                    <Card.Body>
                    <Link to={`/jobfeed/${Jobfeed._id}`}>
                        <Button variant="primary">Job infromation</Button>
                    </Link> 
                    </Card.Body>
                </Card>
            )
        })
    }
    
    
    return(
        <div className="Job_feed">
        <Navbarr/>
            <h1>Job feed</h1>
            <div className="Job_List_Container">
                {content}
            </div>
        </div>
    )
}