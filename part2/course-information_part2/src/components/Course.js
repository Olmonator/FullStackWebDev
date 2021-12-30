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
      {parts.map(parts => <Part key={parts.id} part={parts}/>)}
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

export default Course