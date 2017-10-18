
import React from "react";

export const  Reward=props=>
<div className="panel panel-default reward-item">
  <div className="panel-body">
    <div className="row">
      <div className="col-sm-6">
        <span className="glyphicon glyphicon-star"></span> 
        {props.title}
      </div>
      <div className="col-sm-3">
        <span className="label label-default"> {props.points} </span>
     </div>
     <div className="col-sm-3">
       <button onClick={props.handleDeleteReward} id={props.rewardId} className="dReward">
       <span  className="glyphicon glyphicon-remove" id={props.rewardId} ></span>
       </button> 
     </div>  
    </div>
  </div>
</div>;



