import './App.css'
import './css/weather-icons.min.css' 
import { useState, useEffect } from 'react';
import WeatherTop from "./components/WeatherTop";

function App() {
  //Let's make 2 states to store current geolocation for the app
  const [lat, setLat]= useState([]);
  const [long, setLong] = useState([]);
  const [data, setData]= useState([]);

  const apiURL1 = import.meta.env.VITE_APP_API_URL_F;
  const apiURL2 = import.meta.env.VITE_APP_API_URL_C;
  const apiKey = import.meta.env.VITE_APP_API_KEY;

  const weatherIcons = {
    "clear sky" : "wi-day-sunny",
    "few clouds" : "wi-day-cloudy",
    "scattered clouds" : "wi-cloud",
    "broken clouds" : "wi-cloudy",
    "shower rain" : "wi-showers",
    "rain" : " wi-day-rain",
    "thunderstorm" : "wi-thunderstorm",
    "snow" : "wi-snow",
    "mist" : "wi-fog",
  };

  useEffect(() => {
    const getLocation = () => {
      return new Promise((resolve, reject) => {
        navigator.geolocation.getCurrentPosition(resolve, reject);
      });
    };

    const fetchData = async () => {
      try {
        const position = await getLocation();
        setLat(position.coords.latitude.toFixed(2));
        setLong(position.coords.longitude.toFixed(2));
        const response = await fetch(`${apiURL2}lat=${lat}&lon=${long}&units=metric&appid=${apiKey}`)
        const res = await response.json();
        const respond = await fetch(`${apiURL1}lat=${lat}&lon=${long}&units=metric&appid=${apiKey}`)
        const re = await respond.json();
        console.log(res)
        setData(res);
      } catch (error) {
        console.error('Error cannot get geolocation or fetching data:', error);
    }
  };

    fetchData();
    }, [lat, long]);  //Re-render when lat or long changes


  return (
    <> <h1 className="title">Weather</h1>
        <section className="display">
        {(typeof data.name !=='undefined') ? (<WeatherTop weatherData={data} weatherIcons={weatherIcons} />): 
        (<div></div>)}
        </section>
        {/* 
          <div className="top-container">
            <div className="icons-main">
              <i className="wi wi-day-sunny-overcast big-N" alt="sunny overcast" />
            </div>
            <div className="current-weather">
              <h2>Today:  </h2>
              <h1>
                <img className="map-icon" src="/map-pin.svg" alt="current location" />
                Phnom Penh, KH
              </h1>
              <h1 className="temperature">
                24&deg;
              </h1>
              <h1>Overcast</h1>
            </div>
          </div>
          <div className="forecast-days">Next 4 Days</div>
          <div className="day-forecast-cont">
            <div className="day-forecast-1">
              <h2> Wednesday</h2>
              <i className="wi wi-day-sunny-overcast mini-N" />
            </div>
            <div className="day-forecast-2">
              <h2>25&deg;
                Overcast
              </h2>
            </div>
          </div>
        </section> */}
    </>
  )
}

export default App;
