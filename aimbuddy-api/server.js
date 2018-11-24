const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const bcrypt = require('bcrypt-nodejs')
const knex = require('knex');

const db = knex({
	client: 'pg',
	connection: {
		host: 'aimbuddydb.cvt0y3z6nu9h.us-east-2.rds.amazonaws.com',
		user: 'aimbuddy',
		password: 'Aimbuddy7:00',
		database: 'postgres'
	}
})

const app = express();
app.use(bodyParser.json());
app.use(cors());

//this is the signin route
app.post('/signin', (req,res) => {
	db.select('email', 'hash').from('login')
		.where('email', '=', req.body.email)
		.then(data => {
			const isValid = bcrypt.compareSync(req.body.password, data[0].hash);
			if(isValid) {
				return db.select('*').from('users')
					.where('email', '=', req.body.email)
					.then(user => {
						res.json(user[0])
					})
				.catch(err => res.status(400).json('Unable to get user'))
			} else {
				res.status(400).json({
					'message': 'Wrong credentials'
				})
			}
		})
		.catch(err => res.status(400).json({
					'message': 'Wrong credentials'
				}))
})

//this is the register route, using transactions.
app.post('/register', (req,res) => {
	const {name, email, password} = req.body;
	const hash = bcrypt.hashSync(password);
		db.transaction(trx => {
			trx.insert({
				hash: hash,
				email: email
			})
			.into('login')
			.returning('email')
			.then(loginEmail => {
				return trx('users')
					.returning('*')
					.insert({
						email: loginEmail[0],
						name: name,
						joined: new Date()
					})
					
			})
			.then(trx.commit)
			.catch(trx.rollback)
		})
		.catch(err => res.status(400).json('Unable to register user'))
})

app.listen(3000, () => {
	console.log('app is running on port 3000');
})