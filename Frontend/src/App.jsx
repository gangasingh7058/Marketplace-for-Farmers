import { BrowserRouter, Routes ,Route} from "react-router-dom"
import SignIn_Page from "./Pages/signin"
import SignUp_Page from "./Pages/signup"
import NavBar from "./Components/navbar"
import { RecoilRoot } from "recoil"
import HomePage from "./Pages/homepage"
import PricePage from "./Pages/Pricepage"
import User_Signin from "./Pages/USerSignin"
import User_SignUp_Page from "./Pages/UserSignup"
import User_Home from "./Pages/UserHome"
import TransportationPage from "./Pages/Transportation/Transportation"
import FarmerorBuyer from "./Pages/Farmer_or_Buyers_Page"
import User_NavBar from "./Components/user_navbar"
import { useRecoilValue } from "recoil"
import {farmeroruseratom} from "./atoms/navbartochoose"
import { useState } from "react"
import PredictCrop_Page from "./Pages/PredictCrop_Page"
import TimeLine_Page from "./Pages/TimelinePage"
import CropGuidance_PAge from "./Pages/cropguidance"


function App() {

  const [who,setwho]=useState("farmer");
  

  return (
    <>
      <BrowserRouter>
      <RecoilRoot>
      {who === "farmer" ? (
          <NavBar />
        ) : who === "user" ? (
          <User_NavBar />
        ) : null}
          <Routes>
            <Route path="/" element={<FarmerorBuyer setwho={setwho} />} />
            <Route path="/farmer" element={<SignIn_Page />} />
            <Route path="/farmer/signup" element={<SignUp_Page />} />
            <Route path="/farmer/homepage" element={<HomePage />} />
            <Route path="/farmer/MandiPrice" element={<PricePage />} />
            <Route path="/user/" element={<User_Signin />} />
            <Route path='/user/signup' element={<User_SignUp_Page />} />
            <Route path='/user/userhome' element={<User_Home />} />
            <Route path='/transportation' element={<TransportationPage />} />
            <Route path="/predictcrop" element={<PredictCrop_Page />} />
            <Route path="/croptimeline" element={<TimeLine_Page />} />
            <Route path="/cropguidance" element={<CropGuidance_PAge />} />
          </Routes>
        </RecoilRoot>
      </BrowserRouter>
      
    </>
  )
}

export default App
