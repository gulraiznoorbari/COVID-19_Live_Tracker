import React, { useState, useEffect } from "react";
import { FormControl, MenuItem, Select } from "@mui/material";
import "./App.css";
import axios from "axios";

/* 
    Used BEM Naming convention throughout the project.
    Syntax: component name__element 
    http://getbem.com/naming/ 
*/

function App() {
    const [countries, setCountries] = useState([]);
    const [country, setCountry] = useState("Worldwide");

    useEffect(() => {
        const getCountries = async () => {
            const response = await axios.get("https://disease.sh/v3/covid-19/countries");
            const countries = response.data.map((country) => {
                return {
                    name: country.country,
                    value: country.countryInfo.iso3,
                    id: country.countryInfo._id,
                };
            });
            setCountries(countries);
        };
        getCountries();
    }, []);

    const onCountryChange = async (event) => {
        const countryCode = event.target.value;
        setCountry(countryCode);
    };

    return (
        <div className="app">
            <div className="app__header">
                <h1>COVID-19 Tracker</h1>
                <FormControl className="app__dropdown">
                    <Select variant="outlined" value={country} onChange={onCountryChange}>
                        <MenuItem value="Worldwide">Worldwide</MenuItem>
                        {countries.map((country) => {
                            return (
                                <MenuItem value={country.value} key={country.id}>
                                    {country.name}
                                </MenuItem>
                            );
                        })}
                    </Select>
                </FormControl>
            </div>
            <div className="app__stats"></div>
        </div>
    );
}

export default App;
