import 'bootstrap/dist/css/bootstrap.min.css';
import './profile.css';
import {Link} from "react-router-dom";
import { useEffect, useState } from 'react';
import axios from 'axios';

// After Setting up Firebase connection, all the data should be pulled from the db
var link = "";



var arr = ["Student", "Class Representative", "Faculty Advisor", "HOD"];
var res;
const Profile = () => {
    const [applicationList, setapplications] = useState([
        {
            name: "Name",
            status: "Rejected"
        },
    ])

    let renderList = [];


    useEffect(() => {
        axios.post('http://localhost:3000/dropbox/viewapplication', {
            email : localStorage.getItem("email"),
        }).then((response) => {
            console.log(response.data);
            // applicationList = response.data;
            setapplications(response.data);
        });

        
        
    }, []);
    const colors = {"Approved":"green", "Rejected":"red", "Pending":"yellow", "Inbox" : "blue"}
    renderList = applicationList.map((item, index) => 
            <div className={`bods_item ${colors[item.status]}`} key={index}><p className='file_name'>{item.name}</p><Link to={`/status?appln=${item.name}`}><p>Check Progress</p></Link></div>);


    console.log(JSON.parse(localStorage.getItem("data")))
    if(localStorage.getItem("email") == null){
        alert("Please Login to continue");
    }
    res = JSON.parse(localStorage.getItem("data"));



    

    return(
        <div className='Profile'>
            <div className="userProfile p-3">
                <center>
                    <h2>User Details</h2>
                    <img className='profilePic' id='profilePic' src={res.dp_url} alt="" />
                    <table>
                        <tbody>
                            <tr>
                                <td>Name:</td>
                                <td id='user-name'>{res.name}</td>
                            </tr>
                            <tr>
                                <td>Email:</td>
                                <td id='user-email'>{res.email}</td>
                            </tr>
                            <tr>
                                <td>Organisation:</td>
                                <td id='user-org'>{res.org}</td>
                            </tr>
                            <tr>
                                <td>Role:</td>
                                <td id='user-role'>{arr[res.rank]}</td>
                            </tr>
                        </tbody>
                    </table>
                    {/* Update button for updating role (promotion / demotion) */}
                    {/* <button>Update</button> */}
                </center>
            </div>
            <div className='bods'><Link to='/upload'><p>Create New Application</p></Link></div>
            <div className='History'>
                {renderList}
            </div>
        </div>
    );
}

export default Profile