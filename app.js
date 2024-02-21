//importing express and seting up app

const express = require('express'); 

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
app.get('/', function(req, res, next) {
    res.render('index', { projects });
 });

 //About route to render about page 

 app.get('/about', (req, res) => {
   res.render('about');
});


 //get individual projects through id
 app.get('/projects/:id', function(req, res, next) {
   const projectId = req.params.id;  
   const project = projects.find( ({ id }) => id === +projectId );

    if (project) {
      //pass the projects data to project template
        res.render('project', { project });
    } else {
        const err = new Error('err');
        err.status = 404;
        err.message = "It looks like the page you requested doesn't exist.";
        next(err);
    }
 });

 //global error handler 
 app.use((err, req, res, next) => {
    if (err) {
    console.log('Global error handler called', 'err');
    } if (err.status === 404) {
        res.status(404).render('not found', { err });
    } else {
      err.message = err.message || `something went wrong with the server.`;
      res.status(err.status || 500).render('error', { err });
    }
 });


 //Turn on express server

 app.listen(3000, () => {
    console.log('server listening on port 3000');
 });

 module.exports = app; 