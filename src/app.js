const express = require('express');   // just a function
const app = express()  // create a new express object.
const path = require('path');  // core node module
const hbs = require('hbs');  // load up handle bars partials.
const forecast = require('./utils/forecast.js');
const geocode = require('./utils/geocode.js');

const port = process.env.PORT || 3000;   
// get the port from Heroku.  If run locally, it will set to 3000.

const viewsPath = path.join(__dirname, '../templates/views');
const partialsPath = path.join(__dirname,'../templates/partials');

// setup handlebars engine and views location
app.set('view engine', 'hbs');  // default to views directory in the root.
app.set('views',viewsPath); // seting the views directory to differ than views.
hbs.registerPartials(partialsPath);  

// setup static directory to serve.
// Express will find the match in the 
// public folder first.
app.use(express.static(path.join(__dirname, '../public')))  // a way to customize the server.
// express.static is a function require a path.  Will serve up
// the html pages in public folder.
// static assessts are static, can not be changed.

// Handlebars - render dynamic documents
// easily use code across pages.

// app.com  (domain).  root route
// app.com/help
// app.com/about

// call back take two parameters, request and response
// the route is blank, indicate is the root.
// No longer needed.  Express.use(static) will take care of it.
// default root will use index.html
/*app.get('', (req, res) => {
    // send a response back to requester.
    // rendering HTML back to requester.
    res.send('<h1>Weather</h1>');
}) */

// render the views.  
// send to the dynamic web pages in the second parameter.
app.get('',(req,res) => {
    res.render('index', {
        title: 'Weather App',
        name: 'Tuong Nguyen'
    });  // render the index.hbs file for dynamic web page.
});

// help path.
// No longer needed because, express.use(express.static) will
// use the help.html
/*app.get('/help',(req,res) => {
    // can send a JSON or an array of JSON back.
    res.send([{name:'Tuong', age: 47}, {name:'Ronald', age:57}])
   
})*/
app.get('/help',(req,res) => {
    res.render('help', 
    {message: 'Help page for weather services.', 
    title: 'Help',
    name: 'Tuong Nguyen'})
})

// about
/*app.get('/about',(req,res) => {
    res.send('<h1>About</h1>');
})*/

app.get('/about',(req,res)=>{
    res.render('about', {
        title: 'About Me',
        name: 'Tuong Nguyen'
    });
})

// weather
// Getting Query String, at end of the url.  
// key=value.  Multiple values require ampersign.
// ?search=games
// localhost:3000/products?search=games&rating=5
// query string lives in request.
app.get('/weather',(req,res) => {
    if(!req.query.address) {
        return res.send({error: 'You must provide an address'});
    }
    else {
        // req.query is a JSON object.
        //res.send(req.query);
        geocode(req.query.address, (error,data) => {
            if(error)
            {
                return res.send({error});
            }
            else{
                //input from forecast is from output from geocode.
                forecast(data, (error, forecastData) => {
                    if(error)
                        return res.send({error});

                    res.send({location: data.location,
                        forecast: forecastData,
                        address: req.query.address});
                })
            }
        })
    }
})

// match any request that starts with /help.  Catch all for help
app.get('/help/*', (req, res) => {
    //res.send('Help article not found');
    res.render('error', {
        title: '404 Error',
        message: 'help title not found', name: 'Tuong Nguyen'
    })
})

// handle error pages.  Or pages that doesn't exist.
// has to come last. Catch all for all that haven't match.
app.get('*',(req, res) => {
    //res.send('My 404 page.')
    res.render('error', { title: '404 Error',
    message: 'Page does not exist.' , name: 'Tuong Nguyen'})
})

// start the server.  Just once, given the port.  
// Asyncrhonous function
/*app.listen(3000, () => {    // Heroku will provide us with a port.
    console.log('Server is up on port 3000.');
});*/

app.listen(port, () => {    // Heroku will provide us with a port.
    console.log('Server is up on port ' + port);
});