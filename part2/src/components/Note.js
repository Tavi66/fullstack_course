import React from 'react'

const Note = ({note, toggleImportance, handleDeleteButton}) => {
  const label = note.important ? 'make not important' : 'make important'
    return (
    <li className='note'>
      {note.content}
      <button onClick={toggleImportance}>{label}</button>
      <button onClick={handleDeleteButton}>delete</button>
      </li>
    )
  }
  
export default Note