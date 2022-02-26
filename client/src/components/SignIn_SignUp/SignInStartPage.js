import React, { useState } from 'react'
import axios from 'axios'
import SignIn from './SignIn'
import Otp from './Otp'
import { setUserSession } from './Sessions'
import { useNavigate, Link } from "react-router-dom"

function SignInStartPage() {
    const navigate = useNavigate();

    const [otpSent, setotpSent] = useState(false);
    const [email, setEmail] = useState("");
    const [otp, setOtp] = useState("");
    const [msg_otp, setMsgOtp] = useState("OTP has been sent to your mail account.");
    const [msg_signin, setMsgSignin] = useState("An OTP will be sent to your email ID for verification.")

    const emailSubmit = () => {
        axios.post('http://localhost:8080/auth/signin/otp', {email: email}).then(response => {
          if(response.data === 0) {
            setMsgSignin("Please enter your email.")
          }
          else if(response.data === 1) {
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

    const resendOTP = () => {
        axios.post('http://localhost:8080/auth/signin/otp', {email: email});
        setMsgOtp("OTP has been resent to your mail account.");
    }

    const handleSubmit = () => {
      axios.post('http://localhost:8080/auth/signin/verify', {email: email, otp: otp}).then(response => {
          if(response.data === 1) {
            setUserSession(otp);
            navigate("/home");
          }
          else if(response.data === 2) {
            setMsgOtp("This OTP has expired.")
          }
          else if(response.data === 3) {
            setMsgOtp("Please enter the OTP sent to your email.")
          }
          else {
            setMsgOtp("The OTP you entered is incorrect.")
          }
      });
    };

  return (
    <div>
      <div className="relative min-h-screen flex flex-col sm:justify-center items-center bg-gray-100 ">
        <div className="relative sm:max-w-md w-full">
        <div className="flex absolute justify-center items-center content-center bg-gradient-to-br from-[#6F8BD6] to-[#1E3A8A]   shadow-md hover:shadow-lg h-48 w-48 -left-24 -top-24 rounded-full fill-current text-white">
        <span className='relative -top-4 -left-4 font-josefin-sans text-2xl font-extrabold '>Sign In</span>
        </div>
          <div className="card bg-[#1E3A8A] shadow-lg  w-full h-full rounded-3xl absolute  transform -rotate-6" />
          <div className="card bg-[#6F8BD6] shadow-lg  w-full h-full rounded-3xl absolute  transform rotate-6" />
          <div className="p-16 relative w-full rounded-3xl bg-white shadow-md">
            <label
              htmlFor
              className="block mt-3 text-2xl text-gray-700 text-center font-semibold"
            >
              Welcome to IIT Ropar 
            </label>

            <p className="text-center mt-2 text-sm text-gray-500">
              Please sign-in to submit your applications for admission.
            </p>

            <div className="mt-5">
              <div>
                  {otpSent === false && <SignIn onClick={emailSubmit} updateData={updateEmail} msg={msg_signin}/>}
                  {otpSent === true && <Otp onClick={handleSubmit} updateData={updateOTP} msg={msg_otp} resendOTP={resendOTP}/>}
              </div>

              <div className="flex mt-7 items-center text-center">
                <hr className="border-gray-300 border-1 w-full rounded-md" />
              </div>
              <div className="mt-7">
                <div className="flex justify-center items-center">
                  <label className="mr-2">Do not have an account? </label>
                  <Link
                    to="/sign-up"
                    className=" text-blue-500 transition duration-500 ease-in-out  transform hover:-translate-x hover:scale-105"
                  >
                    Sign-up
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SignInStartPage;
