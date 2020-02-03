import React, {useState, useEffect} from 'react' //,useEffect} from 'react'
import ReactDOM from 'react-dom'

import './index.css'

import Note from './components/Note'
import Course from './components/Course'
import Phonebook from './components/Phonebook'
import Countries from './components/Countries'

import noteService from './services/notes'

const Notification = ({message}) => {
  if(message === null)
  return null
  else{
    return(
      <div className="error">
        {message}
      </div>
    )
  }
}

const handleDeleteButton = (id, setNotes,notes) => {
  if (window.confirm(`Delete note with id: ${id}?`))
  {
    console.log(`Deleting entry with id: ${id}`)
    noteService
     .remove(id)
     .then( setNotes(notes.filter(note => note.id !== id )))
     console.log('notes.filter: ', notes)
}
}
//for useEffect
//const App = () => {
const App = () => {
  //for useEffect
  const [notes, setNotes] = useState([])  
  //for props w/o useEffect
  //const [notes, setNotes] = useState(props.notes)  
  const [newNote, setNewNote] = useState('a new note...')
  const [showAll, setShowAll] = useState(true)
  const [errorMessage, setErrorMessage] = useState(null)

  //async error with other useEffect examples (e.g. Phonebook useEffect)
  useEffect( () => {
    console.log('effect for notes')
    // axios
    // .get('http://localhost:3001/notes')
    noteService
    .getAll()
    .then(response => {
      console.log('promise fufilled')
      setNotes(response)
     })
     .catch(error => console.log(error))
  },[])

  // console.log('render', notes.length, 'notes')

  const notesToShow  = showAll 
  ? notes 
  : notes.filter(note => note.important)

  const rows = () => notesToShow.map(note =>  
    <Note
         handleDeleteButton = {() => handleDeleteButton(note.id,setNotes,notes)} 
         key={note.id} 
         note={note}
         toggleImportance = {() => toggleImportanceOf(note.id)}
    />
  )

  const addNote = (event) => {
    event.preventDefault()
    console.log('Button clicked. ', event.target)

    const noteObj = {
      content: newNote,
      date: new Date().toISOString(),
      important: Math.random() > 0.5,
    }

    //axios POST save notes to DB
    // axios
    //      .post('http://localhost:3001/notes', noteObj)
    noteService
    .create(noteObj)
         .then(response => {
           console.log(response)
    setNotes(notes.concat(response))
    setNewNote('')
         })
    .catch(error => console.log(error))

}

  const handleNoteChange = (event) => {
    //console.log(event.target.value)
    setNewNote(event.target.value)
  }

  const toggleImportanceOf = id => {
    console.log('Importance of ', id, ' needs to be toggled.')
    //const url = `http://localhost:3001/notes/${id}`
    const note = notes.find(n => n.id === id)
    //copies previous note object with updated negated importance value
    const changedNote = {...note, important: !note.important}
    //maps old notes content if id does not match changed id, else add changed note
    //axios.put(url,changedNote)
    noteService
    .update(id, changedNote)
    .then(response => {
      setNotes(notes.map(note => note.id !== id ? note : response))
    })
    .catch(error => {
      setErrorMessage(
        `Note: ${note.content} was already deleted from the server.`
      );
      setTimeout( () => {
        setErrorMessage(null)
      },5000);
      setNotes(notes.filter(n => n.id !== id));
    })
  }

  const course = [{
    name: 'Half Stack application development',
    id:1,
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
        name: 'reduce',
        exercises: 3,
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
    <div>
      <h1>Countries</h1>
      <Countries/>
      <h1>Phonebook</h1>
      <Phonebook/>
      <h1>Notes</h1>
      {errorMessage !== null ? <Notification message={errorMessage}/> : ''}
      <ul>
      {rows()}
      </ul>

      <form onSubmit={addNote}>
        <input value={newNote} 
        onChange={handleNoteChange}
        />
        <button type="submit">Save</button>
      </form>
      
      {/* button to show important or all notes. */}
      <button onClick={() => setShowAll(!showAll)}>
        show {showAll ? "important" : "all"}
      </button>      
      
      <Course course={course}/>
    </div>
  )
}

ReactDOM.render(
  <App />, //notes={notes} />,
  document.getElementById('root')
)

export default App