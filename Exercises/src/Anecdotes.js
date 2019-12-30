//Anecdotes
//web app displays random hard-coded anecdotes
//allows user to 'vote' for an anecdote. results displayed

import React, { useState } from 'react'
import ReactDOM from 'react-dom'


const Button = (props) => {
  return (
    <div>
    <button onClick={props.onClick}> {props.text} </button>
    </div>
  )
}

const DisplayPoints = (props) => {
  //const size = props.size
  console.log(props)
  return(<div> </div>)
}

  var points = Array(6).fill(0)
  const anecdotes = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
  ]  
  
  const App = () => {

  const [selected, setSelected] = useState(0)
  const size = anecdotes.length

  const rand = ()  => Math.floor(Math.random()*size)

  const setVote = (index) => () => {
    //Using map function to update single item
    // points = points.map( (val, i) => {
    //   if (index === i)
    //   {
    //     return ++val
    //   } else
    //   {
    //     return val
    //   }
    // })

    //increment array at specified index
    points[index] += 1
    //console.log('points[',index,']: ',points[index])
    console.log(points)
  }

  return (
    <div>
      {anecdotes[selected]}
      <Button onClick={ setVote(selected) } text='Vote'/>
      <Button onClick={ () => setSelected(rand) } text='Random'/>
    {console.log('Selected #:',selected)}
    <DisplayPoints points={points}/>
    </div>
  );
}


ReactDOM.render(
  <App />,
  document.getElementById('root')
)

export default App;
