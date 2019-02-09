const express=require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt-nodejs');
const cors = require('cors');
const knex = require('knex');
const xss = require('xss');
const cookieParser = require('cookie-parser');
const signin = require('./controllers/signin');
const profilex = require('./middleware/profilex');
const withAdmin = require('./middleware/withAdmin');
const withAuth = require('./middleware/withAuth');
const timeCheck = require('./middleware/timeCheck');
const lost = require('./controllers/lost');
const chatbot = require('./controllers/chatbot');
const score = require('./controllers/score');
const question = require('./controllers/question');
const hint = require('./controllers/hint');
const newGame = require('./controllers/newGame');
const serviceAcc = require('./service-accounts.json');
require("dotenv").config();

const db = knex({
  client: 'mysql',
  connection: {
    host : serviceAcc.host,
    user : serviceAcc.user,
    password : serviceAcc.password,
    database : serviceAcc.database
  }
});

const dbTrace = knex({
  client: 'mysql',
  connection: {
    host : serviceAcc.host,
    user : serviceAcc.user,
    password : serviceAcc.password,
    database : 'tracetrove'
  }
});

const app=express();

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(cookieParser());

app.get('/api', (req,res)=>{ res.send('it is working')});
app.post('/api/signin', (req,res)=> {signin.handleSignin(req, res, db, dbTrace, bcrypt, xss)});
app.post('/api/chatbot', withAuth, (req,res)=>{chatbot.handleChatbotResponse(req, res, db, dbTrace, xss)});
app.get('/api/score', (req,res)=>{score.handleHighScore(req, res, dbTrace)});
app.post('/api/lost', (req,res)=>{lost.handleLostUpdate(req, res, db)});
app.get('/api/hint', withAuth, (req,res)=>{hint.handleHint(req, res, db, dbTrace)});
app.get('/api/newGame', withAuth, (req,res)=>{newGame.handleNewGame(req, res, db, dbTrace)});
app.get('/api/logout', (req, res) => {res.clearCookie('token'); res.status(301).redirect('/login');});
app.get('/api/profilex', withAuth, (req, res) => {profilex.handleProfile(req, res, db, dbTrace)});
app.get('/api/checkToken', withAuth, (req, res) => {
  res.sendStatus(200);
});

const PORT = process.env.PORT || 3003
app.listen(PORT, ()=>{
	console.log(`We are on on port ${PORT}!`);
})
