import React, { useState, useEffect } from 'react'
import axios from 'axios'

const Input = ({ value, onChange }) => {
	return <input value={value} onChange={onChange} />
}

const Country = ({ country }) => {
	const [weather, setWeather] = useState([])
	const [isLoading, setLoading] = useState(true)
	useEffect(() => {
		axios
			.get(
				`http://api.weatherstack.com/current?access_key=${process.env.REACT_APP_WEATHER_API}&query=${country.capital}`
			)
			.then((response) => {
				setWeather(response.data)
				setLoading(false)
			})
		// eslint-disable-next-line
	}, [])
	if (isLoading) {
		return <h3>Loading...</h3>
	}
	return (
		<div>
			<h2>{country.name.common}</h2>
			<p>Capital: {country.capital}</p>
			<p>Area: {country.area}</p>
			<h3>languages</h3>
			<ul>
				{Object.values(country.languages).map((language) => (
					<li key={language}>{language}</li>
				))}
			</ul>
			<img
				src={country.flags.png}
				alt='flag'
				height='100px'
				width='100px'
			/>
			<h3>Weather in {country.capital}</h3>
			<p>
				<strong>temperature</strong>: {weather.current.temperature}{' '}
				Celsius
			</p>
			<img
				src={weather.current.weather_icons[0]}
				alt='weather conditions'
			/>
			<p>
				<strong>wind</strong>: {weather.current.wind_speed} kph
				direction {weather.current.wind_dir}
			</p>
		</div>
	)
}

const Countries = ({ countries, handleClick }) => {
	if (countries.length === 0) {
		return <p>No matches found</p>
	} else if (countries.length === 1) {
		return <Country country={countries[0]} />
	} else if (countries.length > 1 && countries.length <= 10) {
		return countries.map((country) => (
			<p key={country.name.common}>
				{country.name.common}{' '}
				<button id={country.name.common} onClick={handleClick}>
					show
				</button>
			</p>
		))
	} else {
		return <p>Too many matches, specify another filter</p>
	}
}

const App = () => {
	const [countries, setCountries] = useState([])
	const [inputValue, setInputValue] = useState('')

	useEffect(() => {
		axios.get('https://restcountries.com/v3.1/all').then((response) => {
			setCountries(response.data)
		})
	}, [])

	const handleInput = (e) => {
		setInputValue(e.target.value)
	}

	const filteredCountries = countries.filter((country) =>
		country.name.common.toLowerCase().includes(inputValue.toLowerCase())
	)

	const handleClick = (e) => {
		setInputValue(e.target.id)
	}

	// this variable has an array of the object of the country whose button was clicked
	const country = countries.filter((c) => c.name.common === inputValue)

	return (
		<div>
			<Input value={inputValue} onChange={handleInput} />
			{country.length !== 0 ? (
				<Country country={country[0]} />
			) : (
				<Countries
					countries={filteredCountries}
					handleClick={handleClick}
				/>
			)}
		</div>
	)
}

export default App
