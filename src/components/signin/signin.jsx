import 'bootstrap/dist/css/bootstrap.min.css';
import './signin.css';


const SignIn = () => {
    var signInObject = {};


    const printObject = () => {
        signInObject["email"]=document.getElementById('signin-email').value;
        signInObject["password"]=document.getElementById('signin-password').value;
        console.log(signInObject);


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