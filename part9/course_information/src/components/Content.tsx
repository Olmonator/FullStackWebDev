import React from 'react';

import { CoursePart } from '../App'
import Part from './Part';

const Content = ({ courseParts } : { courseParts: CoursePart[] }): JSX.Element => {
  console.log(courseParts)
  
  return (
    <ul>
      {courseParts.map(part => 
        <Part key={part.name} coursePart={part}/> 
      )}
    </ul>
  )
}

export default Content