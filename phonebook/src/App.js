import React, { useState, useEffect } from 'react'
import PersonForm from './components/PersonForm'
import Person from './components/Person'
import Filter from './components/Filter'
import personService from './services/persons'

const App = () => {
	const [persons, setPersons] = useState([])
	const [newName, setNewName] = useState('')
	const [newNumber, setNewNumber] = useState('')
	const [filterName, setFilterName] = useState('')

	useEffect(() => {
		personService.getAll().then((obj) => setPersons(obj))
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
			const person = { name: newName, number: newNumber }
			personService
				.create(person)
				.then((obj) => setPersons(persons.concat(obj)))
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
				<Person key={person.name} person={person} />
			))}
		</div>
	)
}

export default App
