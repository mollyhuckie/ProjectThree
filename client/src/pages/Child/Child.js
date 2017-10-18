import React, { Component } from "react";
import './Child.css';
import API from "../../utils/API";
// import {KidDropDown} from "../../components/KidDropDown/KidDropDown.js";
import {Chore} from "../../components/Chore/Chore.js"
import {Reward} from "../../components/Reward/Reward.js"
import {Link} from "react-router-dom";
import Calendar from 'react-calendar';
import {Circle} from "../../components/Circle/Circle.js"


class Child extends Component {
    state = {
         date: new Date(),
         child:{},
         totalPoint:"750",
        chores:[{taskName:"Do the dishes",RedeemStatus:"undone"},{taskName:"Take out the trash",RedeemStatus:"done"}],
        rewards:[{RewardName:"soccer ball",RewardPoints:"500"},{RewardName:"iphone",RewardPoints:"1000"}],
    };

    

    componentDidMount(){
        this.setChild();
        this.loadChores(new Date());
        
        API.allReward(sessionStorage.getItem("parentid")).then(res=>{
            console.log(res.data);
            this.setState({rewards:res.data});
            // console.log("this.setState({this.state.rewards:res});")
        });
    };
    onChange = date =>{
        this.setState({date: date });
        this.loadChores(date);
    } 

    setChild=()=>{
            console.log(sessionStorage.getItem("childid"));
            API.getChild(sessionStorage.getItem("childid")).then(res=>{
                console.log(res.data);
                this.setState({child:res.data});
            });
    };
    
    loadChores=(date)=>{
        const year = date.getFullYear();
        const month =date.getMonth()+1;
        const day = date.getDate();
        const dateString = `${year}-${month}-${day}`; 
        console.log(dateString);
        // console.log(sessionStorage.getItem("selectedChildId"));
        API.getChildChores(sessionStorage.getItem("childid"),dateString).then(res=>{
            console.log(res);
            this.setState({chores:res.data});
        });
    }
        
    
    handleChoreStatus=(event)=>{
        console.log(event.target.id);
        const year = this.state.date.getFullYear();
        const month =this.state.date.getMonth()+1;
        const day = this.state.date.getDate();
        const dateString = `${year}-${month}-${day}`; 
        API.markTask(event.target.id,"pending",dateString).then(res=>{
            console.log(res);
            console.log("done");
            this.loadChores(this.state.date)
        });
    };
    logout=()=>{
        sessionStorage.clear();
        console.log("AFTER clear() session id -parent " +sessionStorage.getItem("parentid"));
        window.location='/';
     };

    render() {
    return (
        <div>
            <div className="navbar">
            <div className="row">
            <div className="col-sm-5">
            <img className="logo" src = "/assets/logo.png" alt= "logo" />
            <span className="chore">ChoreScore</span>  
            </div>
            <div className="col-sm-2">
                <h2 className="childNameHead">{this.state.child.ChildName}</h2>
            </div>
            <div className="col-sm-1 pull-right ">
                    <button onClick={this.logout} className="logout">
                    Log Out
                    </button> 
                </div>
            </div>
            </div>
            <div className="row">
            <div className="col-sm-12">
            </div>
            </div>
            <div className="row">
            <div className="col-sm-6">
            
                      <div className="calendar">
               <div className="calbox">
                  <h2> {this.state.date.toString().substr(0,16)}</h2>
                   <Calendar  onChange={this.onChange}/>
               </div>
            </div> 

                  <div className="reward-list">
               {this.state.rewards.map(reward=>
                <Reward key={reward.id} role="child" title={reward.RewardName} points={reward.RewardPoints} />
                )}
                <div className="link-btn text-center"> 
                 
                 Request Rewards
                 <img src = "/assets/addChoresBtn.png" alt="add chores button" />
                
               </div>
                </div>
                </div>
                <div className="col-sm-6 kid-chores">
                    {this.state.chores.map(chore=>
                    <Chore key={chore.id} roleClick="confirm" handleStatus={this.handleChoreStatus} who="child" choreid={chore.id}  title={chore.TaskName} points={chore.TaskPoints} status={chore.TaskStatus} />
                    )}  
                </div> 
               </div> 

               {/*=========Circle Test Demo ================*/}
               <h3>Points Earned {this.state.child.ChildPointsEarned}</h3>
               <div className="row">
                   <div className="col-sm-12 circle-progress-bar">
                   
                       {this.state.rewards.map(reward=>
                       <Circle key={reward.id} totalPoint={this.state.child.ChildPointsEarned} rewardPoint={reward.RewardPoints} rewardName={reward.RewardName}  />
                    )}
                     
                   </div> 
               </div>
               {/*=========End Of Circle Test Demo ================*/}
        </div>
      
        )};
 }

export default Child;