const request = require('request')

const getWeather = (lat, long, callback)=>{

    const weatherUrl = 'http://api.weatherstack.com/current?access_key=41e00794e8f2d4fcd160d8f4414c0c14&query='+lat+','+long+'&units=f'
    request({url:weatherUrl,json:true}, (error, response)=>{
        
        if(error){callback('Cannot call API', undefined)}
        else if (response.body.error){callback('Error in calling API',undefined)}
        else{
            const body = response.body
            const data = {
                temperature:body.current.temperature,
                preciptate:body.current.precip,
                weather_description: body.current.weather_descriptions
            }
            callback(undefined,data)
        }
    })
}
module.exports = getWeather
