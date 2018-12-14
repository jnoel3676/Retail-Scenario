const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const bcrypt = require('bcrypt-nodejs');
const knex = require('knex');

const db = knex({
	client: 'pg',
	connection: {
		host: 'localhost',
		user: '',
		password: '',
		database: 'grocerydb'
	}
});

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
});

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
                        employee_status: false,
						email: loginEmail[0],
						name: name,
						joined: new Date()
					})
					
			})
			.then(trx.commit)
			.catch(trx.rollback)
		})
		.catch(err => res.status(400).json('Unable to register user'))
});

app.post('/new-item', (req,res) => {
    const { item_name, price, stock, supplier_name, section_name } = req.body;
    db.select('supplier_id').from('supplier').where('supplier_name', '=', supplier_name).then(supplier => {
        db.select('section_id').from('section').where('section_name', '=', section_name).then(section => {
            db.insert({
                item_name: item_name,
                price: price,
                amount_in_stock: stock,
                supplier_id: supplier[0].supplier_id,
                section_id: section[0].section_id
            }).into('item').then(success => res.json(success)).finally()
        })
        }
    )
});

app.get('/catalog', (req,res) => {
    return db.select('*').from('item').then(items => {
        res.json(items)
    });
});

app.post('/store-id', (req,res) => {
    const l_name = req.body.name;
    return db.select('store_id').from('employee').where('l_name', '=', l_name).then(employee => {
        res.json(employee[0])
    })

});

app.post('/shift-info', (req,res) => {
    const l_name = req.body.name;
    return db.select('hours').from('shift').where('shift_id', '=',
        db.select('shift_id').from('employee').where('l_name', '=', l_name))
        .then(shift => {
        res.json(shift[0])
    })

});


app.listen(3000, () => {
	console.log('app is running on port 3000');
});