import React, {useState,useEffect} from 'react'
import axios from 'axios'
    
const CountryList = ({list, info, setShowInfo, showInfo,setCountryResult, countryResult}) => {
    let countryName = '...'
    let RESULT = []

    const handleViewClick = (country) => {
        //set info to false to hide info if info is already showing
        //when same button is clicked
        if(showInfo && countryResult.name === country)
        setShowInfo(false)
        
        countryName = country
        console.log(countryName, ' view button clicked.')

        //console.log('result var (from handleViewClick): ', result)

        info.forEach(element => {
        if(element.name === countryName)
        {
          if(!showInfo)
          setShowInfo(!showInfo)
          console.log('countryName: ', countryName)
          console.log(countryName, 'info: ', element)
          setCountryResult(element)
        }
        });        
    }

    //console.log(list, 'length: ', list.length)
    if(list.length > 10)
    setShowInfo(false)
    //Show list of countries if length of list is less or equal to 10
    if(list.length < 11)
    {
        if(list.length === 1)
        {
            if(!showInfo && countryResult !== list[0].name)
            setShowInfo(!showInfo)

            countryName = list[0].name
            //console.log('countryName: ',countryName)
            info.forEach(element => {
                
                if(element.name === countryName)
                {
                  console.log('countryName: ', countryName)
                  console.log(countryName, 'info: ', element)
                  setCountryResult(element)
                }
            });
        }

        //map each country in a li element with a button
        RESULT = list.map(country => <li 
        key={country.name}>{country.name}
        {/* <button onClick ={() => console.log(country, ': view button clicked.')}>view</button> */}
        {/* <button onClick={() => handleView({country, info,result})} >view</button> */}
        {/* <button type='button' onClick={() => handleViewClick(country)}>view</button> */}
        <button type='button' onClick={() => handleViewClick(country.name)}>{(showInfo && countryResult.name === country.name) ? "hide" : "view"}</button>
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

//Will request every time. 
//1000 requests monthly limit
const GetWeather = (location) => {
    const url = 'http://api.weatherstack.com/current'
    const params = {
        access_key: process.env.REACT_APP_WEATHERSTACK_API_KEY,
        query: location
    }  

    const [info,setInfo] = useState([])
    const getInfo = () => {
        return axios.get(url, {params})
        .then(response => {
            console.log('response (0): ', response.data)
            return response.data
        });
    }

    useEffect ( () => {
    getInfo()
    .then(response => {
    console.log('response (1): ', response.current)
    let list = []
    list.push(response.current)
    setInfo(list)
    })
    },[])    
    console.log('info(1):', info)
    
    //.current obj
    //Weather in location
    //weather_icons
    //temperature
    //wind_speed wind_dir
    //const data = weatherInfo.data

    return info.length > 0 ? info.map(element => {
    return (
    <div key={location+'_weather'}>
    Temperature: {element.temperature} <br/>
    <img src={element.weather_icons[0]} alt='weather_icon'/> <br/>
    Wind: {element.wind_speed} direction {element.wind_dir}<br/>
        </div>
        )  
    }) :<div></div> 
//    return(<div>
        
//     </div>)
}

const Countries = () =>
{

    const countriesGet = 'https://restcountries.eu/rest/v2/all'
    const [search, setSearch] = useState('')
    const [countries, setCountries] = useState([])
    const [countryNames, setCountryNames] = useState([])
    const [showInfo,setShowInfo] = useState(false)
    const [countryResult, setCountryResult] = useState('')

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
        //console.log('key pressed: ', event.key)
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
            //console.log('country names: ',cNames)
        });    
    }, [] );

    const narrowList = () => {

       const list = []
       countryNames.forEach( country => 
       {
          const NAME = country.toUpperCase()
          const FILTER = search.toUpperCase()
          //console.log('NAME.search(FILTER): ', NAME.search(FILTER))
          if(NAME.search(FILTER) > -1)
            { 
               list.push({ name: country })
            }
       })
       //console.log(list, 'list length: ', list.length)
       return list
    }

    const list = narrowList()
    const showCountry = () => showInfo ? <DisplayView key={countryResult.name+'_'} info={countryResult} countryName={countryResult.name}/> : ' '
    const rows = () => <CountryList list ={list} info={countries} 
    setShowInfo={setShowInfo} showInfo={showInfo} setCountryResult={setCountryResult} countryResult={countryResult}/>
    const weather = () => countryResult !== '' ? <GetWeather location={countryResult.name}/>:' '
    console.log('Weather: ',weather())
    console.log('rows(): ', rows())
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
            {countryResult !== '' ? <h3>Weather in {countryResult.name}</h3>:''}
            {weather()}
            {/* {weather ? <DisplayWeather weatherInfo = {weather}/> :'' } */}
        </div>
    )
}

export default Countries