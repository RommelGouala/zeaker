import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import './Navbar.css'
import CnidiriaLogo from './faviconCnidiria.jpeg'

function Navbarr() {
    return (
        <Navbar variant="dark" expand="lg" scrolling dark  fixed="botton" className="bg-transparent" id='TheNav'>
            <Container>
                <Navbar.Brand href="#home"><img src={CnidiriaLogo} alt='Cnidiria Logo' id='CnidiriaLogo' /></Navbar.Brand>
                <Nav className="me-auto">
                    <Nav.Link href="#home">About</Nav.Link>
                    <Nav.Link href="#features">Careers</Nav.Link>
                    <Nav.Link href="#pricing">Contact</Nav.Link>
                </Nav>
            </Container>
        </Navbar>
    );
}

export default Navbarr;




