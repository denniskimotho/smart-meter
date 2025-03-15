import React, { useEffect, useState } from 'react';
import connectMQTT from './mqttService';

const MqttMain = () => {
  const [messages, setMessages] = useState([]);
  const [client, setClient] = useState(null);

  useEffect(() => {
    const mqttClient = connectMQTT((topic, message) => {
      setMessages((prevMessages) => [...prevMessages, { topic, message }]);
    });

    setClient(mqttClient);

    return () => {
      if (mqttClient) {
        mqttClient.end();
      }
    };
  }, []);

  const publishMessage = () => {
    if (client) {
      client.publish('topic/react', 'Hello from React!');
    }
  };

  return (
    <div>
      <h1>React with MQTT</h1>
      <button onClick={publishMessage}>Send Message</button>
      <ul>
        {messages.map((msg, index) => (
          <li key={index}>
            <strong>{msg.topic}:</strong> {msg.message}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MqttMain;

