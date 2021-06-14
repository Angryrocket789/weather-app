const request = require("request");

const foreCast = (Longitude, Latitude, callBack) => {
  const url = `http://api.weatherstack.com/current?access_key=5d95e95210eb2dceafb5ffb8d7bbf613&query=${Latitude},${Longitude}&units=m`;
  request({ url: url, json: true }, (error, response) => {
    if (error) {
      callBack("Check Your Internet Connection", undefined);
    } else if (response.body.error) {
      callBack("Please enter a correct location", undefined);
    } else {
      callBack(undefined, {
        description: response.body.current.weather_descriptions[0],
        temperature: response.body.current.temperature,
        precipitation: response.body.current.precip,
        humidity: response.body.current.humidity,
      });
    }
  });
};

module.exports = foreCast;
