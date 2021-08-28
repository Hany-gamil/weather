/* Global Variables */

// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getMonth()+1+'.'+ d.getDate()+'.'+ d.getFullYear();

// i make account on openWeather And get my apiKey

const apiKey=`47fba8f8c3b7832824319cc5f1f97dee`; 
// get apiURL FROM the openWeather



const baseURL="http://api.openweathermap.org/data/2.5/weather?zip=";

// get id OF zip code into a variablr
// get id of feeling into a variable

 
// get id of the button into a variale
 const generate =document.querySelector('#generate')

  generate.addEventListener("click", async()=>{

    const zipCode = document.querySelector('#zip').value;
    const content = document.querySelector('#feelings').value;


    if (!zipCode){
      alert("please enter your zip code !!")
       return
    
  }
  else {
    getTemperature(zipCode)
    .then(data => postData("/setData", {date:newDate , temp:data.main.temp, content:content}))
  .then(() => updateUI())
  }
  });

  async function getTemperature(zipCode ){
    const request = await fetch(baseURL +zipCode+"&appid="+apiKey+"&units=metric");
    
    try{
     const result = await request.json();
     return result;
     }catch(err){
      console.error(err)
    } 

  };

  
  const postData = async function (url='/setData', data={}){
    const response = await fetch(url, {
      method: "POST",
      credentials: "same-origin",
      headers:{
       "Content-Type": "application/json"
   },
   body: JSON.stringify(data )
    });
    try{ 
      const res = await response.json();
      return res;
    }catch(err){
      console.error(err) 
    
  }};


  /* Function to GET Project Data */
  const updateUI = async () => {

      const response = await fetch('/getData');
  try {
  // Transform into JSON
  const allData = await response.json();
  
  // Write updated data to DOM elements
  document.getElementById('temp').innerHTML = Math.round(allData.temp)+ 'degrees';
  document.getElementById('content').innerHTML = allData.content;
  document.getElementById("date").innerHTML =allData.date;
  }
  catch(error) {
    console.log("error", error);
    // appropriately handle the error
  }
  
  
}
 