import React from "react";

export const Footer = () => {
    return (
        <div>
            <footer>
                <h3 style={{ marginLeft: "20px" }}>Made with 💙</h3>
                <div>
                    <h1>
                        <a href="https://github.com/JD235" target="_blank">
                            <i
                                class="fa fa-github fa-lg"
                                aria-hidden="true"
                            ></i>
                        </a>
                    </h1>
                </div>
                <div className="lists" style={{ marginRight: "20px" }}>
                    <h3>Build with:</h3>
                    <ul>
                        <li>
                            <a href="https://reactjs.org/">React.js</a>
                        </li>
                        <li>
                            <a href="https://www.chartjs.org/">Chart.js</a>
                        </li>
                        <li>
                            <a href="https://leafletjs.com/">Leaflet.js</a>
                        </li>
                    </ul>
                </div>
            </footer>
        </div>
    );
};

export default Footer;
