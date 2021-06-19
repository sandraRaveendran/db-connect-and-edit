const express = require('express');
const moment = require('moment');

const apiRoutes = require('./server/apiRoutes');


const app = express();
app.use(express.json());

app.use('/api', apiRoutes());

app.listen(3000, () => {
    console.log('Server is up and and running in port 3000');
})




  