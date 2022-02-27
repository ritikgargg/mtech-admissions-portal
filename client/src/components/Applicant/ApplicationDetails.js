import React, { useState } from "react";
import ChevronDots from "./ChevronDots.js";
import QualifyingExamDetails from "./QualifyingExamDetails";
import Declaration from "./Declaration";
import ApplicationFeeDetails from "./ApplicationFeeDetails";
import Review from './Review.js';



function ApplicantionDetails() {
  const [page, setPage] = useState(1);

  function increasePageNumber(){
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

    <a href="/home" className="mt-6 col-start-12 col-end-13">
    {/* <img
        src="https://cdn-icons-png.flaticon.com/512/864/864393.png"
        className="lg:w-8 lg:h-8 w-5 h-5 mx-4 mt-4 "
    
    /> */}
      <svg xmlns="http://www.w3.org/2000/svg" className="lg:w-8 lg:h-8 w-5 h-5 mx-4 mt-4 " fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
      </svg>
    </a>
    </div>
      

      {
        {
          1 : <ApplicationFeeDetails increasePageNumber = {increasePageNumber} />,                
          2 : <QualifyingExamDetails increasePageNumber = {increasePageNumber} decreasePageNumber={decreasePageNumber}/>,          
          3 : <Declaration increasePageNumber = {increasePageNumber} decreasePageNumber={decreasePageNumber}/>,
          4 : <Review decreasePageNumber={decreasePageNumber}/>,                    
        }[page]
      }
    </div>
  );
}

export default ApplicantionDetails;
