//const geoCode = require("../../src/utils/geocode")

console.log('client side js is loaded')

// fetch('http://puzzle.mead.io/puzzle').then((response)=>{
//     response.json().then((data)=>{
//         console.log(data)
//     })
// })

const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const messageOne = document.querySelector('#message-1')  //# is for id selector, . is for class slecector
const messageTwo = document.querySelector('#message-2')

weatherForm.addEventListener('submit',(e)=>{
    e.preventDefault() //prevents browser from refreshing page all over
    
    const location = search.value
    messageOne.textContent = 'Fetching data'
    messageTwo.textContent = ''
    fetch('http://localhost:3000/weather?address='+location).then((response)=>{
        response.json().then((data)=>{
            if (data.error){messageOne.textContent=data.error}
            else{
                //console.log(data.location)
                //console.log(data.forecast.temperature)
                //console.log(data.forecast)
                messageOne.textContent = ''
                messageTwo.textContent=data.forecast.temperature
            }
        })
    })
    //console.log(location)
})