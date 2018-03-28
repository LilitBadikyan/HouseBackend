const express = require('express');
const bodyparser = require('body-parser');
const app = express();
const Utility = require('./components/utility/services');

app.use(bodyparser.json());
app.use(bodyparser.urlencoded({
  extended: true
}));

app.use(Utility.parseQuery);


const apiV1 = require('./controllers/api');
apiV1.initialize(app);
console.log('CONNECTION !!!');
app.listen(3003);
