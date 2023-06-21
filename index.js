const express = require('express')
const app = express()
const port = 3000

const { logErrors, errorHandler, boomErrorHandler } = require('./middlewares/error.handler')
const routerApi = require('./routes')

app.use(express.json())

routerApi(app)

app.use(logErrors)
app.use(boomErrorHandler)
app.use(errorHandler)

app.listen(port, () => {
  console.log('Mi port ' + port)
})
