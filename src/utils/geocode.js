const request = require('request')

const geoCode = (address, callback) => {
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/'+encodeURIComponent(address)+'.json?access_token=pk.eyJ1IjoiZGlwZXNoMjY3IiwiYSI6ImNrY3ZqNHY5NTA0cHczMWxhMGU1ZWoxeDUifQ.Y0dBtyW4XvHLkkmKpmsYKw&limit=1'

    request({ url:url, json: true }, (error, {body}) => {
        if (error) {
            callback("There was an error in geoCode call", undefined)
        } else if (body.features.length === 0) {
            callback('Unable to find location. Try another search.', undefined)
        } else {
            console.log(body.features[0].center[1])
            console.log(body.features[0].center[0])
            console.log(body.features[0].place_name)
            callback(undefined, {
                location: body.features[0].place_name,
                latitude: body.features[0].center[1],
                longitude: body.features[0].center[0]
            })
        }
    })
}

module.exports = geoCode