import 'bootstrap/dist/css/bootstrap.min.css';
import './profile.css';
import {Link} from "react-router-dom";

const Profile = () => {
    return(
        <div className='Profile'>
        <div className='bods'><Link to='/upload'><p>Upload File</p></Link></div>
        <div className='History'>
        <div className='bods_item'><p className='file_name'>File Name</p><Link to='/status'><p>Check Progress</p></Link></div>
        <div className='bods_item'><p className='file_name'>File Name</p><Link to='/status'><p>Check Progress</p></Link></div>
        </div>
        </div>
    );
}

export default Profile