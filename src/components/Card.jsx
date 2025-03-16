import React from "react";
import { useState } from "react";
import MQTTClient from './MQTTClient';

function Card({id,title,body}){

    // console.log(id);
    const [thingsArray,setThingsArray]=useState(["Thigs 1","Thing 2"]);
    const [count,setCount]=useState(0);
    // const [title,setTitle]=useState("Hope");
   

    function isClicked(){

 let arrayLength= thingsArray.length+1

 setThingsArray(prevState => [...prevState,"Thing "+arrayLength])

       
        // console.log(thingsArray);
    }

   
    function isCounted(){
        setCount(count+1)
    }


    const thingsElements=thingsArray.map(thing =><p key={thing}>{thing}</p>);
    return (
        <div className="card align-items-center" style={{ width: '30rem' }}>

<h3 className="text-2xl font-bold mb-4">Dashboard</h3>
            {/* <img  src="../src/assets/costume.jpeg"/> */}

            {/* <div className="card--line">
            
                <img className = "card--star" onClick={isCounted} src="../src/assets/red_star.png"/>
                <h4 className="card--rate"> {count} (6)</h4>
                <h4 className="card--location">.Online</h4>
            </div>
            <p className="card--about">{title}</p>

            <h4 className="card--line">More about us</h4>
            <p className="card--about">{body}</p>

            <div className="card--line">
            <h4 className="card--charge">From $136</h4>
            <h4 className="card--unit_cost"> / person</h4>
            </div> */}
                <MQTTClient/>
            {/* <div className="card--line">
                <button onClick={isClicked}  >Click Me</button>
            </div>
            {thingsElements} */}
        </div>
    );
}

export default Card