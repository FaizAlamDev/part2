import React, { useState, useEffect } from 'react'
import axios from 'axios'

const Input = ({ value, onChange }) => {
	return <input value={value} onChange={onChange} />
}

const Country = ({ country }) => {
	return (
		<div>
			<h2>{country.name}</h2>
			<p>Capital: {country.capital}</p>
			<p>Population: {country.population}</p>
			<h3>languages</h3>
			<ul>
				{country.languages.map((language) => (
					<li key={language.name}>{language.name}</li>
				))}
			</ul>
			<img src={country.flag} alt='flag' height='100px' width='100px' />
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
			<p key={country.name}>
				{country.name}{' '}
				<button id={country.name} onClick={handleClick}>
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
	const handleClick = (e) => {
		setInputValue(e.target.id)
	}

	// this variable has an array of the object of the country whose button was clicked
	const country = countries.filter((c) => c.name === inputValue)

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
