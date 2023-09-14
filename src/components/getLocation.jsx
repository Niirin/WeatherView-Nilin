import { useGeolocated } from 'react-geolocated';

const getLocation = () => {
    const { coords, isGeolocationAvailable, isGeolocationEnabled } =
  useGeolocated({
      positionOptions: {
          enableHighAccuracy: false,
      },
      userDecisionTimeout: 5000,
  });
  const location = {
    "latitude" : coords?.latitude,
    "longitude" : coords?.longitude
  }

  return (isGeolocationAvailable && isGeolocationEnabled && coords ? ( location
  ):<div>Error cannot get geolocation.</div>)

}
export default getLocation; 