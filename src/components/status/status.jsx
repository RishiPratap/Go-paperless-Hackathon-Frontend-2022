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
  files: [],
  signers: [],
};

// axios.post("http://localhost:3000/dropbox/getprogress", )

function Progress() {
  const [prog_details, setprog] = useState([]);
  const [steps, setStep] = useState([]);
  const [files, setFiles] = useState([]);
  const [Done, setDone] = useState(false);
  const [isSigner, setSigner] = useState(false);

  useEffect(() => {
    axios
      .post("http://localhost:3000/dropbox/getprogress", {
        email: localStorage.getItem("email"),
        accessToken:
          "sl.BP8gzzFFN1rAOGEiD5Nqi0OF-prvAiL8n5mAejzODoQzbs37bqRAJsIX2P-mEkLn9z1UakcgsZ-4a7gI0gJUrJ8duvz77xIjZvpRn6IuDpI7ucsizRZxzgrg1TPbQpto1MzUjmZJrI4G",
        path: window.location.href
          .split("?")[1]
          .split("=")[1]
          .replaceAll("%20", " "),
      })
      .then((resp) => {
        console.log(resp);
        setprog(resp.data);
        const stepsLOC = [];
        for (let i = 0; i < resp.data.total_hops; i++) {
          stepsLOC.push(<Step />);
        }
        setStep(stepsLOC);
        const filesLOC = [];
        for (let x = 0; x < resp.data.files.length; x++) {
          filesLOC.push(resp.data.files[x]);
        }
        setFiles(filesLOC);
        // console.log(prog_details);
        const email = localStorage.getItem("email");

        if (resp.data["signers"][resp.data.current_hop] == email) {
          setSigner(true);
        }
      });
  }, []);

  function launchSign() {
    console.log("Clicked");
    axios
      .post("http://localhost:3000/hellosign/getsignurl", {
        email: localStorage.getItem("email"),
        application_name: window.location.href
          .split("?")[1]
          .split("=")[1]
          .replaceAll("%20", " "),
      })
      .then((res) => {
        client.open(res.data, {
          skipDomainVerification: true,
          debug: true,
          allowCancel: true,
        });

        client.on("finish", (data) => {
          axios.post("http://localhost:3000/users/updatehop", {
            email: localStorage.getItem("email"),
            application_name: window.location.href
              .split("?")[1]
              .split("=")[1]
              .replaceAll("%20", " "),
          });
          setSigner(false);
        });
      });
  }
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
      <div className="step mt-5">
        <div className="steps">
          <Stepper step={step}>{steps}</Stepper>
        </div>
      </div>
      <center>
        <table className="b1 p-3 mt-5">
          <tr className="text-center">test</tr>
          <tr>
            <td>Application name:</td>
            <td>{applName}</td>
          </tr>
          <tr>
            <td>Application file:</td>
            <td>{files[0]?files[0]:"File is not uploaded yet"}</td>
          </tr>
          <tr>
            <td>Proof:</td>
            <td>{files[1]?files[1]:"File is not uploaded yet"}</td>
          </tr>
        </table>
      </center>
      {isSigner ? (
        <div className="btns">
          <center>
            <button className="btn btn-primary" onClick={launchSign}>
              Sign
            </button>
          </center>
        </div>
      ) : (
        ""
      )}
    </>
  );
}

export default Progress;
