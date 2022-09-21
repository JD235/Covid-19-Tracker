import {
    Card,
    CardContent,
    FormControl,
    MenuItem,
    Select,
} from "@material-ui/core";
import { useEffect, useState } from "react";
import "./App.css";
import InfoBox from "./InfoBox";
import Table from "./Table";
import Map from "./Map";
import "leaflet/dist/leaflet.css";
import { prettyPrintStat, sortData } from "./util";
import LineGraph from "./LineGraph";
import Footer from "./Footer";

function App() {
    const [countries, setCountries] = useState([]);
    const [country, setCountry] = useState("worldwide");
    const [countryInfo, setCountryInfo] = useState({});
    const [tableData, setTableData] = useState([]);
    const [mapCenter, setMapCenter] = useState({
        lat: 34.80746,
        lng: -40.4796,
    });
    const [mapZoom, setMapZoom] = useState(3);
    const [mapCountries, setMapCountries] = useState([]);
    const [casesType, setCasesType] = useState("cases");

    useEffect(() => {
        getCountriesData();
        getAllCountriesData();
    }, []);

    const getAllCountriesData = async () => {
        const response = await fetch("https://disease.sh/v3/covid-19/all");
        const data = await response.json();
        setCountryInfo(data);
    };

    const getCountriesData = async () => {
        const response = await fetch(
            "https://disease.sh/v3/covid-19/countries"
        );
        const data = await response.json();
        setCountries(
            data.map((country) => ({
                name: country.country,
                value: country.countryInfo.iso2,
            }))
        );
        const sortedData = sortData(data);
        setTableData(sortedData);
        setMapCountries(data);
    };

    const onCountryChange = async (e) => {
        const countryCode = e.target.value;
        setCountry(countryCode);
        console.log(e.target.value + " gand");
        const url =
            countryCode === "worldwide"
                ? "https://disease.sh/v3/covid-19/all"
                : `https://disease.sh/v3/covid-19/countries/${countryCode}`;

        await fetch(url)
            .then((response) => response.json())
            .then((data) => {
                setCountry(countryCode);
                //All the data from the country response
                setCountryInfo(data);
                const worldwideLatLng = {
                    lat: 34.80746,
                    lng: -40.4796,
                };
                setMapCenter(
                    countryCode === "worldwide"
                        ? worldwideLatLng
                        : [data.countryInfo.lat, data.countryInfo.long]
                );
                console.log(data.countryInfo + " --- " + countryCode);
                setMapZoom(countryCode === "worldwide" ? 3 : 4);
            });
    };

    return (
        <div className="main">
            <div className="app">
                <div className="app__left">
                    <div className="app__header">
                        <div className="covid">
                            <h1>
                                COVID-19
                                <span>
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        width="50"
                                        height="40"
                                        viewBox="0 0 145 145"
                                    >
                                        <g
                                            id="covid"
                                            transform="translate(-10 -5)"
                                        >
                                            <ellipse
                                                id="Ellipse_1"
                                                data-name="Ellipse 1"
                                                cx="46"
                                                cy="45"
                                                rx="46"
                                                ry="45"
                                                transform="translate(30 30)"
                                                fill="#ffb8a5"
                                            />
                                            <path
                                                id="Path_6"
                                                data-name="Path 6"
                                                d="M71.765,13.822A46.026,46.026,0,0,1,13.476,68.01,46.041,46.041,0,1,0,71.765,13.822Z"
                                                transform="translate(17.069 17.409)"
                                                fill="#ffa68e"
                                            />
                                            <path
                                                id="Path_7"
                                                data-name="Path 7"
                                                d="M28.114,76.4c1-2.143,4.828-3.742,9.419-3.742s8.416,1.6,9.419,3.742L44.7,67.383a77.629,77.629,0,0,1-2.315-18.811v-.148A2.424,2.424,0,0,0,39.957,46H35.109a2.424,2.424,0,0,0-2.424,2.424v.148a77.62,77.62,0,0,1-2.314,18.807Z"
                                                transform="translate(37.911 63.225)"
                                                fill="#ff7956"
                                            />
                                            <path
                                                id="Path_8"
                                                data-name="Path 8"
                                                d="M41.347,58.885l1.13,6.7a11.77,11.77,0,0,1,6.263-7.272,11.753,11.753,0,0,1,9.431-1.789l-5.238-4.3a57.662,57.662,0,0,1-5.211-4.8A42.739,42.739,0,0,1,39.82,52a65.711,65.711,0,0,1,1.527,6.884Z"
                                                transform="translate(54.578 65.247)"
                                                fill="#ff5023"
                                            />
                                            <path
                                                id="Path_9"
                                                data-name="Path 9"
                                                d="M57.635,44,64,46.375a11.782,11.782,0,0,1-3.156-9.053,11.751,11.751,0,0,1,3.168-9.06l-6.358,2.375a57.228,57.228,0,0,1-6.763,2.114,42.786,42.786,0,0,1,.017,9.135A65.451,65.451,0,0,1,57.635,44Z"
                                                transform="translate(70.346 37.969)"
                                                fill="#ff5023"
                                            />
                                            <path
                                                id="Path_10"
                                                data-name="Path 10"
                                                d="M14.073,44,7.71,46.375a11.782,11.782,0,0,0,3.151-9.053,11.751,11.751,0,0,0-3.168-9.06l6.358,2.375a57.229,57.229,0,0,0,6.763,2.114,42.786,42.786,0,0,0-.017,9.135A65.438,65.438,0,0,0,14.073,44Z"
                                                transform="translate(8.834 37.969)"
                                                fill="#ff5023"
                                            />
                                            <path
                                                id="Path_11"
                                                data-name="Path 11"
                                                d="M16.614,56.515a11.79,11.79,0,0,1,9.419,1.8A11.751,11.751,0,0,1,32.3,65.582l1.12-6.695a57.666,57.666,0,0,1,1.549-6.906,44.357,44.357,0,0,1-7.914-4.552,65.441,65.441,0,0,1-5.194,4.763Z"
                                                transform="translate(21.537 65.261)"
                                                fill="#ff5023"
                                            />
                                            <path
                                                id="Path_12"
                                                data-name="Path 12"
                                                d="M33.433,15.786l-1.13-6.7a11.782,11.782,0,0,1-6.263,7.259,11.753,11.753,0,0,1-9.431,1.789l5.238,4.317a57.662,57.662,0,0,1,5.211,4.8,42.74,42.74,0,0,1,7.9-4.581,65.713,65.713,0,0,1-1.527-6.884Z"
                                                transform="translate(21.529 10.666)"
                                                fill="#ff5023"
                                            />
                                            <path
                                                id="Path_13"
                                                data-name="Path 13"
                                                d="M47.734,27.238a65.443,65.443,0,0,1,5.194-4.763l5.238-4.327a11.79,11.79,0,0,1-9.419-1.8,11.751,11.751,0,0,1-6.263-7.272l-1.12,6.692a57.6,57.6,0,0,1-1.549,6.908,44.356,44.356,0,0,1,7.914,4.552Z"
                                                transform="translate(54.571 10.658)"
                                                fill="#ff5023"
                                            />
                                            <path
                                                id="Path_14"
                                                data-name="Path 14"
                                                d="M37.533,9.2c-4.591,0-8.416-1.6-9.419-3.742l2.257,9.022a77.628,77.628,0,0,1,2.315,18.811v.148a2.424,2.424,0,0,0,2.424,2.424h4.848a2.424,2.424,0,0,0,2.424-2.424v-.148a77.62,77.62,0,0,1,2.314-18.807l2.258-9.026C45.949,7.6,42.124,9.2,37.533,9.2Z"
                                                transform="translate(37.911 5.497)"
                                                fill="#ff7956"
                                            />
                                            <path
                                                id="Path_15"
                                                data-name="Path 15"
                                                d="M15.019,25.392c-2.3,3.978-5.594,6.489-7.95,6.285l8.942,2.56a77.5,77.5,0,0,1,17.452,7.4l.128.073a2.424,2.424,0,0,0,3.311-.887l2.424-4.2a2.424,2.424,0,0,0-.887-3.311l-.128-.073A77.709,77.709,0,0,1,23.175,21.829L16.49,15.362C17.843,17.3,17.324,21.414,15.019,25.392Z"
                                                transform="translate(7.946 19.602)"
                                                fill="#ff7956"
                                            />
                                            <path
                                                id="Path_16"
                                                data-name="Path 16"
                                                d="M15.019,54.276c2.3,3.978,2.824,8.088,1.469,10.03l6.685-6.467A77.708,77.708,0,0,1,38.308,46.428l.128-.073a2.424,2.424,0,0,0,.887-3.311l-2.424-4.2a2.424,2.424,0,0,0-3.311-.887l-.128.073a77.5,77.5,0,0,1-17.452,7.4l-8.939,2.56c2.356-.2,5.65,2.307,7.95,6.285Z"
                                                transform="translate(7.946 51.313)"
                                                fill="#ff7956"
                                            />
                                            <path
                                                id="Path_17"
                                                data-name="Path 17"
                                                d="M68.12,54.276c2.3-3.978,5.594-6.489,7.95-6.285l-8.942-2.56a77.5,77.5,0,0,1-17.452-7.4l-.128-.073a2.424,2.424,0,0,0-3.311.887l-2.424,4.2a2.424,2.424,0,0,0,.887,3.311l.128.073A77.709,77.709,0,0,1,59.964,57.839l6.685,6.467c-1.353-1.942-.834-6.052,1.471-10.03Z"
                                                transform="translate(59.802 51.313)"
                                                fill="#ff7956"
                                            />
                                            <path
                                                id="Path_18"
                                                data-name="Path 18"
                                                d="M68.119,25.392c-2.3-3.978-2.824-8.088-1.469-10.03l-6.685,6.467A77.709,77.709,0,0,1,44.831,33.24l-.128.073a2.424,2.424,0,0,0-.887,3.311l2.424,4.2a2.424,2.424,0,0,0,3.311.887l.128-.073a77.5,77.5,0,0,1,17.452-7.4l8.942-2.56c-2.358.2-5.652-2.308-7.953-6.285Z"
                                                transform="translate(59.804 19.602)"
                                                fill="#ff7956"
                                            />
                                            <g
                                                id="Group_1"
                                                data-name="Group 1"
                                                transform="translate(12.355 5)"
                                            >
                                                <path
                                                    id="Path_19"
                                                    data-name="Path 19"
                                                    d="M37.7,3C32.341,3,28,5.181,28,7.848a2.606,2.606,0,0,0,.276,1.105C29.28,11.1,33.1,12.7,37.7,12.7s8.416-1.6,9.419-3.742a2.606,2.606,0,0,0,.276-1.105C47.391,5.181,43.05,3,37.7,3Z"
                                                    transform="translate(25.393 -3)"
                                                    fill="#ed1c24"
                                                />
                                                <path
                                                    id="Path_20"
                                                    data-name="Path 20"
                                                    d="M8.184,21.211c-2.666,4.637-2.967,9.482-.65,10.82a2.606,2.606,0,0,0,1.1.313c2.356.2,5.655-2.308,7.95-6.285s2.824-8.088,1.469-10.03a2.6,2.6,0,0,0-.819-.79c-2.317-1.338-6.367,1.336-9.046,5.972Z"
                                                    transform="translate(-5.97 13.935)"
                                                    fill="#ed1c24"
                                                />
                                                <path
                                                    id="Path_21"
                                                    data-name="Path 21"
                                                    d="M8.185,53.046c2.678,4.637,6.729,7.31,9.046,5.972a2.6,2.6,0,0,0,.819-.79c1.355-1.939.829-6.06-1.469-10.03s-5.594-6.489-7.95-6.285a2.606,2.606,0,0,0-1.1.313c-2.317,1.338-2.026,6.183.65,10.82Z"
                                                    transform="translate(-5.972 52.391)"
                                                    fill="#ed1c24"
                                                />
                                                <path
                                                    id="Path_22"
                                                    data-name="Path 22"
                                                    d="M37.7,66.7c5.354,0,9.7-2.181,9.7-4.848a2.606,2.606,0,0,0-.276-1.105C46.111,58.6,42.286,57,37.7,57s-8.416,1.6-9.419,3.742A2.606,2.606,0,0,0,28,61.848C28,64.526,32.341,66.7,37.7,66.7Z"
                                                    transform="translate(25.393 73.888)"
                                                    fill="#ed1c24"
                                                />
                                                <path
                                                    id="Path_23"
                                                    data-name="Path 23"
                                                    d="M63.343,53.047c2.666-4.637,2.967-9.482.65-10.82a2.605,2.605,0,0,0-1.1-.313c-2.356-.2-5.655,2.307-7.95,6.285s-2.824,8.088-1.469,10.03a2.6,2.6,0,0,0,.819.79c2.317,1.338,6.367-1.336,9.046-5.972Z"
                                                    transform="translate(60.621 52.391)"
                                                    fill="#ed1c24"
                                                />
                                                <path
                                                    id="Path_24"
                                                    data-name="Path 24"
                                                    d="M63.343,21.211c-2.678-4.637-6.729-7.31-9.046-5.972a2.6,2.6,0,0,0-.819.79c-1.355,1.939-.829,6.06,1.469,10.03s5.594,6.489,7.95,6.285a2.606,2.606,0,0,0,1.1-.313c2.317-1.338,2.026-6.183-.65-10.82Z"
                                                    transform="translate(60.62 13.935)"
                                                    fill="#ed1c24"
                                                />
                                                <ellipse
                                                    id="Ellipse_2"
                                                    data-name="Ellipse 2"
                                                    cx="10.5"
                                                    cy="5.5"
                                                    rx="10.5"
                                                    ry="5.5"
                                                    transform="translate(52.645 65)"
                                                    fill="#ed1c24"
                                                />
                                            </g>
                                            <path
                                                id="Path_25"
                                                data-name="Path 25"
                                                d="M49.348,41.059c2.666-4.637,2.967-9.482.65-10.82s-6.37,1.336-9.046,5.972-2.969,9.482-.65,10.82S46.67,45.7,49.348,41.059Z"
                                                transform="translate(53.037 40.293)"
                                                fill="#d80027"
                                            />
                                            <path
                                                id="Path_26"
                                                data-name="Path 26"
                                                d="M33.031,9.268c-1.338-2.317-6.183-2.026-10.82.65s-7.31,6.729-5.972,9.046A2.812,2.812,0,0,0,17.627,20.1a11.753,11.753,0,0,0,9.431-1.789,11.782,11.782,0,0,0,6.263-7.259,2.836,2.836,0,0,0-.291-1.786Z"
                                                transform="translate(20.511 8.697)"
                                                fill="#d80027"
                                            />
                                            <path
                                                id="Path_27"
                                                data-name="Path 27"
                                                d="M11.544,28.642A2.824,2.824,0,0,0,9.848,28C7.181,28,5,32.341,5,37.7s2.169,9.7,4.848,9.7a2.841,2.841,0,0,0,1.682-.635A11.758,11.758,0,0,0,14.7,37.7,11.782,11.782,0,0,0,11.544,28.642Z"
                                                transform="translate(5 37.596)"
                                                fill="#ed1c24"
                                            />
                                            <ellipse
                                                id="Ellipse_3"
                                                data-name="Ellipse 3"
                                                cx="5"
                                                cy="10"
                                                rx="5"
                                                ry="10"
                                                transform="translate(47 65)"
                                                fill="#ed1c24"
                                            />
                                            <path
                                                id="Path_28"
                                                data-name="Path 28"
                                                d="M27.059,53.157a11.79,11.79,0,0,0-9.419-1.8,2.833,2.833,0,0,0-1.4,1.146c-1.338,2.317,1.336,6.367,5.972,9.046s9.482,2.967,10.82.65a2.833,2.833,0,0,0,.291-1.774,11.751,11.751,0,0,0-6.263-7.272Z"
                                                transform="translate(20.511 70.415)"
                                                fill="#ed1c24"
                                            />
                                            <path
                                                id="Path_29"
                                                data-name="Path 29"
                                                d="M58.021,52.507a2.826,2.826,0,0,0-1.389-1.139A11.753,11.753,0,0,0,47.2,53.157a11.77,11.77,0,0,0-6.263,7.272,2.836,2.836,0,0,0,.291,1.786c1.338,2.317,6.183,2.026,10.82-.65S59.359,54.824,58.021,52.507Z"
                                                transform="translate(56.117 70.415)"
                                                fill="#ed1c24"
                                            />
                                            <path
                                                id="Path_30"
                                                data-name="Path 30"
                                                d="M59.872,28a2.841,2.841,0,0,0-1.682.635,11.758,11.758,0,0,0-3.166,9.06,11.79,11.79,0,0,0,3.151,9.053,2.836,2.836,0,0,0,1.7.642c2.666,0,4.848-4.341,4.848-9.7S62.551,28,59.872,28Z"
                                                transform="translate(76.168 37.596)"
                                                fill="#ed1c24"
                                            />
                                            <path
                                                id="Path_31"
                                                data-name="Path 31"
                                                d="M52.048,9.916c-4.637-2.666-9.482-2.967-10.82-.65a2.833,2.833,0,0,0-.291,1.774A11.751,11.751,0,0,0,47.2,18.312a11.79,11.79,0,0,0,9.419,1.8,2.833,2.833,0,0,0,1.4-1.146c1.338-2.317-1.336-6.367-5.972-9.046Z"
                                                transform="translate(56.117 8.699)"
                                                fill="#ed1c24"
                                            />
                                            <path
                                                id="Path_32"
                                                data-name="Path 32"
                                                d="M44.059,22.916c-4.637-2.666-9.482-2.967-10.82-.65s1.336,6.37,5.972,9.046,9.482,2.969,10.82.65S48.7,25.594,44.059,22.916Z"
                                                transform="translate(44.716 27.209)"
                                                fill="#ed1c24"
                                            />
                                            <ellipse
                                                id="Ellipse_4"
                                                data-name="Ellipse 4"
                                                cx="7.5"
                                                cy="5"
                                                rx="7.5"
                                                ry="5"
                                                transform="translate(80 94)"
                                                fill="#d80027"
                                            />
                                            <ellipse
                                                id="Ellipse_5"
                                                data-name="Ellipse 5"
                                                cx="6.5"
                                                cy="4.5"
                                                rx="6.5"
                                                ry="4.5"
                                                transform="translate(57 90)"
                                                fill="#d80027"
                                            />
                                            <path
                                                id="Path_33"
                                                data-name="Path 33"
                                                d="M28.58,21.84c-2.344,1.294-5.316,5.415-4.021,7.756s6.367,2.021,8.709.727,5.316-5.415,4.021-7.756S30.924,20.544,28.58,21.84Z"
                                                transform="translate(32.401 27.395)"
                                                fill="#ed1c24"
                                            />
                                        </g>
                                    </svg>
                                </span>
                                TRACKER
                            </h1>
                        </div>
                        <FormControl className="app__dropdown">
                            <Select
                                variant="outlined"
                                onChange={onCountryChange}
                                value={country}
                            >
                                <MenuItem value="worldwide">Worldwide</MenuItem>
                                {countries.map((country) => (
                                    <MenuItem value={country.value}>
                                        {country.name}
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                    </div>

                    <div className="app__stats">
                        <InfoBox
                            infoBox__casess
                            isRed
                            active={casesType === "cases"}
                            onClick={(e) => setCasesType("cases")}
                            title="Coronavirus cases"
                            cases={prettyPrintStat(countryInfo.todayCases)}
                            total={prettyPrintStat(countryInfo.cases)}
                        />
                        <InfoBox
                            className="infoBox__recovered"
                            active={casesType === "recovered"}
                            onClick={(e) => setCasesType("recovered")}
                            title="Recovered"
                            cases={prettyPrintStat(countryInfo.todayRecovered)}
                            total={prettyPrintStat(countryInfo.recovered)}
                        />
                        <InfoBox
                            className="infoBox__deaths"
                            isRed
                            active={casesType === "deaths"}
                            onClick={(e) => setCasesType("deaths")}
                            title="Deaths"
                            cases={prettyPrintStat(countryInfo.todayDeaths)}
                            total={prettyPrintStat(countryInfo.deaths)}
                        />
                    </div>
                    <Map
                        casesType={casesType}
                        center={mapCenter}
                        zoom={mapZoom}
                        countries={mapCountries}
                        countriesName={countries}
                    />
                </div>
                <Card className="app__right">
                    <CardContent>
                        <h3>Total Cases by Country</h3>
                        <Table countries={tableData} />
                        <h3 className="app__graphTitle">
                            Worldwide new {casesType}
                        </h3>
                        <LineGraph
                            className="app__graph"
                            casesType={casesType}
                        />
                    </CardContent>
                </Card>
            </div>
            <Footer />
        </div>
    );
}

export default App;
