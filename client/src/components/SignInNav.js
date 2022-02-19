import React from 'react'
import axios from 'axios'
import SignIn from './SignIn'
import Otp from './Otp'
import { setUserSession } from '../utils/sessions'

class SignInNav extends React.Component {
  constructor() {
    super();
    this.state = {
      otpSent: false,
      email: "",
      otp: "",
      trueOTP: ""
    };
  }

  emailSubmit () {
    this.setState({
      otpSent: !this.state.otpSent
    });

    axios.post('http://localhost:8080/signin', {email: this.state.email}).then(response => {
      setUserSession(response.data);
      this.setState({
        trueOTP: response.data
      });
    });
  }

  updateData = (target, value) => {
    this.setState({ [target]: value });
  };

  handleSubmit () {
    if(this.state.trueOTP === this.state.otp) {
      this.props.history.push("/dashboard");
    }
    else {
      console.log(this.props);
      alert("Wrong otp");
    }
  };
  
  render() {
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

                <div>
                  {this.state.otpSent === false && <SignIn onClick={()=>this.emailSubmit()} updateData={this.updateData}/>}
                  {this.state.otpSent === true && <Otp onClick={()=>this.handleSubmit()} updateData={this.updateData}/>}
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