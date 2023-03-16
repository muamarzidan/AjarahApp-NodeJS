const express = require('express');
const bodyParser = require('body-parser');
const fileUpload = require('express-fileupload');
const cors = require('cors');
const app = express();

const port = 5000;

const quizRoute = require('.//routes/quiz');
const jobsheetRoute = require('.//routes/jobsheet');
const userRoute = require('.//routes/user');
const tokohRoute = require('.//routes/tokoh');
const peristiwaRoute = require('.//routes/peristiwa');
const detailRoute = require('.//routes/detail');

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// parse application/json
app.use(bodyParser.json());
// parse the raw data
app.use(bodyParser.raw());
// parse text
app.use(bodyParser.text());
app.use(fileUpload()); // configure fileupload


const db = require('./models');
db.sequelize.sync();

app.get('/', (req, res) => {
    res.send('Hello World!');
})

app.use('/api/quiz', quizRoute);
app.use('/api/jobsheet', jobsheetRoute);
app.use('/api/user', userRoute);
app.use('/api/tokoh', tokohRoute);
app.use('/api/peristiwa', peristiwaRoute);
app.use('/api/detail', detailRoute);

app.listen(port, () => {
    console.log(`Server running on port ${port}`)
})