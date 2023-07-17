# weather-forcasting
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Weather App JavaScript</title>
    <link rel="stylesheet" href="css/style.css" />
    <link
      href="//cdn.jsdelivr.net/npm/@sweetalert2/theme-dark@4/dark.css"
      rel="stylesheet"
    />
  </head>

  <body>
    <div class="weather">
      <input
        type="search"
        list="suggestions"
        class="weather_search"
        placeholder="Enter City Name"
      />
      <datalist id="suggestions"></datalist>

      <div class="weather_today">
        <div class="weather_details">
          <h2 class="weather_city">City</h2>
          <p class="weather_day">Day</p>
          <div class="weather_current">
            <p class="weather_indicator weather_indicator--humidity">
              <span class="value">50</span>%
            </p>
            <p class="weather_indicator weather_indicator--wind">
              <span class="value">West, 5</span>m/s
            </p>
            <p class="weather_indicator weather_indicator--pressure">
              <span class="value">1050</span>hPa
            </p>
          </div>
        </div>
        <img src="images/clear-sky.png" alt="Clear sky" class="weather_image" />
        <div class="weather_temperature">
          <span class="value">+25</span> &deg;C
        </div>
      </div>

      <div class="weather_forecast">
        <article class="weather_forecast_item">
          <img
            src="images/clear-sky.png"
            alt="Clear sky"
            class="weather_forecast_icon"
          />
          <h3 class="weather_forecast_day">Day</h3>
          <p class="weather_forecast_temperature">
            <span class="value">+25</span> &deg;C
          </p>
        </article>

        <article class="weather_forecast_item">
          <img
            src="images/clear-sky.png"
            alt="Clear sky"
            class="weather_forecast_icon"
          />
          <h3 class="weather_forecast_day">Day</h3>
          <p class="weather_forecast_temperature">
            <span class="value">+25</span> &deg;C
          </p>
        </article>

        <article class="weather_forecast_item">
          <img
            src="images/clear-sky.png"
            alt="Clear sky"
            class="weather_forecast_icon"
          />
          <h3 class="weather_forecast_day">Day</h3>
          <p class="weather_forecast_temperature">
            <span class="value">+25</span> &deg;C
          </p>
        </article>

        <article class="weather_forecast_item">
          <img
            src="images/clear-sky.png"
            alt="Clear sky"
            class="weather_forecast_icon"
          />
          <h3 class="weather_forecast_day">Day</h3>
          <p class="weather_forecast_temperature">
            <span class="value">+25</span> &deg;C
          </p>
        </article>

        <article class="weather_forecast_item">
          <img
            src="images/clear-sky.png"
            alt="Clear sky"
            class="weather_forecast_icon"
          />
          <h3 class="weather_forecast_day">Day</h3>
          <p class="weather_forecast_temperature">
            <span class="value">+25</span> &deg;C
          </p>
        </article>
      </div>
    </div>
    <script src="./js/script.js"></script>
    <script src="//cdn.jsdelivr.net/npm/sweetalert2@11/dist/sweetalert2.min.js"></script>
  </body>
</html>
