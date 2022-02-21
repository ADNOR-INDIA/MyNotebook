const connectToMongodb = require('./db');
const express = require('express')

connectToMongodb();


const app = express() 
const port = 5000

app.use(express.json())  //middlewarecd 
// available routes
// app.get('/', (req, res) => {
//   res.send('Hello World!')
// })

app.use('/api/auth', require('./routes/auth'))
app.use('/api/notes', require('./routes/notes'))

app.listen(port, () => {
  console.log(`Example app listening on http://localhost:${port}`)
})
 
