// import React, { useRef } from "react";
// import { GoogleMap, Marker, LoadScript } from "@react-google-maps/api";

// const MapComponent = () => {
//   const mapContainerStyle = {
//     width: "100vw",
//     height: "100vh",
//   };

//   const center = {
//     lat: 12.97,
//     lng: 77.59,
//   };

//   const markers = useRef([]);
//   const labels = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
//   let labelIndex = 0;

//   const handleMapClick = (event) => {
//     console.log("clicked")
//     const location = {
//       lat: event.latLng.lat(),
//       lng: event.latLng.lng(),
//     };

//     markers.current.push({
//       location,
//       label: labels[labelIndex++ % labels.length],
//     });
//   };


//   return (
//     <LoadScript googleMapsApiKey="AIzaSyBupTshrUEAdkQksdbc7zTDH70evJqwLhM">
//       <GoogleMap
//         mapContainerStyle={mapContainerStyle}
//         center={center}
//         zoom={12}
//         onClick={(event) => handleMapClick(event)}
        
//       >
//         {markers.current.map((marker, index) => (
//           <Marker key={index} position={marker.location} label={marker.label} />
//         ))}
//       </GoogleMap>
//     </LoadScript>
//   );
// };

// export default MapComponent;

// import React, { useEffect, useRef } from "react";
// import { GoogleMap, Marker, LoadScript } from "@react-google-maps/api";

// const MapComponent = () => {
//   const mapContainerStyle = {
//     width: "100vw",
//     height: "100vh",
//   };

//   const center = {
//     lat: 12.97,
//     lng: 77.59,
//   };

//   const markers = useRef([]);
//   const labels = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
//   let labelIndex = 0;

//   const handleMapClick = (event) => {
//     console.log("Map Clicked"); // Check if this message appears in the console
//     const location = {
//       lat: event.latLng.lat(),
//       lng: event.latLng.lng(),
//     };

//     markers.current.push({
//       location,
//       label: labels[labelIndex++ % labels.length],
//     });

//     console.log(markers.current); // Check the contents of the markers array
//   };

 

//   return (
//     <LoadScript googleMapsApiKey="AIzaSyBupTshrUEAdkQksdbc7zTDH70evJqwLhM">
//       <GoogleMap
//         mapContainerStyle={mapContainerStyle}
//         center={center}
//         zoom={12}
//         onClick={(event) => handleMapClick(event)}
//       >
//         {markers.current.map((marker, index) => (
//           <Marker key={index} position={marker.location} label={marker.label} />
//         ))}
//       </GoogleMap>
//     </LoadScript>
//   );
// };

// export default MapComponent;

// import React, { useState } from "react";
// import { GoogleMap, Marker, LoadScript } from "@react-google-maps/api";

// const MapComponent = () => {
//   const mapContainerStyle = {
//     width: "100vw",
//     height: "100vh",
//   };

//   const center = {
//     lat: 12.97,
//     lng: 77.59,
//   };

//   const [markers, setMarkers] = useState([]);
//   const labels = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
//   let labelIndex = 0;

//   const handleMapClick = (event) => {
//     const location = {
//       lat: event.latLng.lat(),
//       lng: event.latLng.lng(),
//     };

//     const newMarker = {
//       location,
//       label: labels[labelIndex++ % labels.length],
//     };

//     setMarkers((prevMarkers) => [...prevMarkers, newMarker]);
  
//   };

//   return (
//     <LoadScript googleMapsApiKey="AIzaSyBupTshrUEAdkQksdbc7zTDH70evJqwLhM">
//       <GoogleMap
//         mapContainerStyle={mapContainerStyle}
//         center={center}
//         zoom={12}
//         onClick={(event) => handleMapClick(event)}
//       >
//         {markers.map((marker, index) => (
//           <Marker key={index} position={marker.location} label={marker.label} />
//         ))}
//       </GoogleMap>
//     </LoadScript>
//   );
// };

// export default MapComponent;


import React, { useState } from "react";
import { GoogleMap, Marker, LoadScript } from "@react-google-maps/api";

const MapComponent = () => {
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

export default MapComponent;