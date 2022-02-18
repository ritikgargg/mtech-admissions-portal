import React, { useEffect } from 'react'
import SignIn from './SignIn'
import Otp from './Otp'
import { InformationForm } from './InformationForm';
import ReactCSSTransitionGroup from 'react-transition-group'; // ES6

class SignInNav extends React.Component {
  constructor() {
    super();
    this.state = {
      otpSent: false,
    };
  }

  onClick () {
    this.setState({
      otpSent: !this.state.otpSent,
      validated: false
    });
    // console.log(this.state.pageType);
  }
  
  render() {
    
    let theChild = undefined;
    if(!this.state.validated){
      if (this.state.otpSent) {
        theChild = <Otp/>
      } else {
        theChild = <SignIn onClick={()=>this.onClick()}/>;
      }
    }

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

                {/* NAVBAR */}
                {/* <ul class="flex justify-around">
                      <li>
                      <button class="text-center w-52 block border border-blue-500 rounded py-2 hover:bg-blue-700 text-white bg-blue-500 shadow">Sign up</button>
                      </li>
                      <li>
                      <button class="text-center w-52 block border border-white rounded hover:border-gray-200 text-blue-500 hover:bg-gray-200 py-2" href="#">Login</button>
                      </li>
                </ul> */}

                {/* {this.state.pageType%2==0&&<SignIn onClick={()=>this.onClick()}/>}
                {this.state.pageType%2!=0&&<Otp onClick={()=>this.onClick()}/>} */}

                <div>
                    {/* {this.state.otpSent?<Otp onClick={()=>this.onClick()}/>:<SignIn onClick={()=>this.onClick()}/>} */}
                    {theChild}
                </div>

              </div>
            </div>
          </div>
        </div>  
      </>
    )
  }
}

export default SignInNav;


            