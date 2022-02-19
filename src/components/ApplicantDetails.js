import React, { useState } from "react";
import ChevronDots from "./ChevronDots.js";
import PersonalInfo from "./PersonalInfo";
import CommunicationDetails from "./CommunicatonDetails.js";
import EducationalDetails from "./EducationalDetails.js";
import Review from './Review.js';
import SignUp from './SignUp.js';


function ApplicantDetails() {
  const [page, setPage] = useState(1);

  function increasePageNumber(){
    setPage(page + 1);
  }

  function decreasePageNumber(){
    setPage(page - 1);
  }

  return (
    <div>
      <div className="mx-12 my-12 px-12">
        <ChevronDots
          steps={[
            "Personal Details",
            "Communication Details",
            "Educational Details",
            "Review",
            "SignUp"
          ]}
          currentStep={page}
        />
      </div>
      <div className="h-1"></div>

      {
        {
          1 : <PersonalInfo increasePageNumber = {increasePageNumber} />,                
          2 : <CommunicationDetails increasePageNumber = {increasePageNumber} decreasePageNumber={decreasePageNumber}/>,          
          3 : <EducationalDetails increasePageNumber = {increasePageNumber} decreasePageNumber={decreasePageNumber}/>,
          4 : <Review increasePageNumber = {increasePageNumber} decreasePageNumber={decreasePageNumber}/>,
          5 : <SignUp decreasePageNumber={decreasePageNumber}/>
                    
        }[page]
      }
      
    </div>
  );
}

export default ApplicantDetails;
