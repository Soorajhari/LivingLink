import React, { useEffect, useState } from "react";
import axios from "axios";
// import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
// import { Icon } from 'leaflet';

const Location = () => {
  const [userLocation, setUserLocation] = useState<{latitude:number,longitude:number}|null>(null);
  const [locationName, setLocationName] = useState("");


  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
            console.log(position);
          const latitude = position.coords.latitude;
          console.log(latitude);
          const longitude = position.coords.longitude;

          setUserLocation({ latitude, longitude });
        },
        (error) => {
          console.error(error);
        }
      );
    } else {
      console.error("Geolocation is not supported");
    }
   
    if (userLocation) {
      reverseGeocode(userLocation.latitude, userLocation.longitude);
      
    }
  }, []);


  // console.log(userLocation?.latitude)
  // console.log(userLocation?.longitude)
  const reverseGeocode = async (latitude:number, longitude:number) => {
    // const apiKey = "AIzaSyA3ho0ELAGxIN2nI1ZIc80uii7roQKRf4A1";
    // // const apiUrl = `https://api.opencagedata.com/geocode/v1/json?key=${apiKey}&q=${latitude}+${longitude}&pretty=1`;
    // const apiUrl =`https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},-${longitude}&key=${apiKey}`
    // // const apiUrl = `https://api.opencagedata.com/geocode/v1/json?key=${apiKey}&q=52.3877830%2C9.7334394&pretty=1`;
    const response = await axios.get(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`)
     console.log(response.data)
    if (response.data && response.data.address) {
      return response.data.address;
    } else {
      throw new Error('No results found');
    }
  };
  return <div></div>;
};

export default Location;
