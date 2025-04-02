import { useEffect, useState } from "react";
import { GoogleMap, Marker, useLoadScript } from "@react-google-maps/api";
import './maps.css'

const libraries = ["places"];
const mapContainerStyle = {
    width: "100%",
    height: "100vh",
    borderRadius: "30px",
    border: "6px solid #fff"
};
const options = {
    disableDefaultUI: true,
    zoomControl: true,
};

const CinemaMap = () => {
    const [cinemas, setCinemas] = useState([]);
    const [userLocation, setUserLocation] = useState(null);
    const { isLoaded, loadError } = useLoadScript({
        googleMapsApiKey: "AIzaSyD85ytUYgqLzeAnkFmHVnZXPonN70kRujo", // Remplace par ta clé API
        libraries,
    });

    useEffect(() => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    const { latitude, longitude } = position.coords;
                    setUserLocation({ lat: latitude, lng: longitude });

                    const service = new window.google.maps.places.PlacesService(
                        document.createElement("div")
                    );

                    service.nearbySearch(
                        {
                            location: { lat: latitude, lng: longitude },
                            radius: 5000,
                            type: "movie_theater",
                        },
                        (results, status) => {
                            if (status === window.google.maps.places.PlacesServiceStatus.OK) {
                                setCinemas(results);
                            }
                        }
                    );
                },
                (error) => console.error("Erreur de géolocalisation", error)
            );
        }
    }, []);

    if (loadError) return <p>Erreur de chargement de la carte</p>;
    if (!isLoaded) return <p>Chargement...</p>;

    return (
        <div className="maps section">
            <div className="maps__presentation">
                <h1 className="title">Découvrez les cinémas <br /> autour de chez vous</h1>
            </div>
            <GoogleMap
                mapContainerStyle={mapContainerStyle}
                zoom={14}
                center={userLocation}
                options={options}
            >
                {userLocation && <Marker position={userLocation} label="Vous" />}
                {cinemas.map((cinema) => (
                    <Marker key={cinema.place_id} position={cinema.geometry.location} />
                ))}
            </GoogleMap>
        </div>

    );
};

export default CinemaMap;
