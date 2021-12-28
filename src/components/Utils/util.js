import React from "react";
import numeral from "numeral";
import { Circle, Popup } from "react-leaflet";

const casesTypeColors = {
    cases: {
        multiplier: 800,
        option: { color: "#cc1034", fillColor: "#cc1034" },
    },
    // half_opacity: "rgba(204, 16, 52, 0.5)",
    recovered: {
        multiplier: 1200,
        option: { color: "#7dd71d", fillColor: "#7dd71d" },
    },
    // half_opacity: "rgba(125, 215, 29, 0.5)",
    deaths: {
        multiplier: 2000,
        option: { color: "#fb4443", fillColor: "#fb4443" },
    },
    // half_opacity: "rgba(251, 68, 67, 0.5)",
};

export const sortData = (data) => {
    const sortedData = [...data];
    return sortedData.sort((a, b) => (a.cases > b.cases ? -1 : 1));
};

// Draws circles on the Map with Interactive tooltip:
export const showDataOnMap = (data, casesType = "cases") =>
    data.map((country) => {
        <Circle
            center={[country.countryInfo.lat, country.countryInfo.long]}
            fillOpacity={0.4}
            pathOptions={casesTypeColors[casesType].option}
            radius={Math.sqrt(country[casesType]) * casesTypeColors[casesType].multiplier}
        >
            <Popup>
                <h1>popup</h1>
            </Popup>
        </Circle>;
    });
