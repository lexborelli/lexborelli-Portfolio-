//importing express and seting up app

const express = require('express'); 

// require projects in data.json
const {projects} = require('./data.json'); 

const app = express();

 

//view engine set up to pug
app.set('view engine', 'pug');

//setting up path module by creating a variable for path then used a static route and the express.static method to serve the static files located in the public folder
app.use('/static', express.static('public'));


//setting the route for rendering index to data.json
app.get('/',(req, res, next) => {
    res.render('index', { projects });
 });

 //About route to render about page 

 app.get('/about', (req, res) => {
   res.render('about');
});

 //get individual projects through id
 app.get('/projects/:id', function(req, res, next) { 

   const project = projects.find( ({ id }) => id === +req.params.id );

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


 //404 page not found, sends a response to terminal saying 404 handler has been called then sets the response status to 404 and renders the 'page-not-found' in views folder.
 app.use((req, res, next) => {
   console.log('err.message');
   res.status(404).render('page-not-found', { err });

 })

 //global error handler handles errors caught by route handle; if status is 404 it sets status to 404 and renders the "page-not-found" folder and passes the error object to the views folder. 
 //Else, the error message is given a message , the response status is set to 500 or given the error status. Lastly, It renders the "error" file in views folder and passes the error object. 
 
 app.use((err,req, res, next) => {

    if (err.status === 404) {
      res.status(404).render('page-not-found', { err });
    } else {
      res.local.error = err; 
      err.message = err.message || `Something went wrong with the server.`;
      res.status(err.status || 500).render('error', { err });
    }

 });


 //Turn on express server

 app.listen(3000, () => {
    console.log('server listening on port 3000');
 });

