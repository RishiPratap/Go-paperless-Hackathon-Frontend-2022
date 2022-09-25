import "./uploads.css";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";
import { createElement, useState } from "react";
import Swal from 'sweetalert2'
import Select from 'react-select';

var selectedOptions = [];
var applnObj = {};

var options = [
  { value: 'sri@gmail.com', label: 'Srihari' },
  { value: 'rishi@gmail.com', label: 'Rishi' },
  { value: 'parth@gmail.com', label: 'Parth' },
  { value: 'add', label: 'Add contact' }
];

async function updateArray(i,val) {
  if(val == "add") {
    const { value: formValues } = await Swal.fire({
      title: 'Add Contact',
      confirmButtonText: "Submit",
      html:
        '<input required placeholder="Enter the name" id="swal-input1" class="swal2-input">' +
        '<input required placeholder="Enter the email" id="swal-input2" class="swal2-input">',
      focusConfirm: false,
      preConfirm: () => {
        return [
          document.getElementById('swal-input1').value,
          document.getElementById('swal-input2').value
        ]
      }
    })
    
    if (formValues) {
      Swal.fire(JSON.stringify(formValues))
    }
  }
  else{
    selectedOptions[i] = val;
  }
  
}

function Contact({i}){


  return (
    <>
  <Form.Group className="mb-3 Contact" controlId="formGroupFile">
   <Form.Label>Signer {i}</Form.Label>
   <Select options={options} onChange={(e) => updateArray(i-1,e.value)}/>
 </Form.Group>
    </>
 );
}

function Uploads() {

  function addSignee(){
    let a = contacts;
    const n = a.length;
    a = [...a , <Contact i={n+1} key={n+1}/>];
    setContacts(a);
  }

  function submit_details(){
    console.log(selectedOptions);
    applnObj["accessToken"] = "sl.BP-4-ZgsOrCUADuqnWOAzE3ll2XHBtC7YxWxITtpCza-z7bXIoxX5ysRuhpM1VP7ptKQ_R2Vno6gly7bp1BY-H0n00_dos2EC8KC-Uw7K2g1BY1owGmi8sZq7jRAeZbhUUQrXWU55TeG";
    applnObj["appName"] = document.getElementById("applnName").value;
    applnObj["email"] = JSON.parse(localStorage.getItem("data")).email;
    //applnObj["applType"] = document.getElementById("applnType").value;
    applnObj["signers"] = selectedOptions;

    console.log(applnObj);
    axios
      .post("http://localhost:3000/dropbox/createapplication", applnObj)
      .then(function (response) {
        console.log(response);
        // response.url => url to open
        window.location.href.replace("/profile");
        window.open(response.data);
      })
      .catch(function (error) {
        console.log(error);
        alert(error.message);
      });
    // dropbox/createapplication => POST
    window.location.href.replace("/profile");
  }

  const [contacts, setContacts] = useState([<Contact i={1} key={1}/>]);

  return (
    <div className="uploads">
      <div className="forms">
        <Form onSubmit={(e) => e.preventDefault()}>
          <Form.Group className="mb-3" controlId="formGroupText">
            <Form.Label>Application Name</Form.Label>
            <Form.Control id="applnName" type="text" placeholder="Enter application name" />
          </Form.Group>
          <Form.Group controlId="contacts-list" className="Contact-list">
            {contacts}
          </Form.Group>
          <Button variant="primary" onClick={addSignee}>
              Add Signer
            </Button>
          <Form.Group className="mb-3" controlId="formGroupFile">
            <br></br>
            <Button variant="primary" type="submit" onClick={() => submit_details()}>
              Submit
            </Button>
          </Form.Group>
        </Form>
      </div>
    </div>
  );
}

export default Uploads;
