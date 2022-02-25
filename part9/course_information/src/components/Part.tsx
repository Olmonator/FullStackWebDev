import React from 'react';

import { CoursePart } from '../App'

const assertNever = (value: never): never => {
  throw new Error(
    `Unhandled discriminated union member: ${JSON.stringify(value)}`
  );
};

const Part = ({ coursePart }: { coursePart : CoursePart}): JSX.Element => {
  switch(coursePart.type) {
    case "normal":
      return (
        <li>
          {coursePart.name} 
          <p>
            exercises: {coursePart.exerciseCount}
          </p>
          <p>
            {coursePart.description}
          </p>
        </li>
      )
    case "groupProject":
      return (
        <li>
          {coursePart.name}
          <p>
            exercises: {coursePart.exerciseCount}
          </p>
          <p>
            groupProjects: {coursePart.groupProjectCount}
          </p>
        </li>
      )
    case "submission":
      return (
        <li>
          {coursePart.name}
          <p>
            exercises: {coursePart.exerciseCount}
          </p>
          <p>
            {coursePart.description}
          </p>
          <p>
            at: {coursePart.exerciseSubmissionLink}
          </p>
        </li>
      )
    case "special":
      return (
        <li>
          {coursePart.name}
          <p>
            exercises: {coursePart.exerciseCount}
          </p>
          <p>
            {coursePart.description}
          </p>
          <p>
            requirements: {coursePart.requirements}
          </p>
        </li>
      )
    default:
      return assertNever(coursePart);
  }
}

export default Part