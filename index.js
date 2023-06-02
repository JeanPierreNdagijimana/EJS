const express = require ('express');
const path = require ('path')
const exphbs = require('express-handlebars')//engines
//const router = require ('Router')
// const moment = require('moment');
const logger = require('./middleware/logger');

const app = express ();

//init middleware
//app.use(logger);

//Handlebars Middleware
app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');

//body parser middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false}));//form submission

//Homepage route
app.get('/', (req, res) => res.render('index'));

//send a normal file
// app.get('/', (req, res) => {
//     res.sendFile(path.join(__dirname, 'public', 'index.html'));
// });

//set a static folder (middleware)
app.use(express.static(path.join(__dirname, 'public')));

//Mber API Routes
app.use('/api/members', require('./routes/api/members'));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`server started on port ${PORT}`));