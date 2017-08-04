let mongoose = require('mongoose');

let GreetingSchema = new mongoose.Schema({
  text: {
    type: String,
    required: true,
    minlength: 3,
    trim: true
  }
});

let Greeting = mongoose.model('Greeting', GreetingSchema);

module.exports = {Greeting};
