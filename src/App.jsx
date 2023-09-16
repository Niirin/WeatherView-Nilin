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
  const [notSearched, setNotSearched]= useState(true);
  const forecastData = fetchForecastData();
  const [data, setData] =useState([]);
  const [location, setLocation]= useState({lat: 0 , lng: 0});

  //Let's fetch the current weather data based on geolocation:     
  const apiURL2 = "https://api.openweathermap.org/data/2.5/weather?";
  const apiKey = "e0b4704eaf1d4d01e8b45b83afaec54f";
  const currentLocation = GetLocation(); 
  

    useEffect(() => {
        const fetchData = async () => {
            try {
                if (notSearched && currentLocation) {
                  console.log(currentLocation?.lat, currentLocation?.lng);
                const response = await fetch(`${apiURL2}lat=${currentLocation?.lat}&lon=${currentLocation?.lng}&units=metric&appid=${apiKey}`);
                const res = await response.json();
                setData(res);
                }
                else {
                  const response = await fetch(`${apiURL2}lat=${location?.lat}&lon=${location?.lng}&units=metric&appid=${apiKey}`);
                  const res = await response.json();
                  // console.log(res);
                  setData(res);
                }
                // console.log(lat, long);
            } catch (error) {
                console.error('Error cannot get geolocation or fetching data:', error);
            }
          };
          fetchData();
        }, [currentLocation?.lat, currentLocation?.lng,location?.lat, location?.lng ] ); //Re-render when lat or long changes

  const handleSubmit = (cityLocation) => {
    const newLocat = cityLocation;
    console.log(newLocat?.lat, newLocat?.lng);
    setNotSearched(false);
    const updateLocation= () => {
      location.lat = newLocat?.lat;
      location.lng = newLocat?.lng;
      setLocation({...newLocat});
    } 
    updateLocation();
    console.log(location?.lat, location?.lng);
  }

  //Let's try to fetch picture and set background image from an API
  useEffect(() => {
    const searchImg = async (term) => {
      const response = await axios.get('https://api.unsplash.com/search/photos', {
      headers: {
          Authorization: "Client-ID -Ludp3f25IGASQheisKtmU_HdsEDIMo2zMnO_5OsXp8",
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
           {(typeof data.name !=='undefined' && currentLocation) ? (<SearchDropDown onSubmit={handleSubmit}  />): 
                (<div className="title"></div>)}
              {(typeof data.name !=='undefined' && currentLocation) ? (<WeatherTop weatherData={data} weatherIcons={weatherIcons} />): 
                (<div className="title">
                  Fetching data... &nbsp;          
                  <img src="./loading.gif" alt="downloading data" />
                </div>)}
              {(typeof forecastData.cnt !=='undefined' && currentLocation) ? (<WeatherForecast forecastData={forecastData} weatherIcons={weatherIcons} />): 
                (<div className="title">
                  Fetching forecast data... &nbsp;
                <img src="./loading.gif" alt="downloading data" />
                </div>)}
            </section>
        </div>
    </>
  )
}

export default App;
