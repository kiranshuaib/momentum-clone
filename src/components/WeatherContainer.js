import React, { Fragment } from "react";
import Weather from "./Weather";
import Store from "../store";
import "../styles/Weather.css";

class WeatherContainer extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			location: {},
			currentWeather: {},
      forecastWeather: {},
      newLocation: {},
      message: '',
      unit: false,
			// 👆 false: Fahrenheit, true: Celsius
			convertToC: this.convertToC,
			handleTempUnit: this.handleTempUnit,
			handleChangeLocation: this.handleChangeLocation,
      handleSubmitLocation: this.handleSubmitLocation,
      handleGeoLocation: this.handleGeoLocation
		};
  }

  convertToC = temp => Math.round((temp - 32) * 5 / 9);

  handleTempUnit = () => {
    this.setState(prevState => {
      const newState = {
        ...prevState,
        unit: !this.state.unit
      };
      this.saveState(newState);
      return { ...newState };
    });
  };

  handleChangeLocation = e => {
    this.setState({
      newLocation: { city: e.target.value } });
  };

  handleSubmitLocation = e => {
    e.preventDefault();
    this.getWeatherByCity(this.state.newLocation.city);
  };

  handleGeoLocation = () => {
    console.log('getting Geo location')
    this.setState({ message: "Loading..." });
    this.getGeoLocation();
  }

	componentDidMount() {
    /* 
      1. old weather can be loaded from local storage if user leaves the tab open 
      // no! as long as the tab is opened, it will keep refreshing the weather 
      because of setInterval 
      first it opened at 1:30pm, setInterval gets called at 2:30pm and so on 

      2. User opens tab at 1:30 am then close it. 
      local storage has 1:30 am weather this will be loaded when user open the tab at 10:00am 
      so when the tab opened, I should run getGeoLocation function ( in componentDidMount)
      
      => set if date..
      don't need to update every hour. update by api updated time ( condition.date )
      
    */
		// Calls the api every hour 
    setInterval(() => {
      console.log("from componentDidMount: ", new Date())
      this.getGeoLocation()
    }, 3600000);
		this.loadWeather();
  }

	loadWeather = async () => {
		try {
			const weatherObj = await localStorage.getItem("weatherObj");
      if (weatherObj) {
        const parsedWeather = JSON.parse(weatherObj);
        const { location, currentWeather, forecastWeather, unit, newLocation } = parsedWeather;

				this.setState({
					location,
					currentWeather,
					forecastWeather,
          unit,
          newLocation
				});
			} else {
				this.getGeoLocation();
			}
		} catch (err) {
			console.log(err);
		}
  };

  saveState = weatherState => {
    localStorage.setItem("weatherObj", JSON.stringify(weatherState));
	};

	getGeoLocation = () => {
		navigator.geolocation.getCurrentPosition(
			position => {
				let { latitude, longitude } = position.coords;
        this.getWeatherByGeo(latitude, longitude);
			},
			error => console.log(error)
		);
	};

	getWeatherByCity = cityName => {
    const searchText = `select * from weather.forecast where woeid in (select woeid from geo.places(1) where text="(${cityName})")`;

		this.getWeather(searchText);
  };
  
  getWeatherByGeo = (lat, lon) => {
    const searchText = `select * from weather.forecast where woeid in (SELECT woeid FROM geo.places WHERE text="(${lat},${lon})")`;
    this.getWeather(searchText);
  }

	getWeather = (searchText) => {
    const endPoint = `https://query.yahooapis.com/v1/public/yql?q=${searchText}&format=json`;
    
		fetch(endPoint)
			.then(response => response.json())
			.then(json => {
				// console.log(json);
        let data = json.query.results.channel;
        let { forecast } = data.item;
        console.log(data.item.condition.date, new Date());
  
        this.setState({
          message: '',
          location: {
            city: data.location.city,
            countryCode: `, ${data.title.split(", ").pop()}`
          },
          currentWeather: {
            weatherCode: data.item.condition.code,
            temperature: data.item.condition.temp,
            weather: data.item.condition.text
          },
          forecastWeather: {
            day1: forecast[0],
            day2: forecast[1],
            day3: forecast[2],
            day4: forecast[3],
            day5: forecast[4]
          }
        });
        this.setNewLocation();
        this.saveState(this.state);
        // console.log(this.state);
      })
      .catch(err => {
        this.setState({ message: 'not found' });
        console.log(err);
      });
  };
  
  setNewLocation = () => {
    this.setState({ newLocation: {...this.state.location} });
  }

	render() {
		return (
			<Fragment>
				<Store.Provider value={this.state}>
					<Weather />
				</Store.Provider>
			</Fragment>
		);
	}
}

export default WeatherContainer;