import "./uploads.css";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { createElement, useEffect, useState } from "react";
import Swal from "sweetalert2";
import Select from "react-select";

var selectedOptions = [];
var applnObj = {};

function Uploads() {
  const [options, setOptions] = useState([
    {
      value: "add",
      label: "Add contact",
    },
  ]);

  const [renderEl, setrender] = useState(false);

  const [contacts, setContacts] = useState([]);

  function setcon() {
    console.log(options);
    setContacts([<Contact i={1} key={1} />]);
  }

  useEffect(() => {
    axios
      .post("http://localhost:3000/users/getmycontacts", {
        email: localStorage.getItem("email"),
      })
      .then((resp) => {
        console.log(resp.data);
        setOptions([...resp.data, ...options]);
        setrender(true);
        // console.log(options);
        // setTimeout(() => {
        //   setcon();
        //   setrender(true);
        // }, 5000);
      });
  }, []);

  async function updateArray(i, val) {
    if (val == "add") {
      const { value: formValues } = await Swal.fire({
        title: "Add Contact",
        confirmButtonText: "Submit",
        html:
          '<input required placeholder="Enter the name" id="swal-input1" class="swal2-input">' +
          '<input required placeholder="Enter the email" id="swal-input2" class="swal2-input">',
        focusConfirm: false,
        preConfirm: () => {
          return [
            document.getElementById("swal-input1").value,
            document.getElementById("swal-input2").value,
          ];
        },
      });

      if (formValues) {
        Swal.fire(JSON.stringify(formValues));
      }
    } else {
      selectedOptions[i] = val;
    }
  }

  function Contact({ i }) {
    console.log("Contacts", options);
    return (
      <>
        <Form.Group className="mb-3 Contact" controlId="formGroupFile">
          <Form.Label>Signer {i}</Form.Label>
          <Select
            options={options}
            onChange={(e) => updateArray(i - 1, e.value)}
          />
        </Form.Group>
      </>
    );
  }

  const navigate = useNavigate();

  function addSignee() {
    let a = contacts;
    const n = a.length;
    a = [...a, <Contact i={n + 1} key={n + 1} />];
    setContacts(a);
  }

  function submit_details() {
    console.log(selectedOptions);
    applnObj["accessToken"] =
      "sl.BQAVc4hdpa7QZMxzTvX359c2jt3hZpW8iGrIeav2OECumcaVcoqjxS_tiXrOIYaWfhJBi9q1TrxsT9Vn_QwruzfL23YDUzmTsl_mEIzsPCRJIGgkvS4vUpH2tzaxEe4LbXureyqp2zJv";
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
          position: "top-end",
          showConfirmButton: false,
          timer: 3000,
          timerProgressBar: true,
          didOpen: (toast) => {
            toast.addEventListener("mouseenter", Swal.stopTimer);
            toast.addEventListener("mouseleave", Swal.resumeTimer);
          },
        });

        Toast.fire({
          icon: "error",
          title: `${error.message}`,
        });
      });
    // dropbox/createapplication => POST
    window.location.href.replace("/profile");
  }

  return (
    <div className="uploads mt-5">
      <div className="forms">
        <center>
          <h3 className="pt-3">Create New Application</h3>
        </center>
        <Form onSubmit={(e) => e.preventDefault()}>
          <Form.Group className="mb-3" controlId="formGroupText">
            <Form.Label>Application Name</Form.Label>
            <Form.Control
              id="applnName"
              type="text"
              placeholder="Enter application name"
            />
          </Form.Group>
          <Form.Group controlId="contacts-list" className="Contact-list">
            {renderEl ? contacts : <div></div>}
          </Form.Group>
          <Button variant="primary" onClick={addSignee}>
            Add Signer
          </Button>
          <Form.Group className="mb-3" controlId="formGroupFile">
            <br></br>
            <Button
              variant="primary"
              type="submit"
              onClick={() => submit_details()}
            >
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
