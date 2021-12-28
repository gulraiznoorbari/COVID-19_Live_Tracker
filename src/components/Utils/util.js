import React from "react";
import numeral from "numeral";
import { Circle, Popup } from "react-leaflet";

const casesTypeColors = {
    cases: {
        multiplier: 400,
        option: { color: "#cc1034", fillColor: "#cc1034" },
    },
    recovered: {
        multiplier: 600,
        option: { color: "#7dd71d", fillColor: "#7dd71d" },
    },
    deaths: {
        multiplier: 1000,
        option: { color: "#fb4443", fillColor: "#fb4443" },
    },
};

export const sortData = (data) => {
    const sortedData = [...data];
    return sortedData.sort((a, b) => (a.cases > b.cases ? -1 : 1));
};

// Draws circles on the Map with Interactive tooltip:
export const showDataOnMap = (data, casesType = "cases") =>
    data.map((country) => {
        return (
            <Circle
                center={[country.countryInfo.lat, country.countryInfo.long]}
                fillOpacity={0.4}
                pathOptions={casesTypeColors[casesType].option}
                radius={Math.sqrt(country[casesType]) * casesTypeColors[casesType].multiplier}
            >
                <Popup>
                    <h1>popup</h1>
                </Popup>
            </Circle>
        );
    });
