const connectToDb = require('./db');
const express = require('express');
const cors = require('cors')

connectToDb()
const app = express();
const PORT = 5000;

//middlewares
app.use(express.json())
app.use(cors())

app.get('/', (req, res) => {
  res.send('Hello World!');
})

app.use('/api/auth', require('./routes/auth'));
app.use('/api/notes', require('./routes/notes'));

app.listen(PORT, () => {
  console.log(`iNotebook Backend listening on port - http://localhost:${PORT}`);
})