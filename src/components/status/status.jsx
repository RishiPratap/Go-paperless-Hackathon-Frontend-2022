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



// axios.post("http://localhost:3000/dropbox/getprogress", )

const Status = ({prog_details, steps}) => {

  const { step, incrementStep, decrementStep } = useStepper(
    prog_details.current_hop,
    prog_details.total_hops+1
  );

  return (<div className="steps">
          <Stepper step={step}>{steps}</Stepper>
        </div>);
}


function Progress() {
  const [prog_details, setprog] = useState([]);
  const [steps, setStep] = useState([]);
  const [files, setFiles] = useState([]);
  const [Done, setDone] = useState(false);
  const [isSigner, setSigner] = useState(false);
  const [isClicked, setClick] = useState(false);

  const loaderAnimation = (
    <svg
      width="38"
      height="38"
      viewBox="0 0 38 38"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <linearGradient x1="8.042%" y1="0%" x2="65.682%" y2="23.865%" id="a">
          <stop stop-color="#fff" stop-opacity="0" offset="0%" />
          <stop stop-color="#fff" stop-opacity=".631" offset="63.146%" />
          <stop stop-color="#fff" offset="100%" />
        </linearGradient>
      </defs>
      <g fill="none" fill-rule="evenodd">
        <g transform="translate(1 1)">
          <path
            d="M36 18c0-9.94-8.06-18-18-18"
            id="Oval-2"
            stroke="url(#a)"
            stroke-width="2"
          >
            <animateTransform
              attributeName="transform"
              type="rotate"
              from="0 18 18"
              to="360 18 18"
              dur="0.9s"
              repeatCount="indefinite"
            />
          </path>
          <circle fill="#fff" cx="36" cy="18" r="1">
            <animateTransform
              attributeName="transform"
              type="rotate"
              from="0 18 18"
              to="360 18 18"
              dur="0.9s"
              repeatCount="indefinite"
            />
          </circle>
        </g>
      </g>
    </svg>
  );

  useEffect(() => {
    const isInbox = window.location.href
      .split("?")[1]
      .split("&")[1]
      .split("=")[1];
    const options = {
      email: localStorage.getItem("email"),
      accessToken:
        "sl.BQBeOujSDJQGYODfZHtoWgX4ZvVcwGBaLFxmQzAmcr-ECtsl5g1Uy4GXz9KP1fekCRIcVW3CjexGYX53TvbFygFYYMsyY8DR7blazSLTUmQXFISiCQEbVrkq2hBaITU9A5OfT2DAWrYj",
      path: window.location.href
        .split("?")[1]
        .split("&")[0]
        .split("=")[1]
        .replaceAll("%20", " "),
    };
    console.log(isInbox);
    if (isInbox != false) {
      console.log("Email Changed")
      options.email = "student@gmail.com";
      console.log(options);
    }
    axios
      .post("http://localhost:3000/dropbox/getprogress", options)
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
        setDone(true);
      });
  }, []);

  function launchSign() {
    setClick(true);

    const isInbox = window.location.href
      .split("?")[1]
      .split("&")[1]
      .split("=")[1];
    const options = {
      email: localStorage.getItem("email"),
      application_name: window.location.href
      .split("?")[1]
      .split("&")[0]
      .split("=")[1]
      .replaceAll("%20", " "),
    }
    if (isInbox != false) {
      console.log("Email Changed")
      options.email = "student@gmail.com";
      console.log(options);
    }
    axios
      .post("http://localhost:3000/hellosign/getsignurl", options)
      .then((res) => {
        client.open(res.data, {
          skipDomainVerification: true,
          debug: true,
          allowCancel: true,
        });
        setClick(false);

        client.on("finish", () => {
          axios.post("http://localhost:3000/users/updatehop", options);
          setSigner(false);
          window.location.reload();
        });
      });
  }
  const applName = window.location.href
  .split("?")[1]
  .split("&")[0]
  .split("=")[1]
  .replaceAll("%20", " ");
  // setname(applName);

  console.log(applName);


  

  // setTimeout(()=>{
  //   for(var i=0; i<prog_details.current_hop - 1; i++){
  //     incrementStep();
  //   }
  // }, 3000);
  //(current, total hops)
  return (
    <>
      <div className="step mt-5">
        {Done ? <Status prog_details={prog_details} steps={steps}/> : <></>}
      </div>
      <center>
        <table className="b1 p-3 mt-5">
          
          <tr>
            <td>Application name:</td>
            <td>{applName}</td>
          </tr>
          <tr>
            <td>Application file:</td>
            <td>{files[0] ? files[0] : "File is not uploaded yet"}</td>
          </tr>
          <tr>
            <td>Proof:</td>
            <td>{files[1] ? files[1] : "File is not uploaded yet"}</td>
          </tr>
        </table>
      </center>
      {isSigner ? (
        <div className="btns">
          <center>
            <button className="btn btn-primary mx-3" onClick={launchSign}>
              {isClicked ? loaderAnimation : "Sign"}
            </button>
            <button className="btn btn-primary">
              Reject
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
