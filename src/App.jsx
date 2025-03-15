import React, { useEffect, useState } from 'react';
import DataForm from './components/DataForm';
import Navbar from './components/Navbar';
import Main from './components/Main';
import Card from './components/Card';
import MQTTClient from './components/MQTTClient';
import ApiGetData from './components/ApiGetData';
import AddItem from './components/AddItem';

const App = () => {


  return (
    <div>
        {/* <Navbar /> */}
        {/* <Main/> */}
        {/* <Card/> */}

        {/* <MQTTClient/> */}
        <ApiGetData/>
        {/* <DataForm/> */}
        {/* <AddItem/> */}
      
       
    </div>
  );
}; 

export default App;
