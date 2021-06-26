import React from 'react'

const Person = (props) => {
	return (
		<div key={props.person.name}>
			{props.person.name} {props.person.number}
		</div>
	)
}

export default Person
