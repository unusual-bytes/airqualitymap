# airqualitymap
A web interface for visualizing, on an interactive map, data sent over MQTT from air quality monitoring stations.


Developed for an air quality station that uses the [ESP8266 NodeMCU microcontroller](https://www.make-it.ca/nodemcu-details-specifications/) and sensors such as the SGP30 and Sharp GP2Y1010AU0F.


The interface supports connection with multiple monitoring stations

## Preview


- Using Demo Values


![github](https://github.com/unusual-bytes/airqualitymap/assets/28684850/7087e593-335c-4fed-9e93-10713514f5e1)

- Connected to an air quality station


<img src="https://github.com/unusual-bytes/airqualitymap/assets/28684850/2907f399-a583-48f9-9c1d-faf14ce9abcb" width="800">

## Usage
- Needs to be built on a local server ([Live Server](https://marketplace.visualstudio.com/items?itemName=ritwickdey.LiveServer) or similar)
- Uses [Mapbox-GL-js API](https://docs.mapbox.com/mapbox-gl-js/api/), put your API key in a new config.json file in the main directory as such:
```json
{
  "MAPBOX-TOKEN": "your.mapbox-token"
}
```
- Configure the MQTT address and topics in `MQTT.js`
