import { createRoot } from "react-dom/client"
import { Suspense } from "react"
import  App  from "./App"
import "./styles.css"
import { BrowserRouter } from "react-router-dom"
import {Routes,Route} from "react-router-dom";
import './index.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import Sign from './Components/SignUp/signLoging'
import SignUp from "./Components/SignUp/signUp"
import Jobpost from './Components/PostJob/postJob'
import Jobfeed from "./Components/JobFeed/jobfeed"
import JobDetails from "./Components/individualJobFeed/JobDetails"
import EditUserFeed from "./Components/UserFeedEdit/editUserfeed"
import UserJobfeed from "./Components/UserFeed/userfeed"
import SingleUserFeed from "./Components/UserFeed/singleUserFeed"



const user = localStorage.getItem("token");

createRoot(document.getElementById("root")).render(
  <>
    <Suspense fallback={null}>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />}/>
        <Route path="/signing" element={<Sign/>}/>
        <Route path="/signup" element={<SignUp/>}/>
        <Route path="/posts" element={ <Jobpost/>}/>
        <Route path='/jobfeed' element={<Jobfeed/>}/>
        <Route path='/jobfeed/:id' element={<JobDetails/>}/>
        {user && <Route path="/user/all" exact element={<UserJobfeed/>} />}
        {user && <Route path="/user/:id" exact element={<SingleUserFeed/>} />}
        {user && <Route path="/index/:id" exact element={<EditUserFeed/>} />}
      </Routes>
    </BrowserRouter>
    </Suspense>
  </>
)
