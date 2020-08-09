const request = require('request')

const forecast = (lat, long, callback)=>{

    const weatherUrl = 'http://api.weatherstack.com/forecast?access_key=41e00794e8f2d4fcd160d8f4414c0c14&query='+lat+','+long+'&units=f'
    console.log(weatherUrl)
    request({url:weatherUrl,json:true}, (error, response)=>{
        
        if(error){callback('Cannot call API', undefined)}
        else if (response.body.error){callback('Unable to find locaion',undefined)}
        else{
            const body = response.body
            const data = {
                mintemp:body.location.name,
                //'maxtemp':body.forecast.maxtemp,
            }
            callback(undefined,data)
        }
    })
}
module.exports = forecast
