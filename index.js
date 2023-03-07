require('dotenv').config();
const express = require('express');
const app = express();
const bodyparser = require('body-parser');
const cors = require('cors');

const PORT = process.env.PORT || 5000;

const homerouter = require('./routers/homerouter');
console.log(process.env.ENVIRONMENT);
app.use(
  cors({
    credentials: true,
    origin:
      process.env.ENVIRONMENT == 'DEV' ? '*' : `${process.env.FRONTEND_URL}`,
  })
);
app.use(
  express.urlencoded({
    extended: true,
    origin:
      process.env.ENVIRONMENT == 'DEV' ? '*' : `${process.env.FRONTEND_URL}`,
  })
);

app.use(express.json());
app.use(bodyparser.json());

app.use('/', homerouter);

app.listen(PORT, () => {
  console.log('server is up running');
});
