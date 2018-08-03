import React, {Fragment} from "react"; 
import Store from "../store";
import "../styles/Weather.css";

import WeatherIcon from "react-icons-weather";

function MainWeather(props) {
  const { handleOpenModal } = props;

  return (
    <div
      className="Weather--Main"
      onClick={() => handleOpenModal()}
    >
      <Store.Consumer>
        {
          store => {
            const { weatherCode, temperature } = store.currentWeather;
            const { city, countryCode } = store.location;
            const { unit } = store;

            return (
              <Fragment>
                <div className="Weather--Main__Row">
                  <WeatherIcon name="yahoo" iconId={weatherCode || "32"} />
                  <div className="temp">
                    <span>
                      {unit ? store.convertToC(temperature) : temperature}°
                    </span>
                  </div>
                </div>
                <div className="Weather--Main__Row">
                  <div className="location">
                    <span>
                      {city}{countryCode}
                    </span>
                  </div>
                </div>
              </Fragment>
            );
          }      
        }
      </Store.Consumer>
    </div>
  );
}

export default MainWeather;