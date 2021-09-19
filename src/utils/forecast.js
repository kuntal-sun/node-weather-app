const request = require('postman-request')

const forecast = (lat,long,callback) => {
    const url = 'http://api.weatherstack.com/current?access_key=4da012e077c1562f4c0fa98b3b97b080&query='+lat+','+long+'&units=m'

    const getData = request({url, json:true},(error,{body}={})=>{
        if (error){
            callback('Unable to connect to weather service!',undefined)
        } else if(body.error){
            callback('Unable to find location',undefined)
        }else{
            callback(undefined,'Current temparature of '+body.location.name+' is '+body.current.temperature+' degree but feels like '+body.current.feelslike+' degree and details are: Wind Speed:'+body.current.wind_speed+', Chances of rain:'+body.current.precip+ '% , Humidity:'+body.current.humidity)
        }
    })
}

module.exports= forecast