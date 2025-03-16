import React from "react";
import { useState,useEffect } from "react";
import MQTTClient from './MQTTClient';
import { set } from "react-hook-form";

function Meter({id,meter,unit}){

    // console.log(id);
    const [thingsArray,setThingsArray]=useState(["Thigs 1","Thing 2"]);
    const [count,setCount]=useState(0);
    const [show, setShow] = useState(false);
    const [connect,setConnection]=useState(false)
    const [unit_consumed,setUnitConsumed]=useState(0)
    const [unit_available,setUnitAvailable]=useState(0)
    const [tariff,setTariff]=useState(45)
    const [days,setDays] = useState(0)
    const [billtopay,setBilltoPay]=useState(0)
    const [mtr_type,setMeterType]=useState("")
    const [formRecarge, setFormRecharge] = useState({amount: 0 });

useEffect(() => {

    setDescription()

    function setDescription(){
        setUnitConsumed(unit)
    
        // // let tariff = 45
      const mtrs = meter.split("-"); 
      setMeterType(mtrs.at(-1) || "error");
      let subscription = mtrs.at(-1) || "error"
      
      setMeterType(subscription)
    
      setDays(Math.floor(Math.random() * 100) + 1);
    
    
      if(subscription=="pos"){

        
      
      setBilltoPay(tariff*unit_consumed)
    
    //   combinedMessage = "Consumed Unit: "+unit_consumed+" Tarrif: "+tariff+" Total Amount: "+billtopay
    
      let days = Math.floor(Math.random() * 60) + 1;
      setConnection(days<30)


      
    //   combinedMessage = "Consumed Unit: "+unit_consumed+" Tarrif: "+tariff+" Total Amount: "+billtopay+" Days consumed "+days+" "+(days-30>0 ? " Alert sent ..." : "")
    
     
      }else{
        let amount = Math.floor(Math.random() * 1000) + 10;
        let units = calculateAmount(amount)
         
        // setUnitAvailable(units)
    
        let bal  = units-unit_consumed
        if(bal>0){
            setUnitAvailable(bal)
            setConnection(true)
        }else{
            // setUnitAvailable(0)
            setConnection(false)
        }
    
        // console.log("Meter type "+mtr_type)
      
      }
    };
    
    

   
}, []);

const calculateAmount=(amount)=>{
    
    let units = (amount/tariff)

    // units = 1000

    return units
}
const handleChange = (e) => {
    const { name, value } = e.target;
    setFormRecharge({
      amount: value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

      console.log('Form Submitted:', formRecarge);

      
      let newbal = unit_available+calculateAmount(formRecarge.amount)
      
      setUnitAvailable(newbal)

      setShow(false);
      // You can add your form submission logic here, like an API call
 
  };
const recharge=()=>{

}

    function showPayment(){
        setShow(true)
    }
    function changeConnection(){

        setConnection(!connect)
        // console.log(thingsArray);
    }

  

    const thingsElements=thingsArray.map(thing =><p key={thing}>{thing}</p>);
    return (
        <div className="card align-items-center" style={{ width: '18rem' }}>
            

<h5 className="font-bold mb-2">{meter}</h5>

            <div className="card--line">
                        
            </div> 
            <h4 className="card--charge">Subscriptional Type: <strong>{mtr_type}</strong></h4>  
            <h4 className="card--charge">Unit Consumed: <strong>{unit_consumed}</strong></h4>
            <h4 className="card--charge">Unit Bal: <strong>{(unit_available-unit_consumed).toFixed(2)}</strong></h4>

            <h4 className="card--unit_cost"> Connection Status:{connect?<span style={{ color: "green" }}>Connected</span> : <span style={{ color: "red" }}>Disconnected</span>}</h4>
                           
             <div className="card--line d-inline-flex gap-1">
                <button className="mb-4 btn btn-dark" onClick={changeConnection} >{connect?"Disconnect ":"Connect "}</button>

                <button className="mb-4 btn btn-success" onClick={showPayment} >Recharge</button>
            </div>
            <div className="card--line">
                
            </div>
            {/* {thingsElements} */}

            {show && (
        <div className="modal fade show d-block" tabIndex="-1">
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Recharge Account</h5>
                <button className="btn-close" onClick={() => setShow(false)}></button>
              </div>
              <div className="modal-body">
              <div class="mb-4 row">
                    <label for="staticEmail" class="col-sm-2 col-form-label">Meter no</label>
                    <div class="col-sm-10">
                    <input type="text" readonly class="form-control-plaintext" id="staticEmail" value={meter}/>
                    </div>
                </div>
                <form onSubmit={handleSubmit}>
                

                <div class="mb-3 row">
                    <label for="inputAmount" class="col-sm-2 col-form-label">Amount</label>
                    <div class="col-sm-10">
                    <div class="input-group mb-3">
  <span class="input-group-text">KES</span>
  <input type="number" step="1" class="form-control" onChange={handleChange}
  id="inputAmount" aria-label="Amount (to the nearest dollar)"/>
                    </div>
                </div>
                </div>
                <button className="btn btn-success" type="submit">
                  Make Payment
                </button>
                </form>
              </div>
              <div className="modal-footer">
                
              </div>
            </div>
          </div>
        </div>
      )}

      {show && <div className="modal-backdrop fade show"></div>}
        </div>
    );
}

export default Meter