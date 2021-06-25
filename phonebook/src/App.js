import React, { useState, useEffect } from 'react'
import axios from 'axios'

const PersonForm = (props) => {
	return (
		<form onSubmit={props.handleForm}>
			<div>
				name:{' '}
				<input value={props.newName} onChange={props.handleName} />
			</div>
			<div>
				number:{' '}
				<input value={props.newNumber} onChange={props.handleNumber} />
			</div>
			<div>
				<button type='submit'>add</button>
			</div>
		</form>
	)
}

const Filter = (props) => {
	return (
		<div>
			filter shown with{' '}
			<input value={props.value} onChange={props.onChange} />
		</div>
	)
}

const Persons = (props) => {
	return (
		<div key={props.person.name}>
			{props.person.name} {props.person.number}
		</div>
	)
}

const App = () => {
	const [persons, setPersons] = useState([])
	const [newName, setNewName] = useState('')
	const [newNumber, setNewNumber] = useState('')
	const [filterName, setFilterName] = useState('')

	useEffect(() => {
		axios.get('http://localhost:3001/persons').then((response) => {
			setPersons(response.data)
		})
	}, [])

	const handleName = (e) => {
		setNewName(e.target.value)
	}

	const handleNumber = (e) => {
		setNewNumber(e.target.value)
	}

	const handleForm = (e) => {
		e.preventDefault()
		if (persons.find((person) => person.name === newName)) {
			window.alert(`${newName} is already added to phonebook`)
		} else {
			setPersons(persons.concat({ name: newName, number: newNumber }))
		}
		setNewName('')
		setNewNumber('')
	}

	const handleFilter = (e) => {
		setFilterName(e.target.value)
	}

	const filterNamesFunction = (arr) =>
		arr.filter((person) =>
			person.name.toLowerCase().includes(filterName.toLowerCase())
		)

	return (
		<div>
			<h2>Phonebook</h2>
			<Filter value={filterName} onChange={handleFilter} />
			<h2>add a new</h2>
			<PersonForm
				handleForm={handleForm}
				newName={newName}
				handleName={handleName}
				newNumber={newNumber}
				handleNumber={handleNumber}
			/>
			<h2>Numbers</h2>
			{filterNamesFunction(persons).map((person) => (
				<Persons key={person.name} person={person} />
			))}
		</div>
	)
}

export default App
