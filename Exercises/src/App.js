import React from 'react'
import ReactDOM from 'react-dom'
import Note from './components/Note'

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

const List = () => {
const list = notes.map(note => <li key={note.id}>{note.content}</li>)
return(
    <ul>
      {list}
    </ul>
  )
}

const App = () => {

  return (
    <div>
      <h1>Notes</h1>
      <List/>
    </div>
  )
}

ReactDOM.render(
  <App />,
  document.getElementById('root')
)

export default App;
