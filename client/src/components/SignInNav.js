import React, { useState } from 'react'
import axios from 'axios'
import SignIn from './SignIn'
import Otp from './Otp'
import { setUserSession } from '../utils/Sessions'
import { useNavigate } from "react-router-dom";

export default function SignInNav () {
    const navigate = useNavigate();

    const [otpSent, setotpSent] = useState(false);
    const [email, setEmail] = useState("");
    const [otp, setOtp] = useState("");
    const [trueOtp, setTrueOtp] = useState("");
    const [msg, setMsg] = useState("OTP has been sent to your mail account.");

    const emailSubmit = () => {
        setotpSent(!otpSent);

        axios.post('http://localhost:8080/signin', {email: email}).then(response => {
            setTrueOtp(response.data)
        });
    }

    const updateEmail = e => {
        setEmail(e.target.value);
    }

    const updateOTP = e => {
        setOtp(e.target.value);
    }

    const handleSubmit = () => {
        if(trueOtp === otp) {
            setUserSession(trueOtp);
            navigate("/dashboard");
        }
        else {
            setMsg("The OTP you entered is incorrect.")
        }
    };

    return (
      <> 
        <div className="w-full h-screen flex">
          <img src="./images/iit_ropar_login_page.jpg" alt="background" className="object-cover object-center h-screen w-7/12"></img>
          <div className="bg-white flex flex-col justify-center w-5/12 shadow-lg">
            <div className="min-h-full flex justify-center py-12 px-4 sm:px-6 lg:px-8">
              <div className="max-w-md w-full">
                <div className="mt-20 mb-5 space-y-2">
                  <div className='mb-5'>
                    <img
                      className="mx-auto h-55 w-48"
                      src="./images/iitrpr_logo.png"
                      alt="IIT Ropar logo"
                    />
                  </div>
                  
                  <div>
                    <h2 className="text-center text-2xl font-bold" style={{color: "#001f60"}}>Register or Sign in to your account</h2>
                  </div>
    
                </div>

                <div>
                  {otpSent === false && <SignIn onClick={emailSubmit} updateData={updateEmail}/>}
                  {otpSent === true && <Otp onClick={handleSubmit} updateData={updateOTP} msg={msg}/>}
                </div>

              </div>
            </div>
          </div>
        </div>  
      </>
    )
}
