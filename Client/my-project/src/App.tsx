import "./App.css";
import Login from "./Components/Common/Auth/Login";
import "./Components/Common/Start/initial";
import Initial from "./Components/Common/Start/initial";
import { BrowserRouter as Router, Routes, Route} from "react-router-dom";
import Signupage from "./Pages/User/Signup";
import Homee from "./Pages/User/Home";
import Describe from "./Components/Common/Auth/Describe";
import Subdescribe from "./Components/Common/Auth/Subdescribe";
import OTPForm from "./Components/Common/Auth/Otp";
import Homeservice from "./Pages/User/Landing";
import PrivateRoutes from "./Components/Common/Auth/PrivateRoutes";
import MyFallbackComponent from "./Pages/User/MyFallbackComponent";
import {ErrorBoundary} from 'react-error-boundary'
import Profile from "./Components/Common/profile/Profile";
import Edit from "./Components/Common/profile/Edit";
import CPost from "./Components/Common/post/CPost";

const App:React.FC = ()=>{
  
  return (
    <div className="App">
       <ErrorBoundary FallbackComponent={MyFallbackComponent}>
      <Router>
        <Routes>
          <Route  path="/"  element={<Initial />} />
          <Route path="/home" element={<PrivateRoutes component={Homee} />} />
          <Route path="/landing" element={<Homeservice />} />
          <Route  path="/signup" element={<Signupage />} />
          <Route path="/describe" element={<Describe />} />
          <Route path="/sub_describe" element={<Subdescribe />} />
          <Route path="/otp" element={<OTPForm />} />
          <Route path="/login" element={<Login />} />
          {/* <Route path="/createpost" element={<CPost/>} /> */}
          <Route path="/profile" element={<PrivateRoutes component={Profile} />} />
          <Route path="/edit-profile" element={<PrivateRoutes component={Edit} />} />
          {/* <Route path="/home" element={<  Homee />} /> */}
         
        </Routes>
      </Router>
        </ErrorBoundary>
    </div>
  );
}

export default App;
