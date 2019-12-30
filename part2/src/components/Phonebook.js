import React, {useState} from 'react'

const PersonsInfo = ({name,number}) => {
  return(
    <li>
      {name} {number}
    </li>
  )
}

//check if added name exists already
//when user submits, array is searched. 
//if defined, then display alert. if undef, add name

const Phonebook = () => {
    const [ persons, setPersons] = useState([
      { name: 'Arto Hellas', number: '33-12-24-6456'},    
      { name: 'Ada Lovelace', number: '39-44-5323523' },
      { name: 'Dan Abramov', number: '12-43-234345' },
      { name: 'Mary Poppendieck', number: '39-23-6423122' }

    ]) 
    const [ newName, setNewName ] = useState('')
    const [ newNumber, setNewNumber ] = useState('')
    const checkName = (event) => {
      event.preventDefault()
      //console.log(event.target)
      //for each obj in arr find if name property matches newName value
      const result = persons.find( element => {return(element.name === newName)} )
      if(result) 
      {
        console.log('result: ',result)
        console.log(newName, ' exists.')
        alert(`${newName} already exists in phonebook.`) 
      }
      else 
      {
        addPerson()
      }
    }

    const addPerson = () => {
      const newPersonObj = {
        name: newName,
        number: newNumber
      }       
      
      console.log('New name: ',newName, '\tNew number: ', newNumber)
      //setNewName(newName)
      //setNewNumber(newNumber)
      setPersons(persons.concat(newPersonObj))
      setNewName('')
      setNewNumber('')
    }

    const handleNameChange = (event) => {
      //console.log(event.target.value)
      setNewName(event.target.value)    
    }

    const handleNumberChange = (event) => {
      //console.log(event.target.value)
      setNewNumber(event.target.value)
    }

  const rows = () => persons.map(
    person => <PersonsInfo key={person.name} name={person.name} number={person.number}/>
    )

    return (
      <div>
        <h2>Phonebook</h2>
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