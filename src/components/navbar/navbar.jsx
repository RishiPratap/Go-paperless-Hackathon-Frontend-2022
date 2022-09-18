import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import 'bootstrap/dist/css/bootstrap.min.css';
import './navbar.css';

const Routing = (props) => { 
  const isLoggedIn = props.isLoggedIn;
  {/* Profile should be visible only after login */}
  {/* <Nav.Link href="/profile">Profile</Nav.Link> */}
  {/* Inbox should be visible only after login */}
  {/* <Nav.Link href="/Inbox">Inbox</Nav.Link> */}
    if(isLoggedIn){
      return(
        <>
          <Navbar bg="dark" variant="dark">
            <Container>
              <Navbar.Brand href="/">TrackOn</Navbar.Brand>
              <Nav className="">
                <Nav.Link href="/inbox">Inbox</Nav.Link>
                <Nav.Link href="/profile">User</Nav.Link>
              </Nav>
            </Container>
          </Navbar>
        </>
      );
    }
    else{
      return(
        <>
          <Navbar bg="dark" variant="dark">
            <Container>
              <Navbar.Brand href="/">TrackOn</Navbar.Brand>
              <Nav className="">
                <Nav.Link href="/SignUp">SignUp</Nav.Link>
                <Nav.Link href="/SignIn">SignIn</Nav.Link>
              </Nav>
            </Container>
          </Navbar>
        </>
      );
    }
 }

export default Routing;