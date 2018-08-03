import React, { Fragment } from "react";
import Store from "../store";
import "../styles/Weather.css";

import WeatherIcon from "react-icons-weather";
import { FaPencil, FaLocationArrow } from "react-icons/lib/fa";
import Modal from "react-modal";

class WeatherModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      editLocation: false,
      day: null,
      selected: null
    };
  }

  handleEditLocation = () => {
    this.setState({ editLocation: !this.state.editLocation });
  }

  handleDisplay = (e) => {
    const day = e.currentTarget.dataset.key;
    this.setState({ selected: day, day });
  }

  render() {
    const { isActive, handleCloseModal } = this.props;
    const { editLocation, day } = this.state;

    return (
      <Modal
        className="Weather--Modal"
        overlayClassName="Overlay"
        isOpen={isActive}
        onRequestClose={() => handleCloseModal()}
      >
        <Store.Consumer>
          {store => {
            const { unit, convertToC, forecastWeather } = store;

            return (
              <Fragment>
                <div className="Modal__Content">
                  <CurrentWeather
                    unit={unit}
                    convertToC={convertToC}
                    editLocation={editLocation}
                    handleEditLocation={this.handleEditLocation}
                    day={day}
                  />
                  <ul className="ForecastWeather__Container">
                    {Object.keys(forecastWeather).map((key, index) => {
                      const data = forecastWeather[key];
                      const addClass = this.state.selected === key ? "selected" : "";

                      return (
                        <li
                          className={`ForecastWeather__Column ${addClass}`}
                          data-key={key}
                          onClick={(e) => this.handleDisplay(e)}
                          key={index}
                        >
                          <ForecastWeather
                            data={data}
                            unit={unit}
                            convertToC={convertToC}
                          />
                        </li>
                      );
                    })}
                  </ul>
                </div>
              </Fragment>
            );
          }}
        </Store.Consumer>
      </Modal>
    )
  }
}

function CurrentWeather(props) {
  const { unit, convertToC, handleEditLocation, editLocation, day } = props;

  return (
    <Store.Consumer>
      {store => {
        const { city, countryCode } = store.location;
        const { 
          currentWeather,
          handleChangeLocation, 
          handleSubmitLocation, 
          handleTempUnit, 
          handleGeoLocation,
          message,
        } = store;
        const forecastWeather = store.forecastWeather[day];
        return (
          <div className="CurrentWeather__Container">
            <div className="CurrentWeather__Wrapper">
              <div className="CurrentWeather__Top">
                <div className="current-location">
                  {editLocation ?
                    <RenderForm
                      city={city}
                      countryCode={countryCode}
                      handleChangeLocation={handleChangeLocation}
                      handleSubmitLocation={handleSubmitLocation}
                      handleEditLocation={handleEditLocation}
                    />
                    :
                    <RenderLocation
                      editLocation={editLocation}
                      city={city}
                      countryCode={countryCode}
                    />
                  }
                  {message && 
                    <span className="message">
                      {message}
                    </span>
                  } 
                  {editLocation ? (
                    <span 
                      className="location-icon" 
                      onClick={() => {handleGeoLocation(); handleEditLocation()}}
                    >
                      <FaLocationArrow />
                    </span>
                  ) : (
                    <span className="location-icon" onClick={() => handleEditLocation()}>
                      <FaPencil />
                    </span>
                  )}
                </div>
              </div>
              {forecastWeather && (day !== "day1") ? 
                <RenderForecastData 
                  forecastWeather={forecastWeather} 
                  unit={unit} 
                  convertToC={convertToC} 
                />
              : 
                <RenderCurrentData 
                  currentWeather={currentWeather} 
                  unit={unit} 
                  convertToC={convertToC} 
                />
              }
            </div>
            <span
              className="temp-unit"
              onClick={() => handleTempUnit()}
            >
              {unit ? "°C" : "°F"}
            </span>
          </div>
        );
      }}
    </Store.Consumer>
  );
}

function RenderForecastData(props) {
  const { text, code, high, low } = props.forecastWeather;
  const { unit, convertToC } = props;

  return (
    <Fragment>
      <span className="current-weather">
        {text}
      </span>
      <div className="CurrentWeather__Bottom">
        <WeatherIcon name="yahoo" iconId={code} />
        <span className="current-temp-high">
          {unit ? convertToC(high) : high}°
        </span>
        <span className="current-temp-low">
          {unit ? convertToC(low) : low}°
        </span>
      </div>
    </Fragment>
  );
}

function RenderCurrentData(props) {
  const { weatherCode, temperature, weather } = props.currentWeather;
  const { unit, convertToC } = props;

  return (
    <Fragment>
      <span className="current-weather">
        {weather}
      </span>
      <div className="CurrentWeather__Bottom">
        <WeatherIcon name="yahoo" iconId={weatherCode} />
        <span className="current-temp">
          {unit ? convertToC(temperature) : temperature}°
        </span>
      </div>
    </Fragment>
  );
}

function RenderForm(props) {
  const { 
    city, 
    countryCode, 
    handleChangeLocation, 
    handleSubmitLocation, 
    handleEditLocation,
  } = props;

  return (
    <div>
      <form onSubmit={(e) => { handleSubmitLocation(e); handleEditLocation()}}>
        <input
          className="location-input"
          type="text"
          placeholder={`${city}${countryCode}`}
          onChange={(e) => handleChangeLocation(e)}
        />
      </form>
    </div>
  );
}

function RenderLocation(props) {
  const { city, countryCode } = props;
  return (
    <span>
      {city}{countryCode}
    </span>
  );
}

function ForecastWeather(props) {
  const { data, unit, convertToC } = props;
  
  return (
    <div className="ForecastWeather__Wrapper">
      <span className="day">
        {data.day}
      </span>
      <div className="weather">
        <WeatherIcon name="yahoo" iconId={data.code} />
        <span className="temp-high">
          {unit ? convertToC(data.high) : data.high}°
        </span>
        <span className="temp-low">
          {unit ? convertToC(data.low) : data.low}°
        </span>
      </div>
    </div>
  );
}

Modal.setAppElement("#root");
export default WeatherModal;