import React, { useEffect, useState } from 'react';

// Office location (latitude, longitude)
const OFFICE_LOCATION = {
  lat:  23.0424576,
  lng: 72.5123072,
};
const ALLOWED_RADIUS = 100; // meters

// Haversine distance calculator
function getDistanceInMeters(lat1:any, lon1:any, lat2:any, lon2:any) {
  const R = 6371e3;
  const φ1 = (lat1 * Math.PI) / 180;
  const φ2 = (lat2 * Math.PI) / 180;
  const Δφ = ((lat2 - lat1) * Math.PI) / 180;
  const Δλ = ((lon2 - lon1) * Math.PI) / 180;

  const a =
    Math.sin(Δφ / 2) ** 2 +
    Math.cos(φ1) * Math.cos(φ2) * Math.sin(Δλ / 2) ** 2;

  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  console.log(R * c)

  return R * c;
}

const LocationChecker = () => {
  const [status, setStatus] = useState("Checking location...");
  const [position, setPosition] = useState(null);
  console.log("Geolocation is not supported by your browser")

  useEffect(() => {
    if (!navigator.geolocation) {
      setStatus("Geolocation is not supported by your browser");
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (pos) => {
        console.log("Lat:", pos.coords.latitude);
    console.log("Lng:", pos.coords.longitude);

        const { latitude, longitude } = pos.coords;
        setPosition({ lat: latitude, lng: longitude });

        const distance = getDistanceInMeters(
          latitude,
          longitude,
          27.1578,
          77.9899
        );

        if (distance <= ALLOWED_RADIUS) {
          setStatus("✅ You are in the office.");
        } else {
          setStatus("❌ You are NOT in the office.");
        }
      },
      (error) => {
        setStatus("❗ Error getting location: " + error.message);
      }
    );
  }, []);

  return (
    <div>
      <h2>Employee Location Status</h2>
      <p>{status}</p>
      {position && (
        <p>
          Your location: {position.lat.toFixed(5)}, {position.lng.toFixed(5)}
        </p>
      )}
    </div>
  );
};

export default LocationChecker;
