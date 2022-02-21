import React, { useState } from 'react'
import axios from 'axios'
import SignIn from './SignIn'
import Otp from './Otp'
import { setUserSession } from '../utils/Sessions'
import { useNavigate } from "react-router-dom"
import iit_ropar from "../images/iit-ropar.jpg";
import iit_ropar_logo from "../images/iit-ropar-logo.jpg";

export default function SignInNav () {
    const navigate = useNavigate();

    const [otpSent, setotpSent] = useState(false);
    const [email, setEmail] = useState("");
    const [otp, setOtp] = useState("");
    const [msg_otp, setMsgOtp] = useState("OTP has been sent to your mail account.");
    const [msg_signin, setMsgSignin] = useState("An OTP will be sent to your email ID for verification.")

    const emailSubmit = () => {
        axios.post('http://localhost:8080/auth/signin/otp', {email: email}).then(response => {
          if(email === "") {
            setMsgSignin("Please enter your email.")
          }
          else if(response.data === 0) {
            setMsgSignin("You do not have an account. Sign-up first!")
          }
          else {
            setotpSent(!otpSent);
          }
        });
    }

    const updateEmail = e => {
        setEmail(e.target.value);
    }

    const updateOTP = e => {
        setOtp(e.target.value);
    }

    const handleSubmit = () => {
      axios.post('http://localhost:8080/auth/signin/verify', {email: email, otp: otp}).then(response => {
          if(response.data === 1) {
            setUserSession(otp);
            navigate("/dashboard");
          }
          else if(otp === "") {
            setMsgOtp("Please enter the OTP sent to your email.")
          }
          else if(response.data === 2) {
            setMsgOtp("Your OTP has expired.")
          }
          else {
            setMsgOtp("The OTP you entered is incorrect.")
          }
      });
    };

    return (
      <> 
        <div className="w-full h-screen flex">
          <img src={iit_ropar} alt="background" className="object-cover object-center h-screen w-7/12"></img>
          <div className="bg-white flex flex-col justify-center w-5/12 shadow-lg">
            <div className="min-h-full flex justify-center py-12 px-4 sm:px-6 lg:px-8">
              <div className="max-w-md w-full">
                <div className="mt-20 mb-5 space-y-2">
                  <div className='mb-5'>
                    <img
                      className="mx-auto h-55 w-48"
                      src={iit_ropar_logo}
                      alt="IIT Ropar logo"
                    />
                  </div>
                  
                  <div>
                    <h2 className="text-center text-2xl font-bold" style={{color: "#001f60"}}>Sign in to your account</h2>
                  </div>
    
                </div>

                <div>
                  {otpSent === false && <SignIn onClick={emailSubmit} updateData={updateEmail} msg={msg_signin}/>}
                  {otpSent === true && <Otp onClick={handleSubmit} updateData={updateOTP} msg={msg_otp}/>}
                </div>

              </div>
            </div>
          </div>
        </div>  
      </>
    )
}
