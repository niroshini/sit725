var express = require("express")
const path = require('path');
var app = express()
var port = process.env.port || 3001;

// Serve static files from the "public" folder
app.use(express.static(path.join(__dirname, 'public')));

app.listen(port,()=>{
    console.log("App listening to: "+port)
})
