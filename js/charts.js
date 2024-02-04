let tempECO2, tempTVOC;

function createChart() {
  const ctx = document.getElementById("temperatureChart").getContext("2d");
  const ctx2 = document.getElementById("humidityChart").getContext("2d");
  const eco2 = document.getElementById("eco2Chart").getContext("2d");
  const tvoc = document.getElementById("tvocChart").getContext("2d");

  eco2Chart = new Chart(eco2, {
    type: "line",
    data: {
      datasets: [
        {
          data: [],
          label: "eCO2",
          fill: true,
          borderColor: "black",
          backgroundColor: "rgb(0, 196, 167)",
          borderWidth: 0.5,
        },
      ],

      options: {
        scales: {
          x: {
            type: "time",
            time: {
              unit: "minute",
            },
          },
        },
      },
    },
  });

  tvocChart = new Chart(tvoc, {
    type: "line",
    data: {
      datasets: [
        {
          data: [],
          label: "TVOC",
          fill: true,
          borderColor: "black",
          backgroundColor: "rgb(47, 58, 110)",
          borderWidth: 0.5,
        },
      ],

      options: {
        scales: {
          x: {
            type: "time",
            time: {
              unit: "minute",
            },
          },
        },
      },
    },
  });

  temperatureChart = new Chart(ctx, {
    type: "line",
    data: {
      //labels: ["January", "February", "March", "April", "May", "June", "July"],
      datasets: [
        {
          data: [],
          label: "Температура",
          fill: true,
          borderColor: "orange",
          backgroundColor: "rgb(255, 56, 0)",
          borderWidth: 0.5,
        },
      ],

      options: {
        scales: {
          x: {
            type: "time",
            time: {
              unit: "minute",
            },
          },
        },
      },
    },
  });

  humidityChart = new Chart(ctx2, {
    type: "line",
    data: {
      //labels: ["January", "February", "March", "April", "May", "June", "July"],
      datasets: [
        {
          data: [
            { x: "19:47", y: 22, value: 22 },
            { x: "19:48", y: 23, value: 23 },
            { x: "19:49", y: 22, value: 22 },
          ],
          label: "Влажност",
          fill: true,
          borderColor: "green",
          backgroundColor: "rgb(52, 136, 206)",
          borderWidth: 0.5,
        },
      ],

      options: {
        scales: {
          x: {
            type: "time",
            time: {
              unit: "minute",
            },
          },
        },
      },
    },
  });
}

function getTime() {
  const now = new Date();
  return now.getHours() + ":" + now.getMinutes() + ":" + now.getSeconds();
}

function testData() {
  let tempRandNum = Math.floor(Math.random() * 26);
  addData(temperatureChart, getTime().toString(), {
    x: getTime().toString(),
    y: tempRandNum,
    value: tempRandNum,
  });

  if (tempECO2 != mqttReceivedMessageECO2 || tempECO2 === "undefined") {
    addData(eco2Chart, getTime().toString(), {
      x: getTime().toString(),
      y: mqttReceivedMessageECO2,
      value: mqttReceivedMessageECO2,
    });
    tempECO2 = mqttReceivedMessageECO2;
  }
  if (tempTVOC != mqttReceivedMessageTVOC || tempTVOC === "undefined") {
    addData(tvocChart, getTime().toString(), {
      x: getTime().toString(),
      y: mqttReceivedMessageTVOC,
      value: mqttReceivedMessageTVOC,
    });
    tempTVOC = mqttReceivedMessageTVOC;
  }
}

function addData(chart, label, data) {
  chart.data.labels.push(label);
  chart.data.datasets.forEach((dataset) => {
    dataset.data.push(data);
  });
  chart.update();
}
