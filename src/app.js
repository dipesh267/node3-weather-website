const path = require('path')
const express = require('express')
const hbs = require('hbs')
const currentWeather = require('./utils/currentWeather')
const geoCode = require('./utils/geocode')
//const geoCode = require('../../weather-app/utils/geocode')

const { response } = require('express')

const app = express()
const port = process.env.PORT || 3000   //to pull port provided by Heroku
const publicDirectory = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')//default path express expects is "views" but if dno't want it to be called
                                                   //views, then we have to create a path to it.
const partialsPath = path.join(__dirname,'../templates/partials')

app.set('view engine','hbs')
app.set('views', viewsPath)  //letting express know where the views dir is since we moved it inside templates dir.
hbs.registerPartials(partialsPath) //letting the hbs module know where the partials dir is. 

app.use(express.static(publicDirectory))

app.get('',(req,res)=>{
    res.render('index', {   //first value is name of page to render and second value is the object used to fill the index page
        title:'Weather app',
        name:'Dipesh manandhar'
    })
})

app.get('/about',(req, res)=>{
    res.render('about',{
        title: 'About Page',
        name:'Dipesh Manandhar',
        age:21
    })
})

app.get('/help',(req, res)=>{
    res.render('help',{
        title: 'Help page',
        name:'Dipesh Manandhar',
        message:'this is an SOS call'
    })
})

app.get('/weather',(req,res)=>{
    if(!req.query.address){
        return res.send({
            error:'you must send a city name'
        })
    }
    geoCode(req.query.address, (error, {lattitude, longitude, location}={})=>{   //geoCode('arugument', (function)=>{})
        if(error){ 
            return res.send({error})
        }
        currentWeather(lattitude,longitude, (error, forecastData)=>{
            if(error){
                return res.send({error})
            }
            res.send({
                forecast:forecastData,
                location,
                address: req.query.address,
            })
        })
            
    })
})

app.get('/help/*',(req, res)=>{
    res.render('404',{
        errorMessage:'Help page not found',
        name: 'Dipesh'
    })
})

app.get('*',(req,res)=>{
    res.render('404',{
        errorMessage:'This page does not exist',
        name: 'Dipesh',
    })
})

//app.listen(3000, ()=>{ //3000 if we're running locally
app.listen(port, ()=>{
    console.log('server started on port '+  port)
})