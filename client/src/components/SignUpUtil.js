import React, { useState } from "react";
import SignUp from "./SignUp.js";
import SignUpOtp from "./SignUpOtp.js";


function SignUpUtil() {
  const [flag, setFlag] = useState(1);

  function increaseFlag(){
    setFlag(flag + 1);
  }

  function decreaseFlag(){
    setFlag(flag - 1);
  }

  return (
    <div>
      {
        {
          1 : <SignUp increaseFlag = {increaseFlag} />,                
          2 : <SignUpOtp decreaseFlag={decreaseFlag}/>                      
        }[flag]
      }
      
    </div>
  );
}

export default SignUpUtil;
