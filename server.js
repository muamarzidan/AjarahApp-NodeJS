const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
const multer = require('multer');
const path = require('path');
const port = 5000;

const quizRoute = require('.//routes/quiz');
const jobsheetRoute = require('.//routes/jobsheet');
const userRoute = require('.//routes/user');
const tokohRoute = require('.//routes/tokoh');
const peristiwaRoute = require('.//routes/peristiwa');
const detailRoute = require('.//routes/detail');

const fileStorage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, "images");
    },
    filename: function (req, file, cb) {
      cb(null, new Date().getTime() + "-" + file.originalname);
    }
  });
  
  const fileFilter = (req, file, cb) => {
      if (file.mimetype === "image/png" || file.mimetype === "image/jpg" || file.mimetype === "image/jpeg") {
          cb(null, true);
      } else {
          cb(null, false);
      }
  };

app.use(cors());
app.use(express.json());
app.use('/images', express.static(path.join(__dirname, 'images')));
app.use(express.static('images'));
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(multer({storage: fileStorage, fileFilter: fileFilter}).single("image"));
app.use ((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    next();
});

const db = require('./models');
db.sequelize.sync();

app.get('/', (req, res) => {
    res.send('Hello World!');
})

app.use('/api/quiz', quizRoute);
app.use('/api/jobsheet', jobsheetRoute);
app.use('/api/user', userRoute);
app.use('/api/pahlawan', tokohRoute);
app.use('/api/peristiwa', peristiwaRoute);
app.use('/api/detail', detailRoute);

app.listen(port, () => {
    console.log(`Server running on port ${port}`)
})