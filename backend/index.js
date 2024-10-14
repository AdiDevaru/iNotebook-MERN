const connectToDb = require('./db');
const express = require('express');

connectToDb()
const app = express();
const PORT = 5000;

//middlewares
app.use(express.json())

app.get('/', (req, res) => {
  res.send('Hello World!');
})

app.use('/api/auth', require('./routes/auth'));
app.use('/api/notes', require('./routes/notes'));

app.listen(PORT, () => {
  console.log(`App listening on port - http://localhost:${PORT}`);
})