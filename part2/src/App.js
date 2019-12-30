import React, {useState} from 'react'
import ReactDOM from 'react-dom'
import Note from './components/Note'
import Course from './components/Course'
import Phonebook from './components/Phonebook'

const notes = [
  {
    id: 1,
    content: 'HTML is easy',
    date: '2019-05-30T17:30:31.098Z',
    important: true
  },
  {
    id: 2,
    content: 'Browser can execute only Javascript',
    date: '2019-05-30T18:39:34.091Z',
    important: false
  },
  {
    id: 3,
    content: 'GET and POST are the most important methods of HTTP protocol',
    date: '2019-05-30T19:20:14.298Z',
    important: true
  }
]


const App = (props) => {

  const [notes, setNotes] = useState(props.notes)  
  const [newNote, setNewNote] = useState('a new note...')
  const [showAll, setShowAll] = useState(true)

  const notesToShow  = showAll 
  ? notes 
  : notes.filter(note => note.important)

  const rows = () => notesToShow.map(note =>  
    <Note 
         key={note.id} 
         note={note}
    />
  )

  const addNote = (event) => {
    event.preventDefault()
    console.log('Button clicked. ', event.target)

    const noteObj = {
      content: newNote,
      date: new Date().toISOString(),
      important: Math.random() > 0.5,
      id:notes.length + 1,
    }

    setNotes(notes.concat(noteObj))
    setNewNote('')
}

  const handleNoteChange = (event) => {
    console.log(event.target.value)
    setNewNote(event.target.value)
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
      <h1>Phonebook</h1>
      <Phonebook/>
      <h1>Notes</h1>
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
  <App notes={notes}/>,
  document.getElementById('root')
)

export default App