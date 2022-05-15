import React, { useState } from "react";
import axios from "axios";
import SignIn from "./SignIn";
import Otp from "./Otp";
import { setUserSession } from "./Sessions";
import { setAdminType } from "../Admin/AdminTypes";
import { useNavigate, Link } from "react-router-dom";

function SignInStartPage() {
  const navigate = useNavigate();

  const [otpSent, setotpSent] = useState(false);
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [msg_otp, setMsgOtp] = useState(
    "OTP has been sent to your mail account. Please check your spam folder also."
  );
  const [msg_signin, setMsgSignin] = useState(
    "An OTP will be sent to your email ID for verification."
  );
  const [colorEmail, setColorEmail] = useState(0);
  const [colorOTP, setColorOTP] = useState(0);
  const [isLoadingEmail, setIsLoadingEmail] = useState(false);
  const [isLoadingOTP, setIsLoadingOTP] = useState(false);

  const emailSubmit = () => {
    setIsLoadingEmail(true);
    axios.post("/auth/signin/otp", { email: email }).then((response) => {
      if (response.data === 0) {
        setMsgSignin("Please enter your email.");
        setColorEmail(1);
        setIsLoadingEmail(false);
      } else if (response.data === 1) {
        setMsgSignin("You do not have an account. Sign-up first!");
        setColorEmail(1);
        setIsLoadingEmail(false);
      } else {
        setotpSent(!otpSent);
        setColorOTP(2);
      }
    });
  };

  const updateEmail = (e) => {
    setEmail(e.target.value);
  };

  const updateOTP = (e) => {
    setOtp(e.target.value);
  };

  const resendOTP = () => {
    axios.post("/auth/signin/otp", { email: email });
    setMsgOtp("OTP has been resent to your mail account.");
    setColorOTP(2);
  };

  const handleSubmit = () => {
    setIsLoadingOTP(true);
    axios
      .post("/auth/signin/verify", {
        email: email,
        otp: otp,
      })
      .then((response) => {
        if (response.data.result === 1) {
          setUserSession(response.data.token);
          navigate("/home");
        } else if (
          response.data.result === 4 ||
          response.data.result === 5 ||
          response.data.result === 6
        ) {
          setUserSession(response.data.token);
          setAdminType(response.data.admin_type);
          navigate("/admin/dashboard");
        } else if (response.data.result === 2) {
          setMsgOtp("This OTP has expired.");
          setColorOTP(1);
          setIsLoadingOTP(false);
        } else if (response.data.result === 3) {
          setMsgOtp("Please enter the OTP sent to your email.");
          setColorOTP(1);
          setIsLoadingOTP(false);
        } else {
          setMsgOtp("The OTP you entered is incorrect.");
          setColorOTP(1);
          setIsLoadingOTP(false);
        }
      });
  };

  return (
    <div className="pt-28 sm:pt-2 bg-gray-100">
      <div className="relative min-h-screen flex flex-col sm:justify-center items-center w-4/5 mx-auto sm:w-3/5 md:w-3/5">
        <div className="relative sm:max-w-md w-full">
          <div className="flex absolute justify-center items-center content-center bg-gradient-to-br from-[#6F8BD6] to-[#1E3A8A]   shadow-md hover:shadow-lg h-48 w-48 -left-24 -top-24 rounded-full fill-current text-white">
            <span className="relative -top-4 -left-4 font-josefin-sans text-2xl font-extrabold ">
              Sign In
            </span>
          </div>
          <div className="card bg-[#1E3A8A] shadow-lg  w-full h-full rounded-3xl absolute  transform -rotate-6" />
          <div className="card bg-[#6F8BD6] shadow-lg  w-full h-full rounded-3xl absolute  transform rotate-6" />
          <div className="p-16 relative w-full rounded-3xl bg-white shadow-md">
            <label className="block mt-3 text-2xl text-gray-700 text-center font-semibold">
              Welcome to IIT Ropar
            </label>

            <p className="text-center mt-2 text-sm text-gray-500">
              Please sign-in to submit your applications for admission.
            </p>

            <div className="mt-5">
              <div>
                {otpSent === false && (
                  <SignIn
                    onClick={emailSubmit}
                    updateData={updateEmail}
                    msg={msg_signin}
                    colorChange={colorEmail}
                    isLoading={isLoadingEmail}
                  />
                )}
                {otpSent === true && (
                  <Otp
                    onClick={handleSubmit}
                    updateData={updateOTP}
                    msg={msg_otp}
                    resendOTP={resendOTP}
                    colorChange={colorOTP}
                    isLoading={isLoadingOTP}
                  />
                )}
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
