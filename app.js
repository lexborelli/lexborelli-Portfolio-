//seting up express

var express = require('express'); 

// require projects in data.json
const {projects} = require('./data.json'); 

const app = express();

//setting up path module by creating a variable for path then used a static route and the express.static method to serve the static files located in the public folder
var path = require('path'); 
app.use('/static', express.static(path.join(__dirname, 'public')));

//view engine set up to pug
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');


//setting the route
app.get('/', (req, res) => {
    res.render('index', {projects});
 });