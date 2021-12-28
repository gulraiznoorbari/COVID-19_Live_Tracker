import React from "react";
import { TileLayer, MapContainer as LeafletMap, useMap } from "react-leaflet";
import "./Map.css";
import { showDataOnMap } from "../Utils/util";

const ChangeMap = ({ center, zoom }) => {
    const map = useMap();
    map.setView(center, zoom);
    return null;
};

const Map = ({ countries, casesType, center, zoom }) => {
    return (
        <div className="map">
            <LeafletMap>
                <ChangeMap center={center} zoom={zoom} />
                <TileLayer
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                />
                {showDataOnMap(countries, casesType)}
            </LeafletMap>
        </div>
    );
};

export default Map;
