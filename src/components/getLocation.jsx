import { useGeolocated } from 'react-geolocated';

const GetLocation = () => {
    const { coords, isGeolocationAvailable, isGeolocationEnabled } =
  useGeolocated({
      positionOptions: {
          enableHighAccuracy: false,
      }
  });
  const location = {
    latitude : coords?.latitude,
    longitude : coords?.longitude
  }

  return (isGeolocationAvailable && isGeolocationEnabled && coords ? ( location
  ):<div>Error cannot get geolocation.</div>)

}
export default GetLocation; 