const express = require('express');
const app = express();
const routerRPS = require("./src/router/RPS/routes");
const GAMES = require('./src/db/games');
const find = require('./src/db/find');
// const session = require('express-session');
const bodyParser = require('body-parser');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
// app.use(session({
//     secret: 'tu_secreto_aqui',
//     resave: false,
//     saveUninitialized: true
//   }));
app.use(express.static('public'));
app.use(find(GAMES, "RPS" , "id")[0].url, routerRPS);


app.get("/games",(req,res)=>{
    res.json(GAMES).status(200)
})

app.get("/",(req,res)=>{
    res.sendFile(__dirname + '/public/pages/index.html');
})

app.listen(4000,()=>{
    console.log("http://localhost:4000/");
})