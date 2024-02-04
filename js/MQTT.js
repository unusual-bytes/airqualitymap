let mqttReceivedMessageTVOC, mqttReceivedMessageECO2;

function MQTTStart() {
  const client = mqtt.connect("ws://192.168.100.7:9001");

  client.on("connect", function () {
    console.log("Connected");
  });

  subscribeTopic(client, ["sgp.TVOC", "sgp.eCO2"]);

  client.on("message", function (topic, message) {
    if (topic === "sgp.TVOC") mqttReceivedMessageTVOC = message.toString();
    if (topic === "sgp.eCO2") mqttReceivedMessageECO2 = message.toString();
  });
}

function subscribeTopic(client, topics) {
  topics.forEach((topic) => client.subscribe(topic));
}
