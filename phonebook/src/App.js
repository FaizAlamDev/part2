import React, { useState } from 'react'

const App = () => {
	const [persons, setPersons] = useState([])
	const [newName, setNewName] = useState('')
	const [newNumber, setNewNumber] = useState('')

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

	return (
		<div>
			<h2>Phonebook</h2>
			<form onSubmit={handleForm}>
				<div>
					name: <input value={newName} onChange={handleName} />
				</div>
				<div>
					number: <input value={newNumber} onChange={handleNumber} />
				</div>
				<div>
					<button type='submit'>add</button>
				</div>
			</form>
			<h2>Numbers</h2>
			{persons.map((person) => (
				<div key={person.name}>
					{person.name} {person.number}
				</div>
			))}
		</div>
	)
}

export default App
