import React, { useState } from 'react'

const App = () => {
	const [persons, setPersons] = useState([])
	const [newName, setNewName] = useState('')

	const handleName = (e) => {
		setNewName(e.target.value)
	}

	const handleForm = (e) => {
		e.preventDefault()
		if (persons.find((person) => person === newName)) {
			window.alert(`${newName} is already added to phonebook`)
		} else {
			setPersons(persons.concat(newName))
		}
		setNewName('')
	}

	return (
		<div>
			<h2>Phonebook</h2>
			<form onSubmit={handleForm}>
				<div>
					name: <input value={newName} onChange={handleName} />
				</div>
				<div>
					<button type='submit'>add</button>
				</div>
			</form>
			<h2>Numbers</h2>
			{persons.map((person) => (
				<p key={person}>{person}</p>
			))}
		</div>
	)
}

export default App
