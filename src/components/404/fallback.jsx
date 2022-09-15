import {
    Link
  } from "react-router-dom";
import './fallback.css';

function fallback(){
    return(
        <div className="fallback">
            <h1>404</h1>
            <h2>Page not found</h2>
            <p>Sorry, the page you are looking for does not exist.</p>
            <p>You can always go back to the <Link to="/">homepage</Link>.</p>
        </div>
    );
}

export default fallback;