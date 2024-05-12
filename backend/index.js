const connectToMongo = require('./db');
const express = require('express')

connectToMongo();

const app = express()
const port = 5000

app.use(express.json());

app.use('/api/auth', require('./routes/auth.js'))
app.use('/api/note', require('./routes/note.js'))

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})