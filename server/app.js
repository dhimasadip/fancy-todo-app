require('dotenv').config()
const express = require('express')
const app = express()
const routes = require('./routes')
const cors = require('cors')
const ErrorHandler = require('./middleware/errorHandler')
const port = process.env.PORT || 4000

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true}))
app.use('/', routes)
app.use(ErrorHandler)

app.listen(port, () => {
    console.log(`App running on http://localhost:${port}`)
})