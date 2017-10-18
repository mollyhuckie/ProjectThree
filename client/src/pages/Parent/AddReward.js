import React, { Component } from "react";
import './Parent.css';
import API from "../../utils/API";
import {KidDropDown} from "../../components/KidDropDown/KidDropDown.js";
import {Reward} from "../../components/Reward/Reward.js"
import {AddForm} from "../../components/Reward/AddForm.js"
import { Link } from "react-router-dom";

class Parent extends Component {
    state = {
        selectedKidid:"",selectedKidName:"",
        rewardName:"",rewardDesc:"",points:"",
        rewards:[],
        kids:[] 
    };
    componentDidMount(){
        this.loadKids();
        this.loadRewards();
    };

    loadKids=()=>{
        API.allKids(sessionStorage.getItem("parentid")).then(res=>{
            this.setState({kids:res.data});
        });
    };

    loadRewards=()=>{
        API.allReward(sessionStorage.getItem("parentid")).then(res=>{
            console.log(res.data);
            this.setState({rewards:res.data});
            console.log(this.state.rewards);
        });
    };

    handleKidChange=(event)=>{
        this.setState({selectedKidid:event.target.id});
        this.setState({selectedKidName:event.target.value});
        API.allChildChores(event.target.id).then(res=>console.log("this.setState({chores:res})"));
        API.allReward(event.target.id).then(res=>console.log("this.setState({rewards:res})"));
      };
      
    handleChange=event=>{
        switch(event.target.id){
            case "rewardName":this.setState({rewardName:event.target.value});break;
            case "rewardDescr":this.setState({rewardDesc:event.target.value});break;
            case "points":this.setState({points:event.target.value});break;
        }
        console.log("got it")
    };
    handleSubmit=()=>{
        console.log("Submit reward");
        const reward={
            parentid:sessionStorage.getItem("parentid"),
            rewardname:this.state.rewardName,
            rewarddescription:this.state.rewardDesc,
            rewardpoints:this.state.points
        };
        console.log(reward);
        API.addReward(reward).then((res)=>{
            this.loadRewards();
            console.log("done");
        });
     };
     handleDeleteReward=event=>{
         console.log(event.target.id);
         API.deleteReward(event.target.id).then((res)=>{
             this.loadRewards();
             console.log("done");
            });
     };

    render() {
    return (
        <div>
        <div className="navbar">
        <div className="row">
        <div className="col-sm-6">
        <img className="logo" src = "/assets/logo.png" alt= "logo" />
        <span className="chore">ChoreScore</span>  
        </div>
        <div className="col-sm-6">
         <KidDropDown  kids={this.state.kids} handleKidChange={this.handleKidChange} />
       </div>
        </div>
        </div>

        <div className="text-center"> <h2> {this.state.selectedKidName} </h2></div>

        <div className="row">
        <div className="col-sm-1 calender">



        </div>
        <div className="col-sm-6 reward-form">
        <AddForm handleSubmit={this.handleSubmit} handleChange={this.handleChange} />
        </div>
        </div>

        <div className="row">
        <div className="col-sm-10 reward-list">
        {this.state.rewards.map(reward=>
            <Reward title={reward.RewardName} points={reward.RewardPoints} rewardId={reward.id} key={reward.id} handleDeleteReward={this.handleDeleteReward} />
        )}
        </div>
        <div className="col-sm-2">
            <div className="link-btn text-center">  
                <Link to="/parent" >
                <img className="backMainBtn" 
                src = "/assets/backMainBtn.png" alt="back to main button" /><br/>
                Back To Main
                </Link>
            </div>
        </div>


        </div>

        </div>
);
    }
}

export default Parent;