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



createRoot(document.getElementById("root")).render(
  <>
    <Suspense fallback={null}>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />}/>
        <Route path="/signing" element={<Sign/>}/>
        <Route path="/signup" element={<SignUp/>}/>
      </Routes>
    </BrowserRouter>
    </Suspense>
  </>
)
