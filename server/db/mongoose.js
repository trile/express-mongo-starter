/**
 * Created by trile on 12/8/16.
 */
let mongoose = require('mongoose');

mongoose.Promise = global.Promise;
mongoose.connect(process.env.MONGODB_URI, {useMongoClient: true})
  .then(() => {
    console.log('Successfully connect to the database.')
  })
  .catch(() => {
    console.log('Could not connect to the database. Server terminated!')
    process.exit(1);
  })

module.exports = {mongoose};
