const request = require('request');  //npm library..

//const forecast = (latitude, longitude, callback) =>
// use destructuring.
const forecast = ({latitude, longitude} , callback) =>
{
    const url = 'https://api.darksky.net/forecast/3d00c3743a10402541c9baa60d71a121/' + latitude +',' + longitude;//longitude + ',' + latitude;
    request({url:url, json:true}, (error, response) => {
        if(error) 
        {
            callback('Unable to connect to weather service.',undefined);
        }
        else if(response.body.error)
        {
            callback('No matching results');
        }
        else {
            const highTemp = response.body.daily.data[0].temperatureHigh;
            const lowTemp = response.body.daily.data[0].temperatureLow;
            const sunriseTime = response.body.daily.data[0].sunriseTime;
            callback(undefined,response.body.daily.data[0].summary + ' It is currently ' + 
            response.body.currently.temperature + 
            ' degrees out.  There is a ' + 
             response.body.currently.precipProbability + 
            '% chance of rain.' + 'The High temperature ' + highTemp + ' and low temperature ' + lowTemp );
        }
    })
}   

module.exports = forecast;