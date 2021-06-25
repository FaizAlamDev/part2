import React, { useState, useEffect } from 'react'
import axios from 'axios'

const Countries = ({ countries }) => {
	if (countries.length === 0) {
		return <p>No matches found</p>
	} else if (countries.length === 1) {
		return (
			<div>
				<h2>{countries[0].name}</h2>
				<p>Capital: {countries[0].capital}</p>
				<p>Population: {countries[0].population}</p>
				<h3>languages</h3>
				<ul>
					{countries[0].languages.map((language) => (
						<li key={language.name}>{language.name}</li>
					))}
				</ul>
				<img
					src={countries[0].flag}
					alt='flag'
					height='100px'
					width='100px'
				/>
			</div>
		)
	} else if (countries.length > 1 && countries.length <= 10) {
		return countries.map((country) => (
			<p key={country.name}>{country.name}</p>
		))
	} else {
		return <p>Too many matches, specify another filter</p>
	}
}

const App = () => {
	const [countries, setCountries] = useState([])
	const [inputValue, setInputValue] = useState('')

	useEffect(() => {
		axios.get('https://restcountries.eu/rest/v2/all').then((response) => {
			setCountries(response.data)
		})
	}, [])

	const handleInput = (e) => {
		setInputValue(e.target.value)
	}

	const filteredCountries = countries.filter((country) =>
		country.name.toLowerCase().includes(inputValue.toLowerCase())
	)

	return (
		<div>
			<input value={inputValue} onChange={handleInput} />
			<Countries countries={filteredCountries} />
		</div>
	)
}

export default App
