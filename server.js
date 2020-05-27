const express = require('express');
const bcrypt = require('bcrypt');
const saltRounds = 10;
const myPlaintextPassword = 's0/\/\P4$$w0rD';
const someOtherPlaintextPassword = 'not_bacon';
const cors = require('cors');
const knex = require('knex');

const register = require('./controllers/register');
const signin = require('./controllers/signin');
const profile = require('./controllers/profile');
const image = require('./controllers/image');

const db = knex({
  client: 'pg',
  connection: {
    host : '127.0.0.1',
    user : 'stephenstocking',
    password : '',
    database : 'smart-brain'
  }
});

const app = express();

const findUser = (req, res) => {
	const { id } = req.params;
	let found = false;
	database.users.forEach(user => {
		if (user.id === id) {
			found = true;
			return res.json(user);
		}
	})
	if (!found) {
		res.status(400).json('not found');
	} 
}

app.use(express.json());
app.use(cors());

app.get('/', (req, res)=> {
	res.send('it is working!');
})
app.post('/signin', (req, res) => { signin.handleSignin(req,res,db,bcrypt) })
app.post('/register', (req, res) => { register.handleRegister(req,res,db,bcrypt) })
app.get('/profile/:id', (req,res) => { profile.handleProfile(req,res,db) })
app.put('/image', (req,res) => { image.handleImage(req,res,db) })
app.post('/imageurl', (req,res) => { image.handleApiCall(req,res) })


app.listen(process.env.PORT, ()=> {
	console.log(`app is running on port ${process.env.PORT}`)
});

