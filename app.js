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


//setting the route for rendering index to data.json
app.get('/', (req, res) => {
    res.render('index', {projects});
 });

 //About route to render about page 

 app.get('/about', (req, res) => {
    res.render('about');
 });

 //get individual projects through id
 app.get('/projects/:id', (req, res, next) => {
   const projectId = req.params.id;  
   const project = projects.find( ({id}) => id === +projectId);

    if (project){
        res.render('project', { project });
    } else {
        res.send(404);
    }
 });

 //Turn on express server

 app.listen(3000, () => {
    console.log('server listening on port 3000');
 });

