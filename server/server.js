const express = require('express');
const app = express();
const cors = require('cors')
const fs = require('fs')
const path = require('path')
const PORT = 5000
app.use(cors())
app.use(express.json())
app.use(express.static(path.resolve(__dirname,'..','build')))
app.listen(process.env.PORT || PORT,()=>{
    console.log('server started on port '+PORT)
})