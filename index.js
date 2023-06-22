const express = require('express')
const cors = require('cors')
const app = express()
const port = 3000

const { logErrors, errorHandler, boomErrorHandler } = require('./middlewares/error.handler')
const routerApi = require('./routes')

const whiteList = [
  'http://localhost:3000',
  'https://myapp.co',
]
const options = {
  origin: (origin, callback) => {
    if (whiteList.includes(origin) || !origin) {
      callback(null, true)
    } else {
      callback(new Error('Origen no permitido'))
    }
  }
}
app.use(cors( options ))

app.use(express.json())

routerApi(app)

app.use(logErrors)
app.use(boomErrorHandler)
app.use(errorHandler)

app.listen(port, () => {
  console.log('Mi port ' + port)
})
