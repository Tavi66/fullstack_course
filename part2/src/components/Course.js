import React from 'react'

const Course = ({course}) => {
    
    //console.log(course)
    //maps each course info returning the individual data + calculated total
    const c = course.map(element => {
        //console.log('Element: ', element)
        const parts = element.parts
        //console.log('parts: ',parts, 'id: ',element.id)
    
        const total  = parts.reduce( (sum,part) => {
            //console.log('Exercises: ',part.exercises)
            const t = sum + part.exercises
            return t;
        }, 0)
    
        //console.log('Total: ',total)

        return (    
        <div key={element.id}>
        <h1>{element.name}</h1>
        {parts.map(item => <div key={item.id}>{item.name} {item.exercises}</div> )}
        Total Exercises: {total}    
        </div>  
        )
        })
    
    return (c)
}

export default Course