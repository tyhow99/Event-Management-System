const express = require('express')
const cors = require('cors')
const pool = require('./db')
const app = express()
const port = 5000

app.use(cors())
app.use(express())

//create an event
app.post('/Event_Schedule', async (req, res) =>{
    try {
        console.log(req.body)
    } catch (error) {
        console.error(error.message)
    }
})

//create an event
app.post('/Vendor_Information', async (req, res) =>{
    try {
        console.log(req.body)
    } catch (error) {
        console.error(error.message)
    }
})



app.get('/', (req, res) => {
  res.status(200).send('Hello World!');
})

app.listen(port, () => {
  console.log(`App running on port ${port}.`)
})