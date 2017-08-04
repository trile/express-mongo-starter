const {ObjectID} = require('mongodb');

const {Greeting} = require('./../../models/greeting');

const greetingId = new ObjectID();

const greetings = [
  {
    _id: greetingId,
    text: 'Hello World!'
  }
]

const populateGreetings = (done) => {
  Greeting.remove({}).then(()=> {
    return Greeting.insertMany(greetings);
  }).then(() => done());
};

module.exports = {greetings, populateGreetings};
