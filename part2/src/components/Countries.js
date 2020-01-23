import React, {useState,useEffect} from 'react'
import axios from 'axios'
    
// const Country = ({country, search}) => {

//     const NAME = country.toUpperCase()
//     const FILTER = search.toUpperCase()
//     console.log('NAME.search(FILTER): ', NAME.search(FILTER))
//     if(NAME.search(FILTER) > -1)
//    { 
//        return(
//         <li>
//            {country} 
//         </li>
//     )
//     } else return(null)
// }

    const CountryList = ({list, info, setShowInfo, showInfo,setCountryResult, countryResult}) => {
    let countryName = '...'
    let RESULT = []
    console.log('START')

    const handleViewClick = (country) => {
        countryName = country
        console.log(countryName, ' view button clicked.')
        //console.log('result var (from handleViewClick): ', result)

        info.forEach(element => {
        if(element.name === countryName)
        {
          //result = true
          if(!showInfo)
          setShowInfo(!showInfo)

          console.log('element.name: ', element.name)
          console.log('countryName: ', countryName)
          console.log(countryName, 'info: ', element)
          setCountryResult(element)
        }
        });        
    }

    console.log(list, 'length: ', list.length)
    if(list.length > 10)
    setShowInfo(false)
    if(list.length < 11)
    {
        //set result view state to true if search is one result
        //change view to respective info
        if(list.length === 1)
        {
            if(!showInfo && countryResult !== list[0].name)
            setShowInfo(!showInfo)

            countryName = list[0].name
            //console.log('countryName: ',countryName)
            info.forEach(element => {
                
                if(element.name === countryName)
                {
                  console.log('element.name: ', element.name)
                  console.log('countryName: ', countryName)
                  console.log(countryName, 'info: ', element)
                  setCountryResult(element)
                }
            });
        }


        RESULT = list.map(country => <li 
        key={country.name}>{country.name}
        {/* <button onClick ={() => console.log(country, ': view button clicked.')}>view</button> */}
        {/* <button onClick={() => handleView({country, info,result})} >view</button> */}
        {/* <button type='button' onClick={() => handleViewClick(country)}>view</button> */}
        <button type='button' onClick={() => handleViewClick(country.name)}>{(showInfo && countryResult === country.name) ? "hide" : "view"}</button>
        </li>
        );
        
        return RESULT
    }
    else
        return(null)
        
}


const DisplayView = ({countryName, info}) => {
    return(
            <div>
            <h3>{countryName}</h3>
            <p>
                Captial: {info.capital} <br/>
                Population: {info.population} <br/>
            </p>
            <h3> Languages </h3>
            <ul>
                {info.languages.map(item => <li key={item.name}>{item.name}</li>)}
            </ul>
            <img src={info.flag} alt='flag' style={{height:"80px", width: "80px"}}/>
            </div>
    )
}

const Countries = () =>
{

    const countriesGet = 'https://restcountries.eu/rest/v2/all'
    const [search, setSearch] = useState('')
    const [countries, setCountries] = useState([])
    const [countryNames, setCountryNames] = useState([])
    const [showInfo,setShowInfo] = useState(false)
    const [countryResult, setCountryResult] = useState('')
    //const [countryList, setCountryList] = useState([])
    //const showView = useState(false) // 0 multi result  view // 1 single result view
    const handleCountryChange = (event) => {
        console.log(event.target.value)
        setSearch(event.target.value)
        //for DEBUG
        // countries.forEach(element=> {
        //     const name = element.name
        //     console.log('element.name: ',name)
        // })
    }

    const handleKeyDown = (event) => {
        console.log('key pressed: ', event.key)
        if(event.key === "Backspace" && showInfo)
        setShowInfo(false)
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
    //console.log('NAME.search(FILTER): ', NAME.search(FILTER))
    if(NAME.search(FILTER) > -1)
   { 
       list.push({
           name: country    })
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

    const list = narrowList()
    const showCountry = () => showInfo ? <DisplayView key={countryResult.name+'_'} info={countryResult} countryName={countryResult.name}/> : ' '
    //const rows = () => countryNames.map(element => <Country key={element} country={element} search={search}/>)
    const rows = () => <CountryList list ={list} info={countries} 
    setShowInfo={setShowInfo} showInfo={showInfo} setCountryResult={setCountryResult} countryResult={countryResult}/>
    // const info = () => <CountryInfo list = {countries} name={narrowList()} result={viewResult}/>
    // console.log(countryNames)
    //countries.map(element => element.name )
    //console.log('names: ', countryNames)
    return(
        <div>
            <form>
                debug: {search} <br/>
                <input onChange={handleCountryChange} onKeyDown={handleKeyDown}/>
            </form>
            <ul>
            {rows()}
            </ul>
            {showCountry()}
            {/* {info()} */}
            {/* <DisplayCountries countries={countries}/> */}
        </div>
    )
}

export default Countries