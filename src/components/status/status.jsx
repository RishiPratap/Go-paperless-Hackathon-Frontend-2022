import "./status.css";
import { Stepper, Step, useStepper } from "react-progress-stepper";
import axios from "axios";
import { useEffect, useState } from "react";
import HelloSign from "hellosign-embedded";

const req_options = {
  // accessToken :
};

const client = new HelloSign({
  clientId: "7c6cd4722bf993f3508d03033f104bce",
});

var prog_details = {
  current_hop: 1,
  total_hops: 6,
  files: [
    "Parth Sundarka - WhatsApp Image 2022-09-15 at 6.58.06 PM.jpeg",
    "Parth Sundarka - WhatsApp Image 2022-09-15 at 6.58.04 PM.jpeg",
  ],
  signers: ["parthusun8@gmail.com", "ram@ram.com"],
};

const steps = [];
for (let i = 0; i < prog_details.total_hops; i++) {
  steps.push(<Step />);
}

const files = [];
for (let x = 0; x < prog_details.files.length; x++) {
  files.push(prog_details.files[x]);
}
// axios.post("http://localhost:3000/dropbox/getprogress", )

function Progress() {
  const [isSigner, setSigner] = useState(false);
  // const [email, setemail] = useState(false);
  // const [appName, setname] = useState(false);
  // const [prog_details, setprog] = useState("");
  // const [steps, setSteps] = useState({});
  // const [, ] = useState({});

  // setprog(prog_details);

  useEffect(() => {
    const email = localStorage.getItem("email");

    // setprog(prog_details);
    if (prog_details["signers"][prog_details.current_hop] == email) {
      setSigner(true);
    }
  }, []);
  function launchSign() {
    axios
      .post("http://localhost:3000/hellosign/getsignurl", {
        email: "ps2644@srmist.edu.in",
        application_name: "ML 3",
      })
      .then((res) => {
        client.open(res.data, {
          skipDomainVerification: true,
          debug: true,
          allowCancel: true,
        });

        client.on("finish", (data)=>{axios.post("http://localhost:3000/users/updatehop", {email: "ps2644@srmist.edu.in", application_name : "ML 3"})});

      });
  }

  // setname(
  //   window.location.href.split("?")[1].split("=")[1].replaceAll("%20", " ")
  // );
  const applName = window.location.href
    .split("?")[1]
    .split("=")[1]
    .replaceAll("%20", " ");
  // setname(applName);

  console.log(applName);
  const { step, incrementStep, decrementStep } = useStepper(
    prog_details.current_hop,
    prog_details.total_hops
  ); //(current, total hops)
  return (
    <>
      <div className="step">
        <div className="steps">
          <Stepper step={step}>{steps}</Stepper>
        </div>
      </div>
      <center>
        <table className="b1 p-3">
          <tr>
            <td>Application name:</td>
            <td>{applName}</td>
          </tr>
          <tr>
            <td>Application file:</td>
            <td>{prog_details.files[0]}</td>
          </tr>
          <tr>
            <td>Proof:</td>
            <td>{prog_details.files[1]}</td>
          </tr>
        </table>
      </center>
      {isSigner ? (
        <div className="btns">
          <center><button className="btn btn-primary" onClick={launchSign}>
            Sign
          </button></center>
        </div>
      ) : (
        ""
      )}
    </>
  );
}

export default Progress;
