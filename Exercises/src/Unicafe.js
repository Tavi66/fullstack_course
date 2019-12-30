//Unicafe (1.6)
//web app collecting customer feedback (good, bad, neutral)
//displays total collected amount for each category

import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const Button = (props) => {
  return(
    <button onClick={props.onClick}> {props.text} </button>
  )
}

const Stats = (props) => {
  let symbol = ' '
  if(props.text === 'Positive Reviews')
   symbol = '%'
  return(
     <tr>
       <td>{props.text}</td><td>{props.value}{symbol}</td>
     </tr> 
  )
}

const App = () => {
  // save clicks of each button to own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  //handlers to set good, bad, and neutral values 
  const setGoodFeed = (newVal) => () => {
  setGood (newVal)
}
const setBadFeed = (newVal) => () => {
  setBad (newVal)
}
const setNeutralFeed = (newVal) => () => {
  setNeutral(newVal)
}
const total = good + bad + neutral
const average = (good - bad)/total
const positiveR = (good/total) * 100

  return (
    <div>
      <h4> Feedback </h4>
      <Button onClick={setGoodFeed(good+1)} text='Good'/>
      <Button onClick={setNeutralFeed(neutral+1)} text='Neutral'/>
      <Button onClick={setBadFeed(bad+1)} text='Bad'/>
      <h4> Stats </h4>
      <table>
        <tbody>
      <Stats text='Good' value={good}/>
      <Stats text='Neutral' value={neutral}/>
      <Stats text='Bad' value={bad}/>
      <Stats text='Total' value={total}/>
      <Stats text='Average' value={average}/>
      <Stats text='Positive Reviews' value={positiveR}/>
        </tbody>
      </table>
    </div>
  )
}

ReactDOM.render(<App />, 
  document.getElementById('root')
)

export default App;
