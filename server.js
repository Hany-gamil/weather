// Setup empty JS object to act as endpoint for all routes
projectData = {};

// Require Express to run server and routes
const express =require("express");

// Start up an instance of app
const app =express();
/* Middleware*/
//Here we are configuring express to use body-parser as middle-ware.

const bodyParser=require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Cors for cross origin allowance
const cors =require("cors");
app.use(cors());

// Initialize the main project folder
app.use(express.static('website'));


// Setup Server
const port = 8080;
const server = app.listen(port, listening);
function listening(){
    console.log("server running"); 
     console.log(`running on localhost: ${port}`);

};
app.get('/getData', (request, response)=> {
    response.send(projectData);
  });
  
  app.post('/setData', (request, response)=> {
    
      // console.log(request.body)
      let data = request.body;
     
      // Create new entry for JS Object Endpoint
      projectData ["temp"] = data.temp;
      projectData["content"] = data.content;
      projectData["date"] = data.date;
      console.log(data.temp);
      
      response.send(projectData);

           
     });
   