import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import './Navbar.css'
import CnidiriaLogo from './faviconCnidiriaMain1.jpg'
import { Link, useNavigate } from "react-router-dom";
import { Button } from "react-bootstrap";
import { useEffect, useState } from "react";

function Navbarr() {
    const userToken = localStorage.getItem("token");
    const[hasToken, setHastoken]= useState(false)
    const navigate = useNavigate()
    const Logout = (e) =>{
        e.preventDefault();
        localStorage.removeItem("token")
        navigate('/', { replace:true })
        setHastoken(false)
    }
    useEffect(()=>{
        if(userToken !== undefined){
            setHastoken(true)
        }
    },[userToken])

    return (
        <Navbar variant="dark" expand="lg" scrolling dark fixed="botton" className="bg-transparent" id='TheNav'>
            <Container fluid>
                <Navbar.Brand><Link to='/' id="Link_nav_home"> <img src={CnidiriaLogo} alt='Cnidiria Logo' id='CnidiriaLogo' /> </Link></Navbar.Brand>
                <Navbar.Toggle aria-controls="navbarScroll" />
                <Navbar.Collapse id="navbarScroll">
                    <Nav className="me-auto">
                        <Nav.Link><Link to='/'> <p className="Link_nav_p">HOME</p></Link> </Nav.Link>
                        <Nav.Link><Link to='/signing'><p className="Link_nav_p">Careers</p></Link> </Nav.Link>
                        
                        <Nav.Link><Link to='/About'><p className="Link_nav_p">About</p></Link> </Nav.Link>
                        {hasToken &&

                            <Nav.Link><Link to='/posts'> <p className="Link_nav_p">Post Job</p></Link> </Nav.Link>

                        }
                        <Nav.Link><Link to='/jobfeed'> <p className="Link_nav_p">Job feed</p></Link> </Nav.Link>
                        {hasToken &&
                            <Button type="button" className="btn btn-transparent" onClick={Logout}>Logout</Button>
                        }
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}

export default Navbarr;