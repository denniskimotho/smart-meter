import React, { useState, useEffect } from "react";
import mqtt from "mqtt";

export default function MQTTClient() {
  const [client, setClient] = useState(null);
  const [messages, setMessages] = useState([]);
  const [connected, setConnected] = useState(false);

  useEffect(() => {

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

    mqttClient.on("connect", () => {
      console.log("Connected to MQTT Broker");
      setConnected(true);

      // Subscribe to a topic
      mqttClient.subscribe("test/topic", (err) => {
        if (err) {
          console.error("Subscription error:", err);
        } else {
          console.log("Subscribed to topic: test/topic");
        }
      });
    });

    mqttClient.on("message", (topic, message) => {
      let tariff = 45
      let unit_consumed = message.toString()
      let billtopay = tariff*unit_consumed
     
      let combinedMessage = "Unit:"+unit_consumed+" Tarrif: "+tariff+" Total: "+billtopay
      const newMessage = { topic, message: combinedMessage };
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
      client.publish("test/topic", "Hello 2from React!");
      console.log("Message sent: Hello 2 from React!");
    }
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">MQTT Client</h1>
      <div className="mb-4">
        <p>Status: {connected ? "Connected" : "Disconnected"}</p>
        <button
          onClick={sendMessage}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700"
          disabled={!connected}
        >
          Tap to send Message to MQTT broker
        </button>
      </div>
      <h2 className="text-xl font-semibold">Received Messages from IoT Device</h2>
      <ul className="list-disc ml-6">
        {messages.map((msg, index) => (
          <li key={index}>
            <strong>{msg.topic}:</strong> {msg.message}
          </li>
        ))}
      </ul>
    </div>
  );
}
