import 'bootstrap/dist/css/bootstrap.min.css';
import Dropdown from 'react-bootstrap/Dropdown';
import './signup.css';
import { useState } from 'react';


const SignUp = () => {
    const [dropVal,setDropVal] = useState("selectRank")
    var signUpObject = {};
    var rank;

    const setRank = (x,y) => {
        rank = x;
        setDropVal(y);
    }

    const printObject = () => {
        signUpObject["name"] = document.getElementById('signup-name').value;
        signUpObject["rank"] = rank;
        signUpObject["email"]=document.getElementById('signup-email').value;
        signUpObject["org"]=document.getElementById('signup-org-name').value;
        signUpObject["password"]=document.getElementById('signup-password1').value;
        console.log(signUpObject);
    }
    return (
        <center><div className='signUpDiv mt-5 p-5'>
            <table>
                <tr>
                    <td>Name</td>
                    <td><input id='signup-name' type="text" /></td>
                </tr>
                <tr>
                    <td>Email</td>
                    <td><input id='signup-email' type="email" /></td>
                </tr>
                <tr>
                    <td>Organisation Name</td>
                    <td><input id='signup-org-name' type="text" /></td>
                </tr>
                <tr>
                    <td>Password</td>
                    <td><input id='signup-password1' type="password" /></td>
                </tr>
                <tr>
                    <td>Confirm Password</td>
                    <td><input id='signup-password2' type="password" /></td>
                </tr>
                <tr>
                    <td>Position in the Organisation</td>
                    <td>
                    <Dropdown>
                        <Dropdown.Toggle  id="dropdown-basic">
                            {dropVal}
                        </Dropdown.Toggle>

                        <Dropdown.Menu>
                            {/* If arrow function is not used in onclick, then the function will run without even clicking */}
                            <Dropdown.Item onClick={() => setRank(1, "Student")}>1 Student</Dropdown.Item>
                            <Dropdown.Item onClick={() => setRank(2, "Class Representative")}>2 Class Representative</Dropdown.Item>
                            <Dropdown.Item onClick={() => setRank(3, "Faculty Advisor")}>3 Faculty Advisor</Dropdown.Item>
                            <Dropdown.Item onClick={() => setRank(4, "Academic Advisor")}>4 Academic Advisor</Dropdown.Item>
                            <Dropdown.Item onClick={() => setRank(5, "HOD")}>5 HOD</Dropdown.Item>
                        </Dropdown.Menu>
                    </Dropdown>
                    {/* select,options can also be used for a dropdown menu */}
                    </td>
                </tr>
            </table>
            <button onClick={()=> printObject()}>Submit</button>
        </div></center>
    );
}

export default SignUp