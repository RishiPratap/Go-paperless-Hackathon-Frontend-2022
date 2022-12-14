import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import 'bootstrap/dist/css/bootstrap.min.css';
import './navbar.css';
import { useEffect, useState } from 'react';

const Routing = () => { 
  
  {/* Profile should be visible only after login */}
  {/* <Nav.Link href="/profile">Profile</Nav.Link> */}
  {/* Inbox should be visible only after login */}
  {/* <Nav.Link href="/Inbox">Inbox</Nav.Link> */}

  function logout() {
    localStorage.clear();
    window.location.replace("signin");
  }

  const [login, setLogin] = useState(false);
  useEffect(() => {
    const a = localStorage.getItem("email");
    if(a){
      setLogin(true);
    }
    else{
      setLogin(false);
    }
  },[]);
    if(login){
      return(
        <>
          <Navbar bg="dark" variant="dark">
            <Container>
              <Navbar.Brand href="/">TrackOn</Navbar.Brand>
              <Nav className="">
                <Nav.Link href="/profile">Profile</Nav.Link>
                <Nav.Link onClick={() => logout()}>Logout</Nav.Link>
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