import React, { useState, useRef } from "react";
import ChevronDots from "./ChevronDots.js";
import QualifyingExamDetails from "./QualifyingExamDetails";
import Declaration from "./Declaration";
import ApplicationFeeDetails from "./ApplicationFeeDetails";
import Review from './Review.js';

function ApplicantionDetails() {
  const [page, setPage] = useState(1);
  // const ref = useRef();
  const [applicant_details, setApplicantDetails] = useState(Array.from({length: 21},()=>''));

  function handleApplicantDetailsChange(e, index){
    let copy = [...applicant_details];
    copy[index] = e.target.value;
    setApplicantDetails(copy);
  }

  const handleFileSubmit = (e, maxSize, index) => {
    const file = e.target.files[0];
    // ref.current = file;
    if (file.size > maxSize*1000000){
        e.target.value = null;
        const error = "File size cannot exceed more than " + maxSize.toString() + "MB";
        alert(error);
    }
    else {
      let copy = [...applicant_details];
      copy[index] = file;
      setApplicantDetails(copy);
    }
  }

  function increasePageNumber(){
    console.log(applicant_details);
    setPage(page + 1);
  }

  function decreasePageNumber(){
    setPage(page - 1);
  }

  return (
    <div>
    <div className="grid grid-cols-12 gap-2">

    <div className="mx-12 mb-12 mt-10 px-12 col-start-1 col-end-12">
        <ChevronDots
          steps={[
            "Application Fee Details",
            "Qualifying Exam Details",
            "Declaration",
            "Review",
          ]}
          currentStep={page}
        />
      </div>

      <a href="/home" className="col-start-12 col-end-13 justify-center lg:w-12 lg:h-12 w-8 h-8 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm m-3 p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white">
          <svg className="lg:w-6 lg:h-6 w-4 h-4" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" /></svg>  
        </a>

    {/* <a href="/home" className="mt-6 col-start-12 col-end-13">
   
      <svg xmlns="http://www.w3.org/2000/svg" className="lg:w-8 lg:h-8 w-5 h-5 mx-4 mt-4 " fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
      </svg>
    </a> */}
    </div>
      

      {
        {
          1 : <ApplicationFeeDetails increasePageNumber = {increasePageNumber} details={applicant_details} onChange={handleApplicantDetailsChange} handleFileSubmit={handleFileSubmit}/>,                
          2 : <QualifyingExamDetails increasePageNumber = {increasePageNumber} details={applicant_details} decreasePageNumber={decreasePageNumber} onChange={handleApplicantDetailsChange} handleFileSubmit={handleFileSubmit}/>,          
          3 : <Declaration increasePageNumber = {increasePageNumber} details={applicant_details} decreasePageNumber={decreasePageNumber} onChange={handleApplicantDetailsChange} handleFileSubmit={handleFileSubmit}/>,
          4 : <Review decreasePageNumber={decreasePageNumber} details={applicant_details}/>,                    
        }[page]
      }
    </div>
  );
}

export default ApplicantionDetails;
