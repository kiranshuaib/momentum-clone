import React, { Component } from "react";
import "../styles/App.css";

import Time from './Time';
import Name from './Name';
import Focus from "./Focus";
import ToDo from "./ToDo.js";
import Links from "./Links";
import Search from "./Search";
import QuoteContainer from "./QuoteContainer";
import Settings from "./Settings";
import WallpaperInfo from "./WallpaperInfo";
import WeatherContainer from "./WeatherContainer";

class App extends Component {
	render() {
		return (
			<div className="App">
				<div className="App__Top">
					<div className="APP__Top__Left">
						<Links />
						<Search />
					</div>
          <WeatherContainer />
				</div>
				<div className="App__Center">
					<Time />
					<Name />
					<Focus />
				</div>
				<div className="App__Footer">
					<div className="App__Footer__Left">
						<Settings />
						<WallpaperInfo />
					</div>
          <QuoteContainer />
					<ToDo />
				</div>
			</div>
		);
	}
}

export default App;