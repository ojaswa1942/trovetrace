const express=require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt-nodejs');
const cors = require('cors');
const knex = require('knex');
const xss = require('xss');
const cookieParser = require('cookie-parser');
const signin = require('./controllers/signin');
const profilex = require('./controllers/profilex');
const withAdmin = require('./controllers/withAdmin');
const withAuth = require('./middleware');
const lost = require('./controllers/lost');
const easter = require('./controllers/easter');
require("dotenv").config();

const db = knex({
  client: 'mysql',
  connection: {
  	// connectionString: process.env.DATABASE_URL,
  	// ssl: true
    host : 'infotsav.in',
    user : 'infotsav',
    password : 'tukki@123',
    database : 'infotsav'
  }
});

const dbTrace = knex({
  client: 'mysql',
  connection: {
    // connectionString: process.env.DATABASE_URL,
    // ssl: true
    host : 'infotsav.in',
    user : 'infotsav',
    password : 'tukki@123',
    database : 'tracetrove'
  }
});

const app=express();

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(cookieParser());

app.get('/api', (req,res)=>{ res.send('it is working')});
app.post('/api/signin', (req,res)=> {signin.handleSignin(req, res, db, bcrypt, xss)});
app.post('/api/easterRedeem', withAuth, (req,res)=>{easter.handleEasterRedeem(req, res, db, xss)});
app.post('/api/easterScore', (req,res)=>{easter.fetchScore(req, res, db)});
app.post('/api/lost', (req,res)=>{lost.handleLostUpdate(req, res, db)});
app.get('/api/logout', (req, res) => {res.clearCookie('token'); res.status(301).redirect('/login');});
app.get('/api/profilex', withAuth, (req, res) => {profilex.handleProfile(req, res, db)});
app.get('/api/checkAdmin', withAdmin, (req, res) => {
  res.sendStatus(200);
});
app.get('/api/checkToken', withAuth, (req, res) => {
  res.sendStatus(200);
});

const PORT = process.env.PORT || 3003
app.listen(PORT, ()=>{
	console.log(`We are on on port ${PORT}!`);
})
