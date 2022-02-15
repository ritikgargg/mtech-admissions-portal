import React from 'react'
import SignIn from './SignIn'

class SignInNav extends React.Component {
  constructor() {
    super();
    this.state = {
      pageType: 0,
    };
  }

  render() {
    return (
      <>
        <div class="w-full h-screen flex">
          <img src="./images/iit_ropar_login_page.jpg" alt="background" class="object-cover object-center h-screen w-7/12"></img>
          <div class="bg-white flex flex-col justify-center items-center w-5/12 shadow-lg">
            <div className="min-h-full flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 text-center">
              <div className="max-w-md w-full space-y-8">
                <div>
                  <img
                    className="mx-auto h-55 w-48"
                    src="./images/iitrpr_logo.png"
                    alt="IIT Ropar logo"
                  />
                </div>
                
                <div className="space-y-2">
                  <h2 className="mt-6 text-center text-2xl font-bold" style={{color: "#001f60"}}>Register or Sign in to your account</h2>
                  <p className="mt-0 text-center text-sm font-medium">
                    An OTP will be sent to your email ID for verification
                  </p>
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

                <SignIn/>

              </div>
            </div>
          </div>
        </div>  
      </>
    )
  }
}

export default SignInNav;


            