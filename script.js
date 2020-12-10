// challenge 1

let now = new Date ();
console.log (now);

let today = document.querySelector(".today");

let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
let day= days[now.getDay()];

let date = now.getDate();

let months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
let month = months[now.getMonth()];

today.innerHTML= `${day}, ${date} ${month}`;
 

//api
function showTemperature (response){
    console.log(response.data);
   
    document.querySelector(".city").innerHTML=response.data.name;
    document.querySelector(".temperature").innerHTML=Math.round(response.data.main.temp);
    document.querySelector(".message").innerHTML=response.data.weather[0].description;
}


function searchLocation(position){
     let units ="metric";
    let apiKey = "62d7633f840fb3f4bca3fffc5afee380";
    let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&appid=${apiKey}&units=${units}`;

axios.get(apiUrl).then(showTemperature);
}

function getCurrentLocation(event){
    event.preventDefault();
   
    navigator.geolocation.getCurrentPosition(searchLocation);
}

//challenge 2 challenge api

function searchCity(city){
    let units ="metric";
    let apiKey = "62d7633f840fb3f4bca3fffc5afee380";
    let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=${units}`;

axios.get(apiUrl).then(showTemperature);
}


function newCity (event){
event.preventDefault();

let city = document.querySelector(".form-control").value;
    searchCity(city);
}


let searchForm = document.querySelector ("#search-city");
searchForm.addEventListener ("click", newCity);


let currentLocation = document.querySelector("#current-location");
currentLocation.addEventListener("click", getCurrentLocation);

//challenge 3

function change (event){
    event.preventDefault();

    let celsius = document.querySelector ("#temperature");
    
    celsius.innerHTML= `54 °F`;

    far.innerHTML=`Celsius`;

}



searchCity("Bruxelles");

