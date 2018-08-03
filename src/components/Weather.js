import React from "react";
import MainWeather from "./MainWeather";
import "../styles/Weather.css";

import WeatherModal from "./WeatherModal";

class Weather extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showModal: false,
    };
  }

	handleOpenModal = () => {
		this.setState({ showModal: true });
	};

	handleCloseModal = () => {
		this.setState({ showModal: false });
  }; 

	render() {

		return (
			<div id="Weather">
				<MainWeather handleOpenModal={this.handleOpenModal} />
				<WeatherModal
					isActive={this.state.showModal}
          handleCloseModal={this.handleCloseModal}
				/>
			</div>
		);
	}
}

export default Weather;