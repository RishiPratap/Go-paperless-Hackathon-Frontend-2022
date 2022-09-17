import 'bootstrap/dist/css/bootstrap.min.css';
import Dropdown from 'react-bootstrap/Dropdown';
import './signup.css';


const SignUp = () => {
    var signUpObject = {};
    var rank;

    const setRank = (x) => {
        rank = x;
    }

    const printObject = () => {
        signUpObject["name"] = document.getElementById('signup-name').value;
        signUpObject["rank"] = rank;
        signUpObject["email"]=document.getElementById('signup-email').value;
        signUpObject["organisation"]=document.getElementById('signup-org-name').value;
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
                            Dropdown Button
                        </Dropdown.Toggle>

                        <Dropdown.Menu>
                            {/* If arrow function is not used in onclick, then the function will run without even clicking */}
                            <Dropdown.Item id='1-Student' onClick={() => setRank(1)}>1 Student</Dropdown.Item>
                            <Dropdown.Item onClick={() => setRank(2)}>2 FA</Dropdown.Item>
                            <Dropdown.Item onClick={() => setRank(3)}>3 HOD</Dropdown.Item>
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