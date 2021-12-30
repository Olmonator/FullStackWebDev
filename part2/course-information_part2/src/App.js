import React from 'react'

const Header = ( {name} ) => {
  return (
    <div>
      <h1>{name}</h1>
    </div>
  )
}

const Part = (props) => {
  console.log(props)
  return (
    <div>
      <p>
        {props.part.name} {props.part.exercises}
      </p>
    </div>
  )
}

const Content = ( {parts} ) => {
 
  return (
    <div>
      {parts.map(parts => <Part part={parts}/>)}
    </div>
  )
}

const Total = ( {parts} ) => {
  
  const total = parts.map(parts => parts.exercises).reduce((s,p) => s + p)
  
  return (
    <div>
      <p>Number of exercises {total}</p>
    </div>
  )
 }

const Course = ( {course} ) => {
  return (
    <div> 
      <Header name={course.name}/>
      <Content parts={course.parts}/>
      <Total parts={course.parts}/>
    </div>
  )
}

const App = () => {
  const courses = [
    {
    id: 1,
    name: 'Half Stack application development',
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10,
        id: 1
      },
      {
        name: 'Using props to pass data',
        exercises: 7,
        id: 2
      },
      {
        name: 'State of a component',
        exercises: 14,
        id: 3
      },
      {
        name: 'Redux',
        exercises: 11,
        id: 4
      }
    ]
  },
  {
    name: 'Node.js',
    id: 2,
    parts: [
      {
        name: 'Routing',
        exercises: 3,
        id: 1
      },
      {
        name: 'Middlewares',
        exercises: 7,
        id: 2
      }
    ]
  }
]

  return (
    <>
      <Course course={courses[0]} />
      <Course course={courses[1]} />
    </>
  )
} 

export default App   