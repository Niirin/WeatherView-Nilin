import { useState, useEffect } from 'react';
import GetLocation from './getLocation';

const fetchForecastData = () => {
    const [data, setData] = useState([]);
    const apiURL1 = import.meta.env.VITE_APP_API_URL_F;
    const apiKey = import.meta.env.VITE_APP_API_KEY;
    const location = GetLocation();
    const lat = (location?.lat);
    const long = (location?.lng);

    useEffect(() => {
    const fetchData = async () => {
        try {
            const response = await fetch(`${apiURL1}lat=${lat}&lon=${long}&units=metric&appid=${apiKey}`)
            const res = await response.json();
            // console.log(res);
            setData(res);
        } catch (error) {
            console.error('Error cannot get geolocation or fetching data:', error);
        }
      };
      fetchData();
    }, [lat, long] ); //Re-render when lat or long changes
    return data; 
}

export default fetchForecastData;