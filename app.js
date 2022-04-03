const express = require('express');
const bodyParser = require('body-parser');
const app = express();

app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', function(req, res){
    res.sendFile(__dirname+"/index.html")
})

app.post("/jsondata", function (req, res) {
    console.log(req.body);
});

app.listen(3000, function(){
    console.log("Server is up and running");
})