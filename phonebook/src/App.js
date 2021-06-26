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

		let flag = false,
			id = 0
		persons.forEach((person) => {
			if (person.name === newName) {
				flag = true
				id = person.id
			}
		})

		if (flag) {
			if (
				window.confirm(
					`${newName} is already added to phonebook, replace the old number with the new one?`
				)
			) {
				const newPerson = { name: newName, number: newNumber }
				personService
					.update(id, newPerson)
					.then((returnedPerson) =>
						setPersons(
							persons.map((p) =>
								p.id !== id ? p : returnedPerson
							)
						)
					)
			}
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

	const deletePerson = (id) => {
		const person = persons.find((p) => p.id === id)
		if (window.confirm(`Delete ${person.name} ?`)) {
			personService.remove(id).then((response) => {
				setPersons(persons.filter((p) => p.id !== id))
			})
		}
	}

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
				<Person
					key={person.name}
					person={person}
					handleClick={() => deletePerson(person.id)}
				/>
			))}
		</div>
	)
}

export default App
