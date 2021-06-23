import React from 'react'

const Header = ({ course }) => {
	return <h1>{course.name}</h1>
}

const Total = ({ course }) => {
	const sum = course.parts.reduce((sum, part) => sum + part.exercises, 0)

	return (
		<div>
			<strong>total of {sum} exercises</strong>
		</div>
	)
}

const Part = ({ part }) => {
	return (
		<p>
			{part.name} {part.exercises}
		</p>
	)
}

const Content = ({ course }) => {
	const parts = course.parts
	return (
		<div>
			{parts.map((part) => (
				<Part key={part.id} part={part} />
			))}
		</div>
	)
}

const Course = ({ courses }) => {
	return (
		<>
			{courses.map((course) => (
				<div key={course.id}>
					<Header course={course} />
					<Content course={course} />
					<Total course={course} />
				</div>
			))}
		</>
	)
}

export default Course
