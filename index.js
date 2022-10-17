require('dotenv').config()
const mongoose = require('mongoose')
const express = require('express')
const models = require('./models/models')
const cors = require('cors')
const fileUpload = require('express-fileupload')
const router = require('./routes/index')
const errorHandler = require('./middleware/ErrorHandlerMiddleware')
const path = require('path')

const PORT = process.env.PORT || 3200

const app = express()
app.use(cors())
app.use(express.json())
app.use(express.static(path.resolve(__dirname, 'static')))
app.use(fileUpload({}))
app.use('/api', router)
app.use(errorHandler)

const start = async () => {
   try {
      mongoose.connect('mongodb+srv://admin:admin@cluster0.3thhb8k.mongodb.net/online-store').then(() => {
         app.listen(PORT, () => console.log(`Server has been started on http://localhost:${PORT}/`))
      })
   } catch (error) {

   }
}

start()