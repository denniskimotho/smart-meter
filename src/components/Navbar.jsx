import React from "react";

function Navbar(){
    return(
        <div>
        <nav>
            <img className="nav--logo" src="../src/assets/airbnb_logo.png"/>
           
        </nav>
        <img className="nav--photo_grid" src="../src/assets/photo_grid.png"/>
        <h3 className="nav--title">Online Experiences</h3>
        <p className="nav--explainer">Join unique interactive activities led by
             one-of-a-kind hosts-oil without leaving home</p>
        </div>
    )
}

export default Navbar