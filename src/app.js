const path = require('path')
const express = require('express')
const hbs=require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const app = express()
const port = process.env.PORT || 3000

// Define paths for express config 
const publicDirectoryPath= path.join(__dirname,'../public')
const viewPath = path.join(__dirname,'../templates/views')
const partialsPath = path.join(__dirname,'../templates/partials')

//Setup handlebars and view engine
app.set('view engine', 'hbs')
app.set('views',viewPath)
hbs.registerPartials(partialsPath)

//Setup static public directory
app.use(express.static(publicDirectoryPath))


app.get('/',(req,res) =>{
    res.render('index',{
        name:'weather ',
        title:'Weather App',
        author:'Kuntal Biswas'
    })
})
app.get('/about',(req,res) =>{
    res.render('about',{
        name:'about us',
        title:'About Us',
        author:'Kuntal Biswas'
    })
})
app.get('/help',(req,res) =>{
    res.render('help',{
        name:'help us',
        title:'Help Us',
        author:'Kuntal Biswas'
    })
})
app.get('/weather',(req,res)=>{
    if(!req.query.address){
        return res.send({
            error:'You must provide an address'
        })
    }
    geocode(req.query.address, (error, {latitude,longitude,location}={}) => {
        if (error) {
            return res.send({
                error:error
            })
        }

        forecast(longitude, latitude, (error, forecastData) => {
            if (error) {
                return res.send({
                    error:error
                })
            }

            res.send({
                location:location,
                forecast:forecastData
            })
        })
    })
    
})

app.get('/help/*',(req,res)=>{
    res.render('error',{
        err_name:'This help article is not found!!',
        title:"Error Page"
    })
})

app.get('*',(req,res)=>{
    res.render('error',{
        err_name:'404!!! Page not found!',
        title:"Error Page]"
    })
})



app.listen(port,()=>{
    console.log('Web server is up on port '+port)
})