import React, { useState } from "react";
import { MapContainer as LeafletMap, TileLayer } from "react-leaflet";
import { showDataOnMap } from "./util";

function Map({ countries, casesType, center, zoom }) {
    // console.log(countriesName);
    const [map, setmap] = useState(null);
    if (map) {
        map.flyTo(center, zoom);
    }
    return (
        <div className="map">
            <LeafletMap center={center} zoom={zoom} whenCreated={setmap}>
                <TileLayer
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                />
                {showDataOnMap(countries, casesType)}
            </LeafletMap>
        </div>
    );
}

export default Map;
