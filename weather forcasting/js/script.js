let weatherApiKey = "52d8a18b7c62b7f1c71c10ebd5a5874c";
let weatherBasedApiEndPoint =
  "https://api.openweathermap.org/data/2.5/weather?appid=" +
  weatherApiKey +
  "&units=metric";
let forecastBasedApiEndPoint =
  "https://api.openweathermap.org/data/2.5/forecast?units=metric&appid=" +
  weatherApiKey;
let geoCodingBaseEndPoint =
  "http://api.openweathermap.org/geo/1.0/direct?&limit=5&appid=" +
  weatherApiKey +
  "&q=";
let datalist = document.querySelector("#suggestions");
let searchInp = document.querySelector(".weather_search");
let city = document.querySelector(".weather_city");
let day = document.querySelector(".weather_day");
let humidity = document.querySelector(".weather_indicator--humidity>.value");
let wind = document.querySelector(".weather_indicator--wind>.value");
let pressure = document.querySelector(".weather_indicator--pressure>.value");
let temperature = document.querySelector(".weather_temperature >.value");
let image = document.querySelector(".weather_image");
let forecastBlock = document.querySelector(".weather_forecast");
let getWeatherByCityName = async (city) => {
  let endPoint = weatherBasedApiEndPoint + "&q=" + city;
  let response = await fetch(endPoint);
  let weather = await response.json();
  return weather;
};
let getForeCastByCityId = async (id) => {
  let endPoint = forecastBasedApiEndPoint + "&id=" + id;
  let response = await fetch(endPoint);
  let forecast = await response.json();
  //console.log(forecast);
  let daily = [];
  forecast.list.forEach((day) => {
    //  console.log(day);
    let date_txt = day.dt_txt;
    date_txt = date_txt.replace(" ", "T");
    // console.log("date_txt" + date_txt);
    let date = new Date(date_txt);
    let hour = date.getHours();
    if (hour === 12) {
      daily.push(day);
    }
  });
  console.log(daily);
  return daily;
};
let weatherimages = [
  { Url: "images/broken-clouds.png", ids: [803, 804] },
  {
    Url: "images/clear-sky.png",
    ids: [800, 500],
  },
  { Url: "images/scattered-clouds.png", ids: [802] },
  { Url: "images/few-clouds.png", ids: [801] },
  {
    Url: "images/mist.png",
    ids: [701, 711, 721, 731, 741, 751, 761, 762, 771, 781],
  },
  {
    Url: "images/snow.png",
    ids: [600, 601, 611, 612, 613, 614, 615, 616, 620, 621, 622],
  },
  {
    Url: "images/thunderstrom.png",
    ids: [200, 201, 202, 210, 211, 212, 221, 230, 232],
  },
];

let updateCurrentWeather = (data) => {
  // console.log(data);
  city.innerText = data.name;
  day.innerText = dayofweek();
  humidity.innerText = data.main.humidity;
  pressure.innerText = data.main.pressure;
  let winddirection;
  let deg = data.wind.deg;
  if (deg > 45 && deg <= 135) winddirection = "East";
  else if (deg > 135 && deg <= 225) winddirection = "South";
  else if (deg > 225 && deg <= 315) winddirection = "West";
  else winddirection = "North";
  wind.innerText = winddirection + "," + data.wind.speed;
  temperature.innerText =
    data.main.temp > 0
      ? `+${Math.round(data.main.temp)}`
      : `${Math.round(data.main.temp)}`;

  let ImgId = data.weather[0].id;
  console.log("iamge " + ImgId);
  weatherimages.forEach((obj) => {
    if (obj.ids.indexOf(ImgId) != -1) {
      image.src = obj.Url;
    }
  });
};
let dayofweek = (dt = new Date()) => {
  return new Date(dt).toLocaleDateString("en-En", { weekday: "long" });
};
let weatherForCity = async (city) => {
  let weather = await getWeatherByCityName(city);
  // console.log(weather.cod);
  if (weather.cod !== 200) {
    Swal.fire({
      icon: "error",
      title: "OOPs.....",
      text: "YOu entered wrong city name.",
    });
    return;
  }
  updateCurrentWeather(weather);
  let forecast = await getForeCastByCityId(weather.id);
  updateWeatherForcast(forecast);
};
searchInp.addEventListener("keydown", (e) => {
  if (e.keyCode == 13) {
    weatherForCity(searchInp.value);
  }
});
searchInp.addEventListener("input", async () => {
  if (searchInp.value.length <= 2) return;
  let endPoint = geoCodingBaseEndPoint + searchInp.value;
  let response = await fetch(endPoint);
  let result = await response.json();
  // console.log(result);
  let option = document.createElement("option");
  datalist.innerHTML = "";
  result.forEach((city) => {
    option.value = `${city.name} ${
      city.state !== undefined ? `,${city.state}` : " "
    },${city.country}`;
  });
  datalist.appendChild(option);
});
let updateWeatherForcast = (forecast) => {
  forecastBlock.innerHTML = " ";
  forecastItem = "";
  forecast.forEach((day) => {
    // console.log(day);
    let iconUrl =
      "http://openweathermap.org/img/wn/" + day.weather[0].icon + "@2x.png";
    let temperature =
      day.main.temp > 0
        ? `+${Math.round(day.main.temp)}`
        : `${Math.round(day.main.temp)}`;
    let dayName = dayofweek(day.dt * 1000);
    // console.log(dayName);
    forecastItem += `<article class="weather_forecast_item">
      <img
        src="${iconUrl}"
        alt="Clear sky"
        class="weather_forecast_icon"
      />
      <h3 class="weather_forecast_day">${dayName}</h3>
      <p class="weather_forecast_temperature">
        <span class="value">${temperature}</span> &deg;C
      </p>
    </article>`;
  });
  forecastBlock.innerHTML = forecastItem;
};
/* 
1 api endpoing 
2 getweathercityname
3 event handler input from where we get the city name.
4 weatherforcity is calling getweathercityname to get weather detail from server.
5 updateCurrentWeather will update all data the we get as response to 
6 wind direction we were getting in form deg 
7 temperature to show 
8 weather Forecast for 5 day for this api endpoint by cityid by method getForeCastByCityId return weather for 5 days
9 updateWeatherForecast will update all the card for each day .
10 we are passing the date in milliseconds to function day of week show it can return the day for the particular day.
11 
12geocodingPart as user type name of city we have to show the suggestion with matching  cityname .
13 that we have show in datalist.
*/
