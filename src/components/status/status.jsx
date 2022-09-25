import './status.css';
import {
    Stepper,
    Step,
    useStepper,
  } from "react-progress-stepper";
import axios from 'axios';

  const req_options = {
    // accessToken : 
  }

  // axios.post("http://localhost:3000/dropbox/getprogress", )

  var prog_details = {
    current_hop: 4,
    total_hops: 6,
    files: [
      "Parth Sundarka - WhatsApp Image 2022-09-15 at 6.58.06 PM.jpeg",
      "Parth Sundarka - WhatsApp Image 2022-09-15 at 6.58.04 PM.jpeg"
    ]
  }



  const steps = []
  for(let i=0; i<prog_details.total_hops; i++){
    steps.push(<Step />);
  }

  const files = [];
  for(let x=0; x<prog_details.files.length; x++){
    files.push(prog_details.files[x]);
  }


function Progress(){
  var applName = window.location.href.split("?")[1].split("=")[1].replaceAll("%20", " ");
  console.log(applName);
  const { step, incrementStep, decrementStep } = useStepper(prog_details.current_hop, prog_details.total_hops); //(current, total hops)
  return(
    <>
      <div className="step">
        <div className='steps'>
          <Stepper step={step}>
            {steps}
          </Stepper>
        </div>
      </div>
      <center><table className='b1 p-3'>
        <tr>
          <td>
            Application name:
          </td>
          <td>
            {applName}
          </td>
        </tr>
        <tr>
          <td>
            Application file: 
          </td>
          <td>
            {prog_details.files[0]}
          </td>
          
        </tr>
        <tr>
          <td>
           Proof: 
          </td>
          <td>
            {prog_details.files[1]}
          </td>
        </tr>
      </table></center>
    </>
    );
}

export default Progress;