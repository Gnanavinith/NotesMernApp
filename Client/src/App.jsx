import Home from "./pages/Home";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp"
import {ToastContainer} from "react-toastify"
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";


function App() {
 

  return (
    <>
      <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/register" element={<SignUp/>} />
        <Route path="/login" element={<Login/>} />
       
      </Routes>
      <ToastContainer/>
      </BrowserRouter>


    </>
  )
}

export default App
