import 'bootstrap/dist/css/bootstrap.min.css';
import './signin.css';
import axios from "axios";
import { useNavigate } from "react-router-dom";


const SignIn = () => {
    var signInObject = {};
    const navigate = useNavigate();

    const printObject = () => {
        signInObject["email"]=document.getElementById('signin-email').value;
        signInObject["password"]=document.getElementById('signin-password').value;
        console.log(signInObject);
        axios.post("http://localhost:3000/users/getuser", signInObject)
      .then(function (response) {
        console.log(response);
        localStorage.setItem("email", signInObject.email);
        if(response.status == 200){
            localStorage.setItem("data",JSON.stringify(response.data));
            navigate("/profile");
        }
      })
      .catch(function (error) {
        console.log(error);
        alert(error.message);
      });

        localStorage.setItem("email", signInObject.email);
    }
    return (
        <center><div className='signInDiv mt-5 p-5'>
            <table>
                <tr>
                    <td>Email</td>
                    <td><input id='signin-email' type="email" /></td>
                </tr>
                <tr>
                    <td>Password</td>
                    <td><input id='signin-password' type="password" /></td>
                </tr>
            </table>
            <button onClick={()=> printObject()}>Submit</button>
        </div></center>
    );
}

export default SignIn