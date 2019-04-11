const request = require('request');


//geocoding -- converting into latitude and longitude.
// address -> api -> lat/long -> weather.  
// center attributes will give latitude and longitude.
// limit to one value only.  Put the limit query parameter.
// Asynchronous functions can not be returned.  It can be passed as a parameter
// as part of a call back function.  The function callback can be named
// as anything.  For usability, I chose callback.  The callback function
// will always send two parameters here.  Either an error or data.  If error, data is
// undefined.  If data, then error is undefined.
const geoCode = (address, callback) => {
    const geoUrl = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURIComponent(address) + '.json?access_token=pk.eyJ1IjoidHVvbmc5OCIsImEiOiJjanRyYjJhZnMwbzl6NDNvNDJuamhjMnQ5In0.t0piz5gts9z3F2zpRjqExw&limit=1';
    request({url:geoUrl, json: true}, (error, response) => {
        if(error) {  // optionally, can ommitted undefined, by default, javascript assigned undefined.
            callback('Unable to connect to location services!',undefined);
        } else if(response.body.features.length === 0){
            callback('Unable to find location. Try another search.');
        }
        else { 
            callback(undefined, {longitude: response.body.features[0].center[0], 
                                 latitude: response.body.features[0].center[1],
                                 location: response.body.features[0].place_name});
        }
    });
}

module.exports = geoCode;