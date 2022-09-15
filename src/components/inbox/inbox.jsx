import './inbox.css';
import {Link} from "react-router-dom";

function Inbox(){
    return(
        <div className="inbox">
        <label>Inbox</label>
        <div className='History_view'>
        <div className='bods_item_view'><p className='file_name_view'>File Name</p><Link to='/viewfile'><p>View File</p></Link></div>
        <div className='bods_item_view'><p className='file_name_view'>File Name</p><Link to='/viewfile'><p>View File</p></Link></div>
        </div>
        </div>
    );
}

export default Inbox;