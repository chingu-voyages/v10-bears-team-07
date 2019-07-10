if (process.env.NODE_ENV != 'production') {
  require('dotenv').config({ path: '.env.development.local' });
}

var express = require('express');
var cors = require('cors');
var morgan = require('morgan');

var app = express();
app.use(express.json(), cors(), morgan('dev'));

app.get('/api', (req, res) => {
  res.send({ message: `Response to ${req.method} on endpoint ${req.path}` });
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => console.info(`App connected to port ${PORT}`));

var mongoose = require('mongoose');
const DB_URI = process.env.MONGODB_URI || 'mongodb://localhost/v10-bears-07';
mongoose.connect(DB_URI, { useNewUrlParser: true }, () =>
  console.info(`Connected to ${DB_URI}`)
);
