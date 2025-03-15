import mqtt from 'mqtt';

const connectMQTT = (onMessageReceived) => {
  const host = '38dc1c33b81e4958b15814ecb25dbf42.s1.eu.hivemq.cloud'; // E.g., 'broker.hivemq.com' or your HiveMQ Cloud host
  const port = '8883'; // Use 8883 for secure MQTT (TLS)
  const clientId = `mqtt_${Math.random().toString(16).slice(3)}`;

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

  const client = mqtt.connect(`mqtt://${host}:${port}`,options);

  client.on('connect', () => {
    console.log('Connected to MQTT broker');
    client.subscribe('topic/react', (err) => {
      if (!err) {
        console.log('Subscribed to topic');
      }
    });
  });

  client.on('message', (topic, message) => {
    console.log(`Received message: ${message.toString()}`);
    if (onMessageReceived) {
      onMessageReceived(topic, message.toString());
    }
  });

  client.on('error', (err) => {
    console.error('Connection error:', err);
    client.end();
  });

  return client;
};

export default connectMQTT;
