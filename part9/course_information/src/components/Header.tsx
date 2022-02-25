import React from 'react';

const Header = ({ courseName }: {courseName: string}): JSX.Element => {
  
  return (
    <h2>{courseName}</h2>
  )
}

export default Header