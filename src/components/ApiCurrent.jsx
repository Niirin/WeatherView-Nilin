import { useState, useEffect } from 'react';
import getLocation from './getLocation';

const fetchCurrentData = () => {
    const [data, setData] = useState([]);
    const apiURL2 = import.meta.env.VITE_APP_API_URL_C;
    const apiKey = import.meta.env.VITE_APP_API_KEY;
    const location = getLocation();
    const lat = (location["latitude"]);
    const long = (location["longitude"]);

    useEffect(() => {
    const fetchData = async () => {
        try {
            const response = await fetch(`${apiURL2}lat=${lat}&lon=${long}&units=metric&appid=${apiKey}`)
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

export default fetchCurrentData;