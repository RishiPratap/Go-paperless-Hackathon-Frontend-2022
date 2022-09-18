import Home from '../src/components/home/home.jsx';
import Profile from './components/profile/profile.jsx';
import Routing from './components/navbar/navbar.jsx';
import NoMatch from './components/404/fallback.jsx';
import Uploads from '../src/components/uploads/uploads.jsx';
import Status from '../src/components/status/status.jsx';
import SignUp from '../src/components/signup/signup.jsx';
import SignIn from '../src/components/signin/signin.jsx';
import Inbox from '../src/components/inbox/inbox.jsx';
import Preview from './components/preview/preview.jsx';
import {
    BrowserRouter as Router,
    Routes,
    Route
  } from "react-router-dom";

function App (){
    return(
        <>
          <Router>
            <Routing isLoggedIn={false}/>
            <Routes>
              <Route path="/profile" element={<Profile />}>
              </Route>
              <Route path="/upload" element={<Uploads />}>
              </Route>
              <Route path="/status" element={<Status />}>
              </Route>
              <Route path="/inbox" element={<Inbox />}>
              </Route>
              <Route path="/viewfile" element={<Preview />}>
              </Route>
              <Route path="/" element={<Home />}>
              </Route>
              <Route path="*" element={ <NoMatch />}>
              </Route>
              <Route path="/SignUp" element={<SignUp />}>
              </Route>
              <Route path="/SignIn" element={<SignIn />}>
              </Route>
            </Routes>
          </Router>
        </>
    );
}

export default App;