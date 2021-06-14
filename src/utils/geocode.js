const request = require("request");

const geoCode = (address, callBack) => {
  const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(
    address
  )}.json?access_token=pk.eyJ1IjoiYW5ncnlyb2NrZXQ3ODkiLCJhIjoiY2twcjc2ODJmMGM4bDJvcWs4dXZmeDYwdCJ9.QaFdLhMQkYTW1nLnqQrfzg&limit=1`;

  request({ url: url, json: true }, (error, response) => {
    if (error) {
      callBack("Unable to connect to location services", undefined); //if we don't provide data value here it will be undefined by default
    } else if (response.body.features.length === 0) {
      callBack("Please enter a valid Location", undefined);
    } else {
      callBack(undefined, {
        Latitude: response.body.features[0].center[1],
        Longitude: response.body.features[0].center[0],
        Location: response.body.features[0].place_name,
      });
    }
  });
};

module.exports = geoCode;
