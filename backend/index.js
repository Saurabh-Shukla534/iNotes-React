const connectToMongo = require('./db');
const express = require('express')
var cors = require('cors')

connectToMongo();

const app = express()
const port = 5000

app.use(express.json());
app.use(cors());

app.use('/api/auth', require('./routes/auth.js'))
app.use('/api/note', require('./routes/note.js'))

app.listen(port, () => {
  console.log(`iNotes backend listening on port ${port}`)
})