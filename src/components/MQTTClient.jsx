import React, { useState, useEffect } from "react";
import mqtt from "mqtt";
import Meter from "./Meter";

export default function MQTTClient() {
  const [client, setClient] = useState(null);
  const [messages, setMessages] = useState([]);
  const [connected, setConnected] = useState(false);
  const [days,setDays]=useState(0);
  const [unit_consumed,setUnitConsumed]=useState("0");
  const [tariff,setTariff]=useState(45);
  const [connectionStatus,setConnectionStatus] = useState(false);
  const [loading, setLoading] = useState(true);
  const [loadingData, setLoadingData] = useState(false);

  // let unit_consumed ="0"
  const [names,setNames] = useState(["Apmt1/mtr1-pre", "Apmt2/mtr1-pre","Apmt1/mtr1-pos", "Apmt1/mtr2-pos"]);
  useEffect(() => {

    // let unit_consumed ="0"
    setTimeout(() => setLoading(false), 3000); 
    const host = '38dc1c33b81e4958b15814ecb25dbf42.s1.eu.hivemq.cloud'; // E.g., 'broker.hivemq.com' or your HiveMQ Cloud host
    const port = '8884'; // Use 8883 for secure MQTT (TLS)
    const clientId = `mqtt_${Math.random().toString(16).slice(3)}`;

    // Connect to the MQTT broker

    const options = {
        keepalive: 60,
        clientId,
        protocolId: 'MQTT',
        protocolVersion: 4,
        clean: true,
        reconnectPeriod: 1000,
        connectTimeout: 30 * 1000,
       username: 'mqtt.dev1', // For HiveMQ Cloud
       password: 'Mqtt.dev1', // For HiveMQ Cloud
      };
    
   

      const mqttClient = mqtt.connect(`wss://${host}:${port}/mqtt`,options);

    // const mqttClient = mqtt.connect("wss://broker.hivemq.com:8884/mqtt"); // Example public broker
    setClient(mqttClient);

        
    
        // fetchdata
    
        // data.map((item)=>(
    //   // <Card key={item.id} title={item.title}
    //   //  body={item.body}/>
    //   console.log(item.title)

    //   // mqttClient.subscribe("test/topic", (err) => {
    //   //   if (err) {
    //   //     console.error("Subscription error:", err);
    //   //   } else {
    //   //     console.log("Subscribed to topic: test/topic");
    //   //   }
    //   // })         
      
    //   ))

    mqttClient.on("connect", () => {
      console.log("Connected to MQTT Broker");
      setConnected(true);      
      //      mqttClient.subscribe("test/topic", (err) => {
      //   if (err) {
      //     console.error("Subscription error:", err);
      //   } else {
      //     console.log("Subscribed to topic: test/topic");
      //   }
      // }) 
      // Subscribe to a topic

      names.map((name, index) => (
       
        mqttClient.subscribe(name, (err) => {
          if (err) {
            console.error("Subscription error:", err);
          } else {
            console.log("Subscribed to topic: test/topic");
          }
        })
      ))    
     
    });

    mqttClient.on("message", (topic, message) => {
      // // let tariff = 45
      // const mtrs = topic.split("-"); 
      // const mtr_type = mtrs.at(-1) || "error";

      // let unit_consumed_from=message.toString()
      // setUnitConsumed(unit_consumed_from)
      // console.log("unit consumed "+unit_consumed)
      // let combinedMessage = ""
      
      // setDays(Math.floor(Math.random() * 100) + 1);

      // if(mtr_type=="pos"){
      
      // let billtopay = tariff*unit_consumed

      // combinedMessage = "Consumed Unit: "+unit_consumed+" Tarrif: "+tariff+" Total Amount: "+billtopay

      // let days = Math.floor(Math.random() * 60) + 1;
      // setConnectionStatus(days<30)
      
      // combinedMessage = "Consumed Unit: "+unit_consumed+" Tarrif: "+tariff+" Total Amount: "+billtopay+" Days consumed "+days+" "+(days-30>0 ? " Alert sent ..." : "")

     
      // }else{
      //   let amount = 1000;
      //   let units = (1000/tariff).toFixed(2)
      //   let bal  = (units - unit_consumed).toFixed(2)

      //   setConnectionStatus(bal<0)
          
      //   combinedMessage = "Recharge amount: "+amount+" Unit recharged: "+units+"Consumed Unit: "+unit_consumed+" Tarrif: "
      //   +tariff+" Bal Unit: "+bal+(bal<4 ? " Alert sent ..." : "")
      // }
      const newMessage = { topic, message: message.toString() };
      setMessages((prevMessages) => [...prevMessages, newMessage]);
      console.log("New message:", newMessage);
    });

    mqttClient.on("error", (err) => {
      console.error("MQTT Connection Error:", err);
    });

    return () => {
      mqttClient.end();
    };
  }, []);


  const sendMessage = () => {
        
    if (client) {
     
      names.map((name, index) => (
      client.publish(name, unit_consumed),
      console.log("Message sent: Hello 2 from React!")
      )
    )
    }
  };

  return (
    <div className="p-4">
      <h3 className="text-2xl font-bold mb-4">Spearhead Client</h3>
      <div className="mb-4">
        <p>Connection Status from MQTT: </p>
      
          {loading ?
              <div className="spinner-border text-primary" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
            :<div>
            
              
        {connected ? <p style={{ color: "green" }}>Connected</p> : <p style={{ color: "red" }}>Disconnected</p>}
        <button
          onClick={sendMessage}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700"
          disabled={!connected}
        >
         
          Refresh Signal from  all meters
        </button>

            </div>
        }
      </div>
     
      
      <h2 className="text-xl font-semibold">Received Messages from Smart Meter</h2>
      
        {messages.map((msg, index) => (
          <Meter  key={index} meter={msg.topic}
          unit={msg.message}/>
          // <li key={index}>
          //   <strong>{msg.topic}:</strong> {msg.message}
          // </li>
        ))}
       
     
      
    </div>
  );
}
