import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import 'bootstrap/dist/css/bootstrap.min.css';
import './navbar.css';

const Routing = () => { 
    return(
        <>
        <Navbar bg="dark" variant="dark">
        <Container>
          <Navbar.Brand href="/">TrackOn</Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link href="/SignUp">SignUp</Nav.Link>
            <Nav.Link href="/SignIn">SignIn</Nav.Link>
            <Nav.Link href="/profile">Profile</Nav.Link>
            <Nav.Link href="/Inbox">Inbox</Nav.Link>
          </Nav>
        </Container>
      </Navbar>
        </>
    );
 }

export default Routing;