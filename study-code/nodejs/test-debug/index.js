const express = require('express')
const app = express()

app.get('/', (req, res) => {
    console.log('test')
    res.send('Hello World!')
})

app.listen(3000, () => console.log('Example app listening on port 3000!'))
