import './status.css';
import {
    Stepper,
    Step,
    useStepper,
  } from "react-progress-stepper";

function Progress(){
    const { step, incrementStep, decrementStep } = useStepper(0, 6); //(current, total hops)
    return(
        <div className="step">
       <div className='steps'>
        <Stepper step={step}>
        <Step></Step>
        <Step></Step>
        <Step></Step>
        <Step></Step>
        <Step></Step>
        <Step></Step>
      </Stepper>
      </div>
      <div className='buttons'>
      <button onClick={decrementStep}>Prev</button>
      <button onClick={incrementStep}>Next</button>
      </div>
      </div>
    );
}

export default Progress;