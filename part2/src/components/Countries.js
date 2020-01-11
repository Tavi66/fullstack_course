import React, {useState,useEffect} from 'react'
import axios from 'axios'

const DisplayCountries = ({countries}) => {

    return(
        <div>
           {countries} 
        </div>
    )
}

const Countries = () =>
{
    const countriesGet = 'https://restcountries.eu/rest/v2/all'
    const [searchVal, setSearchVal] = useState('')
    const [countries, setCountries] = useState([])
    const [countryNames, setCountryNames] = useState([])
    const handleCountryChange = (event) => {
        console.log(event.target.value)
        setSearchVal(event.target.value)
    }

    useEffect( () => {    
        axios.get(countriesGet)
             .then(response => 
        {
            //get all countries name and info
            const countries = response.data
            console.log(countries)
            setCountries(countries)
        })
    }, [] );
            
    ; 
    //isolate and store countries names
    //BUG: too many renders and invalid function push 
    //bc global arrays are not passed to function, local arrays not initialized
    countries.forEach(element=> {
        const name = element.name
        console.log('element.name: ',name)
        //setCountryNames(countryNames.push(name))
    })

    const rows = () => countries.map(element =><li key={element.name}>{element.name}</li> )
    //countries.map(element => element.name )
    //console.log('names: ', countryNames)
    return(
        <div>
            <form>
                debug: {searchVal} <br/>
                <input onChange={handleCountryChange} />
            </form>
            <ul>
            {rows()}
            </ul>
            {/* <DisplayCountries countries={countries}/> */}
        </div>
    )
}

export default Countries