import './App.css'
import './css/weather-icons.min.css' 
import { useState, useEffect } from 'react';
import axios from "axios";
import WeatherTop from "./components/WeatherTop";
import WeatherForecast from './components/WeatherForecast';
import GetLocation from './components/GetLocation';
import fetchForecastData from './components/ApiForecast';
import SearchDropDown from './components/SearchDropDown';

function App() {
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

  const [background, setBackground] = useState();
  // const [lat, setLat] = useState([]);
  // const [long, setLong]=useState([]);
  const [latLong, setLatLong]= useState({});
  const [notSearched, setNotSearched]= useState(true);
  // const forecastData = fetchForecastData();
  const [data, setData] =useState([]);

  //Let's fetch the current weather data based on geolocation:     
  const apiURL2 = import.meta.env.VITE_APP_API_URL_C;
  const apiKey = import.meta.env.VITE_APP_API_KEY;
  const currentLocation = GetLocation();


    useEffect(() => {
        const fetchData = async () => {
            try {
              if (notSearched) {
                // setLat(currentLocation["latitude"]);
                // setLong(currentLocation["longitude"]);
                // setLatLong({latitude, longitude})
              }
                const response = await fetch(`${apiURL2}lat=${currentLocation?.latitude}&lon=${currentLocation?.longitude}&units=metric&appid=${apiKey}`)
                const res = await response.json();
                setData(res);
                // console.log(lat, long);
            } catch (error) {
                console.error('Error cannot get geolocation or fetching data:', error);
            }
          };
          fetchData();
        }, [currentLocation] ); //Re-render when lat or long changes

  const handleSubmit = (cityLocation) => {
    const newLocation = cityLocation;
  }

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
      setBackground(response.data?.results[0].urls?.raw);
      return response.data.results;
  }
  if (typeof data.name !=='undefined') {
    searchImg(data.name);
  }

  }, [data.name]);

  return (
    <> <div className="container-all" style={{
      backgroundImage: `url(${background}`}} >
          <h1 className="title">WeatherView</h1>
           <section className="display">
           {(typeof data.name !=='undefined') ? (<SearchDropDown onSubmit={handleSubmit} />): 
                (<div className="title"></div>)}
              {(typeof data.name !=='undefined') ? (<WeatherTop weatherData={data} weatherIcons={weatherIcons} />): 
                (<div className="title">
                  Fetching data... &nbsp;            
                  <img src="./src/assets/loading.gif" alt="downloading data" />
                </div>)}
              {/* {(typeof forecastData.cnt !=='undefined') ? (<WeatherForecast forecastData={forecastData} weatherIcons={weatherIcons} />): 
                (<div className="title">
                  Fetching forecast data... &nbsp;
                <img src="./src/assets/loading.gif" alt="downloading data" />
                </div>)} */}
            </section>
        </div>
    </>
  )
}

export default App;
