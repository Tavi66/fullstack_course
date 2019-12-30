import React,{ useState } from 'react';
//import ReactDOM from 'react-dom';
import logo from './logo.svg';
import './App.css';

const Hello = (props) => {
  const {name, age} = props

  const bornYear = () => new Date().getFullYear() - age
  return(
    <div>
      <p>
        Hello {name}, you are {age} years old.
        You were born in {bornYear()}.
      </p>
    </div>
  )
}

  //Conditional Rendering
  const History = (props) => {
    //console.log('props val is ', props)
    if(props.allClicks.length === 0)
    {
      return (
        <div> the app is used by pressing buttons </div>
      )
    }

    return (
      <div>
        button press history: {props.allClicks.join(' ')}
      </div>
    )
  }
// ReactDOM.render(
//   <App counter={counter}/>, document.getElementById('root')
// )
  const handleClick = () => {
    console.log('clicked the button')
  }
  

  const hello = (who) => () => {
    console.log('hello', who) 
  }

  // const Button = ( {onClick,text} ) => (
  //   <button onClick = {onClick}> {text} </button>
  // )  
  const Button = ( props ) => (
    <button onClick = {props.onClick}> {props.text} </button>
  )  
function App() {
  let name = "Mika"
  let age = 22
  //let counter = 1

  // const [counter, setCounter ] = useState(0)
  //sample functions w/ setters
  const [left, setLeft ] = useState(0)
  const [right, setRight ] = useState(0)

  const [clicks, setClicks ] = useState({left: 0, right: 0})
  const [allClicks, setAll ] = useState([])

  const handleRightClick = () => {
    //Complex state

    // const newClicks = {
    //   ...clicks,
    //   right: clicks.right + 1
    // }
    //setClicks(newClicks)
    //object spread syntax => ...object
    setClicks({...clicks, right: clicks.right + 1})
    //Handling arrays
    setAll(allClicks.concat('R'))
    setRight(right + 1)
  }
  
  const handleLeftClick = () => {
    // const newClicks = {
    //   left: clicks.left + 1,
    //   ...clicks
    // }
    //setClicks(newClicks)
    setClicks({...clicks, left: clicks.left + 1})
    //Handling arrays
    setAll(allClicks.concat('L'))
    setLeft(left + 1)
  }
  
  const [value, setValue ] = useState(10)

  const setValueTo = (value) => () => {
    setValue(value)
    console.log('value:',value)
  }
  //const setCounter = () => counter += 1
  // setTimeout(
  //   () => setCounter(counter+1), 1000
  // )

  //functions to increase/reset values respectively
//   const increaseByOne = () => {
//     setCounter(counter+1)
// //    console.log('[counter button] clicked!')
//   }

//   const resetToZero = () => {
//     setCounter(0)
//   }

  //function that returns a function 
  // const setValueTo = (value) => {
  //   return () => {
  //     setCounter(value)
  //   }
  // }
  //display counter
  // const DisplayCounter = ({counter}) => {
  //   return(
  //     <div>
  //       {counter}
  //     </div>
  //   )
  // }

  return (
    <div className="App">
      <header className="App-header">
      {/* <DisplayCounter counter = {counter}/> */}
      {/* <button onClick={() => setCounter(counter+1)}>  */}
      {/* <button onClick={increaseByOne}>  */}

      {/* <button onClick={setValueTo(counter+1)}> + </button> */}
      {/* <button onClick={setValueTo(counter-1)}> - </button> */}
      {/* <button onClick={setValueTo(0)} > reset </button> */}
      {clicks.left}
      {/* <button onClick={handleLeftClick}> left </button> */}
      {/* <button onClick={handleRightClick}> right </button> */}
      <Button onClick={handleLeftClick} text='LEFT'/>
      <Button onClick={handleRightClick} text='RIGHT'/>
      {clicks.right}
      <History allClicks = {allClicks}/>
      {value}
      <button onClick={handleClick}>button</button>
      <button onClick={hello('world')}>world</button>
      <button onClick={hello('react')}>react</button>
      <button onClick={hello('button2')}>button2</button>
      <br/>
      <button onClick={setValueTo(1000)}>1000</button>
      <button onClick={setValueTo(0)}>reset</button>
      <button onClick={setValueTo(value+1)}>increment</button>
      {/* <button onClick={resetToZero}> */}
        <h1> Greetings </h1>
        <Hello name = "Taylor" age = {age + 5}/>
        <Hello name = {name} age = {age}/>
        <img src={logo} className="App-logo" alt="logo"/>
      </header>
    </div>
  );
}

// const refresh = () => {
//  ReactDOM.render(<App counter={counter}/>,document.getElementById('root'));
// }
  // refresh()
  // counter += 1

// setInterval(() => {
//   refresh()
//   counter += 1
//   }, 1000 )

export default App;
