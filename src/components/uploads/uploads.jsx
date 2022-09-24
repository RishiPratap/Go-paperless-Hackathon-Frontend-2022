import "./uploads.css";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";
import { createElement, useState } from "react";






function Contact({i}){
  return (<Form.Group className="mb-3 Contact" controlId="formGroupFile">
   <Form.Label>Signer {i}</Form.Label>
   <Form.Control type="text" />
 </Form.Group>);
}

function Uploads() {

  function addSignee(){
    let a = contacts;
    const n = a.length;
    a = [...a , <Contact i={n+1} key={n+1}/>];
    setContacts(a);
  }

  const [contacts, setContacts] = useState([<Contact i={1} key={1}/>]);

  return (
    <div className="uploads">
      <div className="forms">
        <Form>
          <Form.Group className="mb-3" controlId="formGroupText">
            <Form.Label>Application Name</Form.Label>
            <Form.Control type="text" placeholder="Enter application name" />
          </Form.Group>
          <Form.Group controlId="contacts-list" className="Contact-list">
            {contacts}
          </Form.Group>
          <Button variant="primary" onClick={addSignee}>
              Add Signer
            </Button>
          <Form.Group className="mb-3" controlId="formGroupFile">
            <br></br>
            <Button variant="primary" type="submit">
              Submit
            </Button>
          </Form.Group>
        </Form>
      </div>
    </div>
  );
}

export default Uploads;
