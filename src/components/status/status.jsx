import './status.css';
import {
    Stepper,
    Step,
    useStepper,
  } from "react-progress-stepper";

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

      <div>
        {files}
      </div>
    </>
    );
}

export default Progress;