import "./uploads.css";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";
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
  const navigate = useNavigate();

  function addSignee(){
    let a = contacts;
    const n = a.length;
    a = [...a , <Contact i={n+1} key={n+1}/>];
    setContacts(a);
  }

  function submit_details(){
    console.log(selectedOptions);
    applnObj["accessToken"] = "sl.BP-TktAPHZ9O3faK3zy3mG9vEIZfakDJC92NIJL3JE-TxVX47nmhuFYOHwjdcthAc5r4sVjgw4ehEjgatx-fNbf31-o1TEEDp58byB7tM5ieYRCCdgbUZOcE2w7uG4iWdPdSUm8S1LNC";
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
        navigate("/profile");
        window.open(response.data);
      })
      .catch(function (error) {
        console.log(error);
        const Toast = Swal.mixin({
          toast: true,
          position: 'top-end',
          showConfirmButton: false,
          timer: 3000,
          timerProgressBar: true,
          didOpen: (toast) => {
            toast.addEventListener('mouseenter', Swal.stopTimer)
            toast.addEventListener('mouseleave', Swal.resumeTimer)
          }
        })
        
        Toast.fire({
          icon: 'error',
          title: `${error.message}`
        })

      });
    // dropbox/createapplication => POST
    window.location.href.replace("/profile");
  }

  const [contacts, setContacts] = useState([<Contact i={1} key={1}/>]);

  return (
    <div className="uploads mt-5">
      <div className="forms">
        <center><h3 className="pt-3">Create New Application</h3></center>
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
      <div className="Explore"></div>
    </div>
  );
}

export default Uploads;
