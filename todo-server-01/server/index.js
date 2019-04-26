const express = require('express')

const port = 3030
const app = express()

app.get('/', (req, res) => {
  res.send('Response from todo-server')
})

app.listen(port, () => {
  console.log(`Events API server is listening on port ${port}`)
})
