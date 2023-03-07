const express = require('express');
const app = express();
const bodyparser = require('body-parser');
const cors = require('cors');

const PORT = process.env.PORT || 5000;

const homerouter = require('./routers/homerouter');
app.use(
  cors({
    credentials: true,
    origin: [`${process.env.FRONTEND_URL}`],
  })
);

app.use(express.json());
app.use(bodyparser.json());

app.use(express.urlencoded({ extended: true, origin: '*', limit: '50mb' }));

app.use('/', homerouter);

app.listen(PORT, () => {
  console.log('server is up running');
});
