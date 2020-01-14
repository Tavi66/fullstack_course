import React, {useState,useEffect} from 'react'
import axios from 'axios'
    
const Country = ({country, search}) => {

    const NAME = country.toUpperCase()
    const FILTER = search.toUpperCase()
    console.log('NAME.search(FILTER): ', NAME.search(FILTER))
    if(NAME.search(FILTER) > -1)
   { 
       return(
        <li>
           {country} 
        </li>
    )
    } else return(null)
}

const CountryList = ({list}) => {
    console.log(list, 'length: ', list.length)
    if(list.length < 11)
    {
        const result = list.map(country => <li key={country}>{country}</li>)
        console.log('result: ', result)
        return result
    }
    else
    return(null)
}

const CountryInfo = ({list,name}) => {
        console.log('name: ',name)
    if(name.length === 1)
    {
        let info = {}
        list.forEach(country => {
            if(country.name === name[0])
            {    
                info = country
            }
        })
        console.log('Info: ', info)
                return(
                <div>
                <h3>{name[0]}</h3>
                <p>
                    Captial: {info.capital} <br/>
                    Population: {info.population} <br/>
                    <h3> Languages </h3>
                    <ul>
                        {info.languages.map(item => <li>{item.name}</li>)}
                    </ul>
                </p>
                <img src={info.flag} alt='flag' style={{height:"80px", width: "80px"}}/>
                </div>
                ) 
    } else return(null)
}

const Countries = () =>
{
    const countriesGet = 'https://restcountries.eu/rest/v2/all'
    const [search, setSearch] = useState('')
    const [countries, setCountries] = useState([])
    const [countryNames, setCountryNames] = useState([])
    const [countryList, setCountryList] = useState([])

    const handleCountryChange = (event) => {
        console.log(event.target.value)
        setSearch(event.target.value)
        //for DEBUG
        // countries.forEach(element=> {
        //     const name = element.name
        //     console.log('element.name: ',name)
        // })
    }

    useEffect( () => {    
        axios.get(countriesGet)
             .then(response => 
        {
            //get all countries name and info
            const countries = response.data
            console.log(countries)
            setCountries(countries)
            const cNames = countries.map(country => country.name) 
            setCountryNames(cNames)
            console.log('country names: ',cNames)
        });    
    }, [] );
    

    //isolate and store countries names
    //BUG: too many renders and invalid function push 
    //bc global arrays are not passed to function, local arrays not initialized
    // countries.forEach(element=> {
    //     const name = element.name
    //     console.log('element.name: ',name)
    //     //setCountryNames(countryNames.push(name))
    // })

    const narrowList = () => {

    const list = []
    countryNames.forEach( country => 
    {
    const NAME = country.toUpperCase()
    const FILTER = search.toUpperCase()
    console.log('NAME.search(FILTER): ', NAME.search(FILTER))
    if(NAME.search(FILTER) > -1)
   { 
       list.push(country)
    }
    }
    )

    console.log(list, 'list length: ', list.length)
    return list
    // if(list.length < 11)     
    // {
    //     setCountryList(list)
    //     console.log('list. ',list)
    // }
    // else
    // {
    //     setCountryList([])
    //     console.log('list. ',list)
    // }
    }
    //const rows = () => countryNames.map(element => <Country key={element} country={element} search={search}/>)
    const rows = () => <CountryList list ={narrowList()}/>
    const info = () => <CountryInfo list = {countries} name={narrowList()}/>
    // console.log(countryNames)
    //countries.map(element => element.name )
    //console.log('names: ', countryNames)
    return(
        <div>
            <form>
                debug: {search} <br/>
                <input onChange={handleCountryChange} />
            </form>
            <ul>
            {rows()}
            </ul>
            {info()}
            {/* <DisplayCountries countries={countries}/> */}
        </div>
    )
}

export default Countries