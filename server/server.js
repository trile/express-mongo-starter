require('./config/config');

const express = require('express');
const bodyParser = require('body-parser');

let app = express();

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());


app.use((req, res, next) => {
  let now = new Date().toString();
  console.log(`${now}: ${req.method} ${req.url}`);
  next();
})

app.post('/check-number', (req, res, next) => {
  console.log(req.body);
  res.status(200).send({
    "messages": [
        {"text": "Cám ơn bạn đã cung cấp thông tin cho chúng tôi."}
    ]
  })
})



app.listen(process.env.PORT, () => {
  console.log(`Starting server on PORT ${process.env.PORT}`);
})

module.exports = {app};
