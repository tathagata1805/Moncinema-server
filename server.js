const http = require('http');
const app = require('./app');

// app.set('port', process.env.PORT || 3000);
// const server = http.createServer(app);

app.get('/', function(req,res){
    res.send("working");
})

app.listen(process.env.PORT || 3000);