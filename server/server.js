require('./config/config');

const express = require('express');
const bodyParser = require('body-parser');

const {mongoose} = require('./db/mongoose');

let {Greeting} = require('./models/greeting');

let app = express();

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());


app.use((req, res, next) => {
  let now = new Date().toString();
  console.log(`${now}: ${req.method} ${req.url}`);
  next();
})

app.get('/learngreeting', (req, res, next) => {
  let greeting = new Greeting({text: "Hello World!"})
  greeting.save().then(() => {
    res.status(200).send("I have learned to say greeting.");
  }).catch((err) => next(err));
})

app.get('/saygreeting', (req, res, next) => {
  Greeting.findOne().then((todo) => {
    if (!todo) {return res.status(404).send("I have not learned anything!")};
    res.status(200).send({
      "messages": [{"text" : todo.text}]
    })
  }).catch((err) => next(err));
});

/// Test for server error catch
// app.get('/error', (req, res, next) => {
//   try {
//     throw new Error("something bad happened.");
//   }
//   catch (err) {
//     next(err);
//   }
// })

/* catch 404 */
app.use((req, res, next) => {
    res.status(404).send("Path not found");
    //// Render error template if neccesary
    // res.render('404.hbs', {
    //   title: '404: Page Not Found',
    //   errorMessage: 'Page not found'
    // });
});

/* catch 5xx error */
app.use(function (err, req, res, next) {
    console.error(err.stack);
    //// Log error if necessary
    // fs.appendFile('server.log', `5xx Error: ${err.stack}`, (error) => {
    //     if (error) {
    //         console.log('Unable to append to server.log.')
    //     }
    // });
    res.status(500).send('Server Error');
    //// Render error template if neccesary
    // res.header("Content-Type", "text/html");
    //   res.render('5xx.hbs', {
    //   title:'500: Internal Server Error',
    //   errorMessage: 'Internal Server Error - Please contact the server administrator and inform them of the time the error occurred, and anything you might have done that may have caused the error. '
    // });
});

app.listen(process.env.PORT, () => {
  console.log(`Starting server on PORT ${process.env.PORT}`);
})

module.exports = {app};
