const express = require('express');
const hbs = require('hbs');
const fs = require('fs');
const app = express();
const port = process.env.PORT;


//register partial templates
hbs.registerPartials(__dirname + '/views/partial');

//setup template engine
app.set('view engine', 'hbs');


//register a hbs helper for partials
hbs.registerHelper('year', () => new Date().getFullYear());

//register a hbs helper for Uppercase
hbs.registerHelper('ScreamIt', (text) => {
	return text.toUpperCase();
});

//create a middleware
app.use( (req, res, next) => {
	var now = new Date().toString();
	var log = `${now}: ${req.method} ${req.url}`;
	fs.appendFile('app.log', log + '\n', (err) => {
		if(err) {
			console.log('Unable to append data to file');
		}
	});
	console.log(log);
	next();
});


//maintenance middleware
// app.use((req, res, next) => {
// 	res.render('maintenance.hbs');
// 	next();
// });


//calling a static page
app.use(express.static(__dirname + '/public'));



app.get('/', (req, res) => {
	res.render('home.hbs', {
		pageTitle: 'Home Page',
		welcomeMessage: 'Welcome to HomePage'
	});
});


app.get('/about', (req, res) => {
	res.render('about.hbs', {
		pageTitle: 'About Page'
	});
});


app.get('/bad', (req, res) => {
	res.send({
		errorMessage: 'Unable to fetch the request '
	});	
});



app.listen(port);