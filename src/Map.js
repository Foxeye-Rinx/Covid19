import React, {useEffect, useRef} from 'react';
const createGoogleMap = (googleMapRef, center) => {
    new window.google.maps.Map(googleMapRef.current, {
        zoom: 7,
        center
    });
}
const createMarker = object => new window.google.maps.Marker(object);
const createScript = () => {
    const script = document.createElement('script');
    const API_KEY = 'AIzaSyBbn75QOe4WaUO3kCZN0tO-kXd2AXZs7Mw';
    script.src =
        `https://maps.googleapis.com/maps/api/js?key=${API_KEY}`;
    window.document.body.appendChild(script);
    return script;
}
// eslint-disable-next-line react/prop-types
export default function Map({lat, long}) {
    const position =  {
        lat: parseFloat(lat),lng: parseFloat(long)
    }
    const googleMapRef = useRef();
    useEffect(()=> {
        const script = createScript();
        if (!googleMapRef) {
            return;
        }
        script.addEventListener('load', () => {
            const map = createGoogleMap(googleMapRef, position);
            createMarker({
                position,
                map
            });
        });
    }, [googleMapRef]);

    return (
        <React.Fragment>
            <div
                id="google-map"
                ref={googleMapRef}
                style={{ width: '100%', height: '81vh'}}
            >
            </div>
        </React.Fragment>
    )
}