import React, { Component } from "react";
import './Login.css';
import {Signup, Signin} from "../../components/LoginForm";
//import Signin from "../../components/LoginForm/Signin.js";
import API from "../../utils/API";
//import { Link } from "react-router-dom";

class Login extends Component {
    state = {
          supFirstName:"", supLastName:"", supEmail:"", supUsername:"", supPassword:"",
          sinUsername:"", sinPassword:"", loginType:""
      };
      handleSignupChange=event=>{
          switch(event.target.id){
              case "parentFirstName": this.setState({supFirstName:event.target.value});break;
              case "parentLastName":this.setState({supLastName:event.target.value});break;
              case "parentEmail":this.setState({supEmail:event.target.value});break;
              case "parentUserName":this.setState({supUsername:event.target.value});break;
              case "parentPassword":this.setState({supPassword:event.target.value});break;
          }
      };

      handleSigninChange=event=>{
        switch(event.target.id){
            case "userName":this.setState({sinUsername:event.target.value});break;
            case "password":this.setState({sinPassword:event.target.value});break;
            case "whoParent":this.setState({loginType:"parent"});break;
            case "whoChild":this.setState({loginType:"child"});break;
        }
    };

      handleSignup=()=>{
          var data={
              firstname:this.state.supFirstName,
              lastname:this.state.supLastName,
              email:this.state.supEmail,
              username:this.state.supUsername,
              password:this.state.supPassword,           
          };
        API.signUp(data)
        .then(res => console.log("done"))
        .catch(err => console.log(err));
    };

    handleLogin=()=>{
        API.login(this.state.sinUsername,this.state.sinPassword,this.state.loginType)
        .then(res => {
            if(this.state.loginType==="parent") 
            {
            console.log(res.data);
            sessionStorage.setItem("parentid", res.data.id);
            console.log(sessionStorage.getItem("parentid"));
            window.location='./parent/';
            }
        if(this.state.loginType==="child")
            {
            console.log(res.data);
            sessionStorage.setItem("childid",res.data.id);
            console.log(sessionStorage.getItem("childid"));
            window.location='./child/';
            }
        
        })
        .catch(err => console.log(err));
    };

    render() {
    return (
        <div>

        <div className="navbar">
        <img className="logo" src = "assets/logo.png" alt= "logo" />
        <span className="chore">ChoreScore</span>                       
        </div>


    <div className="login-wraper">
        <div className="row">
            <div className="col-lg-8">
                <div className="welcome">
                Welcome to Chore where chores are easier than ever before! 
        Kids love it because of the visible reward system. 
        Parents love it because chores are so easily tracked. 
        Points are rewarded for every chore, variying with the difficulty of the chore. 
        Points are added up for the child to useto buy rewards. 
        Parents relax knowing Chore is taking another item off thier busy plate &amp; washing it too!
                </div>
            </div>
            <div className="col-lg-4 form-panel">
              <Signup  handleChange={this.handleSignupChange} handleSubmit={this.handleSignup} />
              <br/><br/>
              <Signin handleChange={this.handleSigninChange} handleSubmit={this.handleLogin} />
            </div>
        </div>
    </div>
    </div>
);
    }
}

export default Login;
