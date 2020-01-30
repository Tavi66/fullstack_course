import React, {useState, useEffect} from 'react'
//import axios from 'axios'

import personService from '../services/persons' 

const PersonsInfo = ({setPersons, persons, id,name,number,filter}) => {
//case-sensitive filter for first substring
const NAME = name.toUpperCase()
const FILTER = filter.toUpperCase()

  if(NAME.search(FILTER) > -1) 
{ 
  //console.log('handleDelete...: ',handleDeleteButton(id))
  //console.log('name: ', name.toUpperCase())
  //console.log('filter: ', filter.toUpperCase())
  return(
    <li>
      {name} {number}
      <button onClick={()=>handleDeleteButton(id, name, setPersons, persons)}>delete</button>
    </li>
  )
} else return(null)
}

const handleDeleteButton = (id, name, setPersons,persons) => {
  if (window.confirm(`Delete ${name}?`))
  {
    console.log(`Deleting entry with id: ${id}`)
    personService
     .remove(id)
     .then( setPersons(persons.filter(person => person.id !== id )))
     console.log('persons.filter: ', persons)
}
}

const Phonebook = () => {

    //before effect used
    // const [ persons, setPersons] = useState([
    //   { name: 'Arto Hellas', number: '33-12-24-6456'},    
    //   { name: 'Ada Lovelace', number: '39-44-5323523' },
    //   { name: 'Dan Abramov', number: '12-43-234345' },
    //   { name: 'Mary Poppendieck', number: '39-23-6423122' }
    // ]) 
    const [persons, setPersons] = useState([])

    //fetch persons data from json using useEffect
    useEffect( () => {
      console.log('effect from Phonebook')
      // axios
      //   .get('http://localhost:3001/persons')
      personService
      .getAll()
        .then(response => {
          setPersons(response)
        }) 
      .catch(error=>console.log(error))
    },[])

    const [ newName, setNewName ] = useState('')
    const [ newNumber, setNewNumber ] = useState('')
    const [filter, setFilter] = useState('')

    const checkName = (event) => {
      event.preventDefault()
      //console.log(event.target)
      //for each obj in arr find if name property matches newName value
        console.log('newName: ',newName)
      const result = persons.filter( element => {
        console.log('person element: ',element)
        console.log('element.name === newName: ',element.name === newName)
        return(element.name === newName)} )
      if(result.length === 0) 
      {
        addPerson()
      }
      else 
      {
        console.log('result: ',result)
        console.log(newName, ' exists.')
        if(window.confirm(`${newName} already exists in phonebook. Replace old number with new number?`))
        updateNumber(result[0].id) 
      }
    }

    const updateNumber = (id) => {
      const updatedNumObj = {
        name: newName,
        number: newNumber
      }
      personService
      .update(id,updatedNumObj)
      .then(response => setPersons(persons.map(person => person.id === id ? response : person) ))
    }

    const addPerson = () => {
      const newPersonObj = {
        name: newName,
        number: newNumber
      }       
      //console.log('persons: ', persons)
      //check if added name exists already
      //when user submits, array is searched. 
      //if defined, then display alert. if undef, add name

      console.log('New name: ',newName, '\tNew number: ', newNumber)
      personService
      .create(newPersonObj)
      .then(response => {
        setPersons(persons.concat(response))
        console.log('response: ', response)
        setNewName('')
        setNewNumber('')}
      )
      .catch(error=>console.log(error))
    }

    const handleNameChange = (event) => {
      //console.log(event.target.value)
      setNewName(event.target.value)    
    }

    const handleNumberChange = (event) => {
      //console.log(event.target.value)
      setNewNumber(event.target.value)
    }

    const handleFilterChange = (event) => {
      setFilter(event.target.value)
      //console.log(filter)
    }

  const rows = () => persons.map(
    person => <PersonsInfo setPersons = {setPersons} persons={persons} id={person.id} filter={filter} key={person.name} name={person.name} number={person.number}/>)

  // const updatePersons = (id) => {
  //   console.log('Updating...')
  //   let counter = 1
  //   persons.forEach(
  //     person => {
  //       if(person.id !== id)
  //       if(person.id !== counter) 
  //       {
  //         console.log(person.name, ': \tid: ', person.id)
  //         let personObject = {...person, id: counter++}
  //         console.log('personObj: ',personObject)
      
  //         //create missing id entries
  //         //update names and numbers of subsequent entries + fill in blanks
  //         personService
  //       .update(person.id,personObject)
  //       .then(response => setPersons(
  //         persons.map(person =>           
  //           {console.log(`${person.name} === ${personObject.name}: `, person.name === personObject.name);
  //         return person.name === personObject.name ? response : person})
  //       ))
  //       .catch(error=>console.log(error))
  //       } else counter+=1
  //       //1 2 3 4 5 9 12 13
  //       //0 0 0 0 0 1
  //       //1 2 3 4 5 6 
  //       //counter = 7
  //       //id = 8
  //     }
  //   )
  //   //setPersons(temp)
  //   console.log('persons(updated): ',persons)
  //   // personService
  //   // .getAll()
  //   // .then(response => setPersons(response))

  // }



    return (
      <div>
        <h2>Phonebook</h2>
        filter: <input onChange={handleFilterChange} />
        <div> debug: {newName} </div>
        <form onSubmit={checkName}>
          <div>
            name: <input value={newName} onChange={handleNameChange} />
          </div>
          <div>
            number: <input value={newNumber} onChange={handleNumberChange} />
          </div>
          <div>
            <button type="submit">add</button>
          </div>
        </form>
        <h2>Numbers</h2>
        <ul>
        {rows()}
        </ul>
        </div>
    )
  }

  export default Phonebook