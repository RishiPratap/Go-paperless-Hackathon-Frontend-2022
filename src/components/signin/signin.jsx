import 'bootstrap/dist/css/bootstrap.min.css';
import './signin.css';
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Swal from 'sweetalert2';

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
            window.location.reload();
        }
      })
      .catch(function (error) {
        console.log(error);
        const Toast = Swal.mixin({
            toast: true,
            position: 'top-end',
            showConfirmButton: false,
            timer: 3000,
            timerProgressBar: true,
            didOpen: (toast) => {
              toast.addEventListener('mouseenter', Swal.stopTimer)
              toast.addEventListener('mouseleave', Swal.resumeTimer)
            }
          })
          
          Toast.fire({
            icon: 'error',
            title: `${error.message}`
          })
      });

    }
    return (
      <>
        <center><div className='signInDiv mt-5 p-5'>
          <center><h3>Sign In</h3></center>
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
            <button className='submitbtn' onClick={()=> printObject()}>Submit</button>
        </div></center>
        <div className="Explore"></div>
      </>
    );
}

export default SignIn