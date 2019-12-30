import React, {useState} from 'react';
import logo from './logo.svg';
import './App.css';


//Part 1

// function Header(props){ return(
//   <h1> {props.title} </h1>
// );
// }

// function Content(props){
//   return(
//     <div>
//      <p> {props.part1} {props.exercises1} </p>
//      <p> {props.part2} {props.exercises2} </p>
//      <p> {props.part3} {props.exercises3} </p>
//     </div>
//   );
// }

//Part 2
// function Content(props){
//   //display props passed
//   console.log(props)
//   return(
//     <div>
//      <Part part = {props.part1} exercises = {props.exercises1}/>
//      <Part part = {props.part2} exercises = {props.exercises2}/>
//      <Part part = {props.part3} exercises = {props.exercises3}/>
//     </div>
//   );
// }

// function Part(props){
//   return(
//     <p>{props.part} {props.exercises}</p>
//   );
// }

// function Total(props){
//   return(
//   <p> Number of exercises {props.total} </p>
//   );
// }

//Part 3 & 4

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
  
const Content = (props) => {
    //props.parts.forEach()
    return(
      <div>
       <p>
        Name: {props.parts[0].name} <br></br>
        Exercises: {props.parts[0].exercises} <br></br>
      </p>
      <p>
        Name: {props.parts[1].name} <br></br>
        Exercises: {props.parts[1].exercises} <br></br>
      </p>    
      <p>
        Name: {props.parts[2].name} <br></br>
        Exercises: {props.parts[2].exercises} <br></br>
      </p>        
      </div>
      )
  }

  const Header = (props) => {
    return(
      <h1> {props.course} (w/ props) </h1>
    )
  }

  // const course = 'Half stack app dev'
  // const parts = [
  //   {
  //   name: 'Fundamentals of React',
  //   exercises: 10
  // }, {
  //   name: 'Using props to pass data',
  //   exercises: 7
  // },{
  //   name: 'State of a component',
  //   exercises: 14
  // } 
  // ]

    //FUNCTIONS
  //old function method
  // function product (a,b) {
  //   return a * b
  // }
  //console.log("Product: " + product(2,3))

  //arrow function
  const sum = (p1,p2) => {
    return p1 + p2
  }
  //arrow function w/ props
  const PrintName = (props) => {
    return(<p> Hello, {props.name} </p>);
  }
  
  //functions w/ single parameter/ or single expression
  const square = p => p*p
  const cube = p => {
    return p*p*p
  }

function App() {
  console.log("Trial")
  let name = "Mika"
  let age = 22
  let result = sum(2, 3)

    //let - modifiable variables
    let x = 2
    let y = 5
    console.log(x,y)
    y+=10
    x = "Toaster"
    console.log(x,y)
    
    //ARRAYS
    //arrays - w/ const keyword (variable is accessed in same location 
    //so contents of array may be modified)
  
    const arr = ["a", "3", "b"]
    arr.push(4)
  
    arr.forEach(value => {console.log(value)})
    
    //array w/ concat
    const arr2 = arr.concat("x")
  
    console.log(arr)
    console.log(arr2)
  
    //array w/ map //map creates new array based on old array
    const m1 = arr.map (value => value + "x")
    console.log(m1) // ["ax", "3x", "bx", "4x"] is printed
  
    //deconstruction assignment
    const t = [1,2,3,4,5]
    const [first, second, ...rest] = t
    console.log(first)
    console.log(second)
    console.log(rest)
  
    //OBJECTS
    const obj1 = 
    {
      name: 'Kyrja',
      age: '22',
      occupation: 'Gatekeeper',
    }
  
    const obj2 = 
    {
      name: 'Full Stack web application development',
      level: 'Intermediate studies',
      size: 5,
    }
  
       const course1 = {
        name: 'Half Stack application development',
        parts: [
          {
            name: 'Fundamentals of React',
            exercises: 10
          },
          {
            name: 'Using props to pass data',
            exercises: 7
          },
          {
            name: 'State of a component',
            exercises: 14
          }
        ]
      }   
      
    //   const P1 = () => {
    // }
    
    //referencing object properties w/ dot-notation or brackets
    console.log(obj1.name)
    let fieldName = 'age'
    console.log(obj1[fieldName])
    fieldName = 'name'
    console.log(obj2[fieldName])
  
    //Add properties to objects
    obj1.address = 'Vahalla'
    fieldName = 'address'
    console.log(obj1.address)
   
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
          <img src={logo} className="App-logo" alt="logo" />
          {/* <P1 /> */}
          <Header course = {course1.name}/>
          <Content parts = {course1.parts}/>      
          {/* <Header title={course}/>
          <Content part1 = {part1} part2={part2} part3={part3} 
          exercises1={exercises1} exercises2={exercises2} exercises3={exercises3}/>
          <Total total = {exercises1+exercises2+exercises3}/> */}
          <PrintName name={obj1.name}/>
          <p> 
            result: {result} <br></br> 
            square: {result=square(3)} <br></br>
            cube: {result=cube(2)} <br></br>
            Edit <code>src/App.js</code> and save to reload.
          </p>
          <a
            className="App-link"
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            Learn React
          </a>
        </header>
      </div>
    );
  }

export default App;
