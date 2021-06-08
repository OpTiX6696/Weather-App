// import logo from './logo.svg';
import "./App.css";
import React from "react";
import credentials from "./Credentials";
// import axios from 'axios';

const LocationInput = () => {
	const [location, setLocation] = React.useState();

	const getWeather = async () => {
		const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${credentials.api_Key}`;

		try {
			console.log("URRRLLLLL", url);
			const res = await fetch(url);
			const data = await res.json();
			console.log(data);
		} catch (error) {
			console.log("Error in get call!!");
		}
	};

	return (
		<div>
			<input
				type="text"
				placeholder="Enter Location here..."
				onChange={(e) => setLocation(e.target.value)}
			></input>

			<button onClick={getWeather}>Get Weather</button>
		</div>
	);
};

function App() {
	return (
		<div>
			<LocationInput />
			I'm still working
		</div>
	);
}

export default App;
