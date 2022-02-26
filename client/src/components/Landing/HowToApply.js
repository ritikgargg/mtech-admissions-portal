import React from "react";
import step1 from "../../images/step1.png";
import step2 from "../../images/step2.png";
import step3 from "../../images/step3.png";
import step4 from "../../images/step4.png";
import step5 from "../../images/step5.png";
import step6 from "../../images/step6.png";
import step7 from "../../images/step7.png";
import step8 from "../../images/step8.png";


function HowToApply() {
  return (
    <div>
    <div className="flex flex-col justify-center m-auto">
      <div className="flex md:flex-row flex-col bg-[#1E3A8A] justify-center md:text-left text-center">
        <div className="flex flex-col justify-center items-center relative">
          <div className="w-56 h-12 md:flex hidden justify-center">
            <div className="h-full  border-white border-dashed" />
          </div>
          <div className="rounded-full w-12 h-12 text-xl text-[#1E3A8A] bg-white font-black flex justify-center items-center absolute top-0 right-0 mt-16 shadow-lg mr-2">
            1
          </div>
          <div className="w-56 h-56 rounded-full bg-white shadow my-5 object-scale-down flex justify-center">
          <img
            alt="step1"
            className="w-28 h-28 mt-10 ml-3"
            src={step1}
          />
          </div>  
          
          <div className="w-56 h-12 md:flex hidden justify-center">
            <div className="h-full border-r-4 border-white border-dashed" />
          </div>
        </div>
        <div className="ml-5 p-10 flex flex-col justify-center max-w-2xl rounded bg-[#1E3A8A]">
          <div className="md:text-3xl text-xl font-bold text-white">
          Sign Up 
          </div>
          <div className="mt-4 text-[#F5F5F5]">
          Create your account by visiting the sign-up page. Enter a valid email address and click on <span className="font-bold">Get OTP</span>. An OTP will be sent to your email address for verification. On successful validation, you will be redirected to the dashboard for your account.

          </div>
        </div>
      </div>

      <div className="flex md:flex-row flex-col bg-[#6F8BD6] justify-center md:text-left text-center">
        <div className="flex flex-col justify-center items-center relative">
          <div className="w-56 h-12 md:flex hidden justify-center">
            <div className="h-full  border-[#F5F5F5] border-dashed" />
          </div>
          <div className="rounded-full w-12 h-12 text-xl text-[#6F8BD6] bg-white font-black flex justify-center items-center absolute top-0 right-0 mt-16 shadow-lg mr-2">
            2
          </div>
          <div className="w-56 h-56 rounded-full bg-white shadow my-5 object-scale-down flex justify-center">
          <img
            alt="step2"
            className="w-28 h-28 mt-10 ml-3"
            src={step2}
          />
          </div>  
          <div className="w-56 h-12 md:flex hidden justify-center">
            <div className="h-full border-r-4 border-[#F5F5F5] border-dashed" />
          </div>
        </div>
        <div className="ml-5 p-10 flex flex-col justify-center max-w-2xl rounded bg-[#6F8BD6]">
          <div className="md:text-3xl text-xl font-bold text-white">
          Sign In
          </div>
          <div className="mt-4 text-[#F5F5F5]">
          If you have already created an account, then you can sign-in to your account.  Enter a valid email address and click on <span className="font-bold">Get OTP</span>. An OTP will be sent to your email address for verification. On successful validation, you will be redirected to the dashboard for your account.
          </div>
        </div>
      </div>

      <div className="flex md:flex-row flex-col bg-[#D3DCF2] justify-center md:text-left text-center">
        <div className="flex flex-col justify-center items-center relative">
          <div className="w-56 h-12 md:flex hidden justify-center">
            <div className="h-full  border-[#1E3A8A] border-dashed" />
          </div>
          <div className="rounded-full w-12 h-12 text-xl text-white bg-[#1E3A8A] font-black flex justify-center items-center absolute top-0 right-0 mt-16 shadow-lg mr-2">
            3
          </div>
          <div className="w-56 h-56 rounded-full bg-white shadow my-5 object-scale-down flex justify-center">
          <img
            alt="step3"
            className="w-28 h-28 mt-12 ml-4"
            src={step3}
          />
          </div> 
          <div className="w-56 h-12 md:flex hidden justify-center">
            <div className="h-full border-r-4 border-[#1E3A8A] border-dashed" />
          </div>
        </div>
        <div className="ml-5 p-10 flex flex-col justify-center max-w-2xl rounded bg-[#D3DCF2]">
          <div className="md:text-3xl text-xl font-bold text-[#4a61a1]">
          Complete Your Profile
          </div>
          <div className="mt-4 text-[#4a61a1]">
          Once you have successfully reached the dashboard. Go to the <span className="font-bold">Profile</span> Page and complete all sections of the profile. You will be allowed to submit an application, only after completing your profile. 

          </div>
        </div>
      </div>

      <div className="flex md:flex-row flex-col bg-[#1E3A8A] justify-center md:text-left text-center">
        <div className="flex flex-col justify-center items-center relative">
          <div className="w-56 h-12 md:flex hidden justify-center">
            <div className="h-full  border-white border-dashed" />
          </div>
          <div className="rounded-full w-12 h-12 text-xl text-[#1E3A8A] bg-white font-black flex justify-center items-center absolute top-0 right-0 mt-16 shadow-lg mr-2">
            4
          </div>
          <div className="w-56 h-56 rounded-full bg-white shadow my-5 object-scale-down flex justify-center">
          <img
            alt="step4"
            className="w-32 h-32 mt-12"
            src={step4}
          />
          </div> 
          <div className="w-56 h-12 md:flex hidden justify-center">
            <div className="h-full border-r-4 border-white border-dashed" />
          </div>
        </div>
        <div className="ml-5 p-10 flex flex-col justify-center max-w-2xl rounded bg-[#1E3A8A]">
          <div className="md:text-3xl text-xl font-bold text-white">
          Find Your Desired Opening
          </div>
          <div className="mt-4 text-[#F5F5F5]">
          In the <span className="font-bold">Dashboard</span>, you can find all the openings which are opened for offering in the current admission cycle. Find the application in which you are interested in from the list of applications.

          </div>
        </div>
      </div>

      <div className="flex md:flex-row flex-col bg-[#6F8BD6] justify-center md:text-left text-center">
        <div className="flex flex-col justify-center items-center relative">
          <div className="w-56 h-12 md:flex hidden justify-center">
            <div className="h-full  border-[#F5F5F5] border-dashed" />
          </div>
          <div className="rounded-full w-12 h-12 text-xl text-[#6F8BD6] bg-white font-black flex justify-center items-center absolute top-0 right-0 mt-16 shadow-lg mr-2">
            5
          </div>
          <div className="w-56 h-56 rounded-full bg-white shadow my-5 object-scale-down flex justify-center">
          <img
            alt="step5"
            className="w-28 h-28 mt-14"
            src={step5}
          />
          </div> 
          <div className="w-56 h-12 md:flex hidden justify-center">
            <div className="h-full border-r-4 border-[#F5F5F5] border-dashed" />
          </div>
        </div>
        <div className="ml-5 p-10 flex flex-col justify-center max-w-2xl rounded bg-[#6F8BD6]">
          <div className="md:text-3xl text-xl font-bold text-white">
          Application Fee Details
          </div>
          <div className="mt-4 text-[#F5F5F5]">
            Please find below the details regarding the fees for different categories and the mode of payment: 
            <br/>₹ 500 for GEN/OBC/EWS
            <br/>₹ 250 For SC/ST/PWD
            <br/>Mode of Fee Payment : <span className="font-bold">SBI Collect</span>
          </div>
        </div>
      </div>

      <div className="flex md:flex-row flex-col bg-[#D3DCF2] justify-center md:text-left text-center">
        <div className="flex flex-col justify-center items-center relative">
          <div className="w-56 h-12 md:flex hidden justify-center">
            <div className="h-full  border-[#1E3A8A] border-dashed" />
          </div>
          <div className="rounded-full w-12 h-12 text-xl text-white bg-[#1E3A8A] font-black flex justify-center items-center absolute top-0 right-0 mt-16 shadow-lg mr-2">
            6
          </div>
          <div className="w-56 h-56 rounded-full bg-white shadow my-5 object-scale-down flex justify-center">
          <img
            alt="step6"
            className="w-28 h-28 mt-14"
            src={step6}
          />
          </div> 
         
          <div className="w-56 h-12 md:flex hidden justify-center">
            <div className="h-full border-r-4 border-[#1E3A8A] border-dashed" />
          </div>
        </div>
        <div className="ml-5 p-10 flex flex-col justify-center max-w-2xl rounded bg-[#D3DCF2]">
          <div className="md:text-3xl text-xl font-bold text-[#4a61a1]">
            Submit the Fee
          </div>
          <div className="mt-4 text-[#4a61a1]">
          Before filling the application details, please follow the given steps to submit the fees for the application:
          <br/>1. Go to <a href="https://www.onlinesbi.com/" className="font-bold"> https://www.onlinesbi.com/</a>.
          <br/>2. Select SB collect.
          <br/>3. Tick the terms and conditions and continue.
          <br/>4. Select state - Punjab.
          <br/>5. Select educational institute - <span className="font-bold">IIT Ropar</span>.
          <br/>6. Select the option for payment category.
          <br/>7. Pay the requisite fee.

          </div>
        </div>
      </div>

      <div className="flex md:flex-row flex-col bg-[#1E3A8A] justify-center md:text-left text-center">
        <div className="flex flex-col justify-center items-center relative">
          <div className="w-56 h-12 md:flex hidden justify-center">
            <div className="h-full  border-white border-dashed" />
          </div>
          <div className="rounded-full w-12 h-12 text-xl text-[#1E3A8A] bg-white font-black flex justify-center items-center absolute top-0 right-0 mt-16 shadow-lg mr-2">
            7
          </div>
          <div className="w-56 h-56 rounded-full bg-white shadow my-5 object-scale-down flex justify-center">
          <img
            alt="step7"
            className="w-28 h-28 mt-14 ml-4"
            src={step7}
          />
          </div> 
          <div className="w-56 h-12 md:flex hidden justify-center">
            <div className="h-full border-r-4 border-white border-dashed" />
          </div>
        </div>
        <div className="ml-5 p-10 flex flex-col justify-center max-w-2xl rounded bg-[#1E3A8A]">
          <div className="md:text-3xl text-xl font-bold text-white">
            Submit the Application
          </div>
          <div className="mt-4 text-[#F5F5F5]">
          Once you have paid the requisite fee for the application, click on apply. Fill the details in the form. After filling the form you will be shown a review of all the details you have filled. Check all the details before submitting. 
          <br/><span className="font-bold">You will not be able to make any changes once you submit the form. </span>

          </div>
        </div>
      </div>

      <div className="flex md:flex-row flex-col bg-[#6F8BD6] justify-center md:text-left text-center">
        <div className="flex flex-col justify-center items-center relative">
          <div className="w-56 h-12 md:flex hidden justify-center">
            <div className="h-full  border-[#F5F5F5] border-dashed" />
          </div>
          <div className="rounded-full w-12 h-12 text-xl text-[#6F8BD6] bg-white font-black flex justify-center items-center absolute top-0 right-0 mt-16 shadow-lg mr-2">
            8
          </div>
          <div className="w-56 h-56 rounded-full bg-white shadow my-5 object-scale-down flex justify-center">
          <img
            alt="step8"
            className="w-28 h-28 mt-14 ml-4"
            src={step8}
          />
          </div> 
          <div className="w-56 h-12 md:flex hidden justify-center">
            <div className="h-full border-r-4 border-[#F5F5F5] border-dashed" />
          </div>
        </div>
        <div className="ml-5 p-10 flex flex-col justify-center max-w-2xl rounded bg-[#6F8BD6]">
          <div className="md:text-3xl text-xl font-bold text-white">
          View the status of your application
          </div>
          <div className="mt-4 text-[#F5F5F5]">
            If you have successfully applied for an opening, those applications will appear in the <span className="font-bold">My Applications</span> tab. You can check the current status of your application there.
          </div>
        </div>
      </div>

      {/* <div className="flex md:flex-row flex-col bg-[#D3DCF2] justify-center md:text-left text-center">
        <div className="flex flex-col justify-center items-center relative">
          <div className="w-56 h-12 md:flex hidden justify-center">
            <div className="h-full  border-[#1E3A8A] border-dashed" />
          </div>
          <div className="rounded-full w-12 h-12 text-xl text-[#D3DCF2] bg-[#4a61a1] font-black flex justify-center items-center absolute top-0 right-0 mt-16 shadow-lg mr-2">
            9
          </div>
          <img
            alt="step1"
            className="w-56 h-56 rounded-full shadow my-5 object-scale-down"
            src="https://image.flaticon.com/icons/svg/1330/1330216.svg"
          />
          <div className="w-56 h-12 md:flex hidden justify-center">
            <div className="h-full border-r-4 border-[#1E3A8A] border-dashed" />
          </div>
        </div>
        <div className="ml-5 p-10 flex flex-col justify-center max-w-2xl rounded bg-[#D3DCF2]">
          <div className="md:text-3xl text-xl font-bold text-[#4a61a1]">
            Find your best idea
          </div>
          <div className="mt-4 text-[#4a61a1]">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Aperiam
            facilis, voluptates error alias dolorem praesentium sit soluta iure
            incidunt labore explicabo eaque, quia architecto veritatis dolores,
            enim consequatur nihil ipsum.
          </div>
        </div>
      </div> */}


    </div>
    </div>
  );
}

export default HowToApply;