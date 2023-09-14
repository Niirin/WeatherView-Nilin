import './App.css'
import './css/weather-icons.min.css' 
import { useState, useEffect } from 'react';
import axios from "axios";
import WeatherTop from "./components/WeatherTop";
import WeatherForecast from './components/WeatherForecast';
import fetchCurrentData from './components/ApiCurrent';
import fetchForecastData from './components/ApiForecast';

function App() {
  const [background, setBackground] = useState();
  const data = fetchCurrentData(); 
  const forecastData = fetchForecastData();

  const weatherIcons = {
    //Main
    "clear" : "wi-day-sunny",
    "smoke": "wi-smoke",
    "haze" : "wi-dust",
    "dust" : "wi-dust",
    "fog" : "wi-fog",
    "sand" : "wi-sandstorm",
    "ash" : "wi-volcano",
    "squails" : "wi-dust",
    "tornado" : "wi-tornado",
    "drizzle" : "wi-showers",
    "rain" : " wi-day-rain",
    "thunderstorm" : "wi-thunderstorm",
    //Description for main display
    "few clouds" : "wi-day-cloudy",
    "scattered clouds" : "wi-cloud",
    "broken clouds" : "wi-cloudy",
    "overcast clouds": "wi-cloudy",
    "clouds" : "wi-cloudy"
  };

  //Let's try to fetch picture and set background image from an API
  useEffect(() => {
    const searchImg = async (term) => {
      const response = await axios.get('https://api.unsplash.com/search/photos', {
      headers: {
          Authorization: import.meta.env.VITE_UNSPLASH_KEY,
      }, 
      params: {
          query: term,
      }
      });
      // console.log(response.data.results);
            setBackground(response.data?.results[0].urls?.raw);
      return response.data.results;
  }
  if (typeof data.name !=='undefined') {
    searchImg(data.name);
  }

  });

  


  return (
    <> <div className="container-all" style={{
      backgroundImage: `url(${background})`}} >
          <h1 className="title">Weather</h1>
           <section className="display">
              {(typeof data.name !=='undefined') ? (<WeatherTop weatherData={data} weatherIcons={weatherIcons} />): 
                (<div className="title">
                  Fetching data... &nbsp;            
                  <i className="wi wi-cloud-down" alt="downloading data" />
                </div>)}
              {(typeof forecastData.cnt !=='undefined') ? (<WeatherForecast forecastData={forecastData} weatherIcons={weatherIcons} />): 
                (<div className="title">
                  Fetching forecast data... &nbsp;
                <i className="wi wi-cloud-down" alt="downloading data" />
                </div>)}
            </section>
        </div>
    </>
  )
}

export default App;
