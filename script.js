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
    document.querySelector("#icon").setAttribute(
    "src",
    `https://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  
  celciusTemperature = response.data.main.temp;
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

function formatHours(timestamp){
    let date= new Date(timestamp);
    let hours= date.getHours();
    if (hours<10){
        hours=`0${hours}`;
    }
let minutes= date.getMinutes();
if(minutes<10){
    minutes=`0${minutes}`;
}
return `${hours}:${minutes}`;

}


function displayForecast(response){
let forecastElement = document.querySelector("#forecast");
forecastElement.innerHTML= null;
let forecast= null;

for(let index=0; index < 5 ;index ++){
forecast= response.data.list[index];

    forecastElement.innerHTML +=
 `<button class="next-days">
        ${formatHours(forecast.dt*1000)}
            <br />
            <h3>${Math.round(forecast.main.temp)}°C
                <br />
                <img src="https://openweathermap.org/img/wn/${forecast.weather[0].icon}@2x.png">
            </h3>
        </button>`;
}

}



function searchCity(city){


   
    let units ="metric";
    let apiKey = "62d7633f840fb3f4bca3fffc5afee380";
    let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=${units}`;


axios.get(apiUrl).then(showTemperature);

apiUrl= `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=${units}`;
axios.get(apiUrl).then(displayForecast);

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

//degree to Fahrenheit



function showFahrenheit (event){
    event.preventDefault();

    

    let fahrenheitTemp = (celciusTemperature*9)/5+32;
    let temperatureElement=document.querySelector("#temperature");
    temperatureElement.innerHTML = Math.round(fahrenheitTemp);


celcius.classList.remove("active");
    fahrenheit.classList.add("active");
}

function showCelcius (event){
event.preventDefault();

let temperatureElement=document.querySelector("#temperature");
 temperatureElement.innerHTML = Math.round(celciusTemperature);
celcius.classList.add("active");
    fahrenheit.classList.remove("active");
}


let celciusTemperature = null;

    let fahrenheit = document.querySelector("#fahrenheit");
fahrenheit.addEventListener("click", showFahrenheit);

let celcius = document.querySelector("#celcius");
celcius.addEventListener("click", showCelcius);

//Bruxelles weather at the opening app
searchCity("Bruxelles");

