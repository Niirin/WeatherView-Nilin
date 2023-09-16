import { useGeolocated } from 'react-geolocated';

const GetLocation = () => {
    const { coords, isGeolocationAvailable, isGeolocationEnabled } =
  useGeolocated({
      positionOptions: {
          enableHighAccuracy: false,
      }
  });
  const location = {
    lat : coords?.latitude,
    lng : coords?.longitude
  }

  if (isGeolocationAvailable && isGeolocationEnabled && coords){
    return location;
  }

}
export default GetLocation; 
