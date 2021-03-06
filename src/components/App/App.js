import React, { useState, useEffect } from "react";
import { FormControl, MenuItem, Select, Card, CardContent } from "@mui/material";
import axios from "axios";
import InfoBox from "../InfoBox/InfoBox";
import Map from "../Map/Map";
import Table from "../Table/Table";
import LineGraph from "../LineGraph/LineGraph";
import { printStats, sortData } from "../Utils/util";
import "leaflet/dist/leaflet.css";
import "./App.css";

/* 
    Used BEM Naming convention throughout the project.
    Syntax: component name__element 
    http://getbem.com/naming/ 
*/

function App() {
    const [countries, setCountries] = useState([]);
    const [country, setCountry] = useState("worldwide");
    const [countryInfo, setCountryInfo] = useState({});
    const [tableData, setTableData] = useState([]);
    const [mapCenter, setMapCenter] = useState({ lat: 34.80746, lng: -40.4796 });
    const [mapZoom, setMapZoom] = useState(3);
    const [mapCountries, setMapCountries] = useState([]);
    const [casesType, setCasesType] = useState("cases");

    useEffect(() => {
        const getDataOnFirstLoad = async () => {
            const countryInfo = await axios.get("https://disease.sh/v3/covid-19/all");
            setCountryInfo(countryInfo.data);
        };
        getDataOnFirstLoad();
    }, []);

    useEffect(() => {
        const getCountries = async () => {
            try {
                const response = await axios.get("https://disease.sh/v3/covid-19/countries");
                const countries = await response.data.map((country) => {
                    return {
                        name: country.country,
                        value: country.countryInfo.iso3,
                    };
                });

                const sortedData = sortData(response.data);
                setCountries(countries);
                setMapCountries(response.data);
                setTableData(sortedData);
            } catch (error) {
                console.log(error);
            }
        };
        getCountries();
    }, []);

    const onCountryChange = async (event) => {
        const countryCode = event.target.value;

        const url =
            countryCode === "worldwide"
                ? "https://disease.sh/v3/covid-19/all"
                : `https://disease.sh/v3/covid-19/countries/${countryCode}`;

        try {
            const countryData = await axios.get(url);
            const data = countryData.data;

            setCountry(countryCode);
            setCountryInfo(data);
            setMapCenter(
                countryCode === "worldwide"
                    ? { lat: 34.80746, lng: -40.4796 }
                    : [data.countryInfo.lat, data.countryInfo.long],
            );
            setMapZoom(countryCode === "worldwide" ? 3 : 4);
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div className="app">
            <div className="app__leftCol">
                <div className="app__header">
                    <h1>COVID-19 Live Tracker</h1>
                    <FormControl className="app__dropdown">
                        <Select variant="outlined" value={country} onChange={onCountryChange}>
                            <MenuItem value="worldwide">Worldwide</MenuItem>
                            {countries.map((country, index) => {
                                return (
                                    <MenuItem value={country.value} key={index}>
                                        {country.name}
                                    </MenuItem>
                                );
                            })}
                        </Select>
                    </FormControl>
                </div>
                <div className="app__stats">
                    <InfoBox
                        isRed
                        active={casesType === "cases"}
                        onClick={(e) => setCasesType("cases")}
                        title="Coronavirus Cases"
                        cases={printStats(countryInfo.todayCases)}
                        total={printStats(countryInfo.cases)}
                    />
                    <InfoBox
                        active={casesType === "recovered"}
                        onClick={(e) => setCasesType("recovered")}
                        title="Recovered"
                        cases={printStats(countryInfo.todayRecovered)}
                        total={printStats(countryInfo.recovered)}
                    />
                    <InfoBox
                        isRed
                        active={casesType === "deaths"}
                        onClick={(e) => setCasesType("deaths")}
                        title="Deaths"
                        cases={printStats(countryInfo.todayDeaths)}
                        total={printStats(countryInfo.deaths)}
                    />
                </div>
                <Map
                    casesType={casesType}
                    countries={mapCountries}
                    center={mapCenter}
                    zoom={mapZoom}
                />
            </div>
            <Card className="app__rightCol">
                <CardContent>
                    <h3>Live Cases by Country</h3>
                    <Table countries={tableData} />
                    <h3 className="graph--heading">Worldwide new {casesType}</h3>
                    <LineGraph className="app__graph" casesType={casesType} />
                </CardContent>
            </Card>
        </div>
    );
}

export default App;
