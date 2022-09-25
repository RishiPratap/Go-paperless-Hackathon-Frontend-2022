import 'bootstrap/dist/css/bootstrap.min.css';
import './profile.css';
import {Link} from "react-router-dom";

// After Setting up Firebase connection, all the data should be pulled from the db
var link = ""
var applicationList = [
    {
        name: "Medical Leave 1",
        status: "Approved"
    },
    {
        name: "Medical Leave 2",
        status: "Rejected"
    },
    {
        name: "Medical Leave 3",
        status: "In Progress"
    },
    {
        name: "Medical Leave 4",
        status: "Approved"
    },
]

var arr = ["Student", "Class Representative", "Faculty Advisor", "HOD"];
var res;
const Profile = () => {
    console.log(JSON.parse(localStorage.getItem("data")))
    if(localStorage.getItem("email") == null){
        alert("Please Login to continue");
    }
    res = JSON.parse(localStorage.getItem("data"));

    const colors = {"Approved":"green", "Rejected":"red", "In Progress":"yellow", "Inbox" : "blue"}


    const renderList = applicationList.map((item, index) => 
            <div className={`bods_item ${colors[item.status]}`} key={index}><p className='file_name'>{item.name}</p><Link to={`/status?appln=${item.name}`}><p>Check Progress</p></Link></div>
        // console.log(item.name)
    );

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