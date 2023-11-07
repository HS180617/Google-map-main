


import React, { useState } from "react";
import { GoogleMap, Marker, LoadScript } from "@react-google-maps/api";

const GoogleMapView = () => {
  const mapContainerStyle = {
    width: "100vw",
    height: "100vh",
  };

  const center = {
    lat: 12.97,
    lng: 77.59,
  };

  const [markers, setMarkers] = useState([]);
  const [labelIndex, setLabelIndex] = useState(0);
  const labels = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

  const handleMapClick = (event) => {
    const location = {
      lat: event.latLng.lat(),
      lng: event.latLng.lng(),
    };

  
    const currentDateTime = new Date();

// Get the current date in YYYY-MM-DD format
const year = currentDateTime.getFullYear();
const month = (currentDateTime.getMonth() + 1).toString().padStart(2, '0'); // Months are zero-based
const day = currentDateTime.getDate().toString().padStart(2, '0');

const dateFormatted = `${year}-${month}-${day}`;

// Get the current time in HH:MM:SS format
const hours = currentDateTime.getHours().toString().padStart(2, '0');
const minutes = currentDateTime.getMinutes().toString().padStart(2, '0');
const seconds = currentDateTime.getSeconds().toString().padStart(2, '0');

const timeFormatted = `${hours}:${minutes}:${seconds}`;

// Create a full date-time string
const dateTimeString = `${dateFormatted} ${timeFormatted}`;

const newMarker = {
  location,
  label: labels[labelIndex % labels.length],
  time:dateTimeString
};


    setMarkers((prevMarkers) => [...prevMarkers, newMarker]);
    setLabelIndex(labelIndex + 1);

    const res = fetch("https://mydemo-9d6cd-default-rtdb.firebaseio.com/newMarker.json",
  {  method:"POST",
    headers: {
      "Content-Type":"application/json"
    },
    body:JSON.stringify(newMarker)
  }
    )

    if(res){
      console.log("data stored  ")
    }else{
      alert("error occured")
    }
  };

  return (
    <LoadScript googleMapsApiKey="AIzaSyBupTshrUEAdkQksdbc7zTDH70evJqwLhM">
      <GoogleMap
        mapContainerStyle={mapContainerStyle}
        center={center}
        zoom={12}
        onClick={(event) => handleMapClick(event)}
      >
        {markers.map((marker, index) => (
          <Marker key={index} position={marker.location} label={marker.label} />
        ))}
      </GoogleMap>
    </LoadScript>
  );
};

export default GoogleMapView;