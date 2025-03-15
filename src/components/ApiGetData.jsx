import React, { useEffect } from "react";
import { useState } from "react";
import Card from './Card';

function ApiGetData(){

    const [data,setData]=useState([]);
    const [loading, setLoading] = useState(true); // State to track loading status

    // fetchdata

    useEffect(()=>{
        const fetchData = async() =>{

            try{
                const response = await fetch("https://jsonplaceholder.typicode.com/posts");

                // console.log(response.ok);
                const result = await response.json();
                setData(result);

            }catch{
                
            }
            finally{
                setLoading(false)
            }
        }

        fetchData();

    },[] 
);




    return (
        <div> 
        <h1>Get data</h1>
        

        {/* {data.map((item) => (
          <li key={item.id}>{item.id}:{item.title}</li>
        ))} */}

{/* {Object.entries(data).map((item) => (
      <li key={item.id}>
        {item.id}: {item.title}
      </li>
    ))} */}
            {data.map((item)=>(
                <Card key={item.id} title={item.title}
                 body={item.body}/>
                // console.log(item.title)

                  
                
                ))
                }
        
        </div>
    );
}
export default ApiGetData;