//create our mongoose model class
const mongoose = require('mongoose');
//pull one property of mongoose object
//const Schema = mongoose.Schema;
//Destructuring
const { Schema } = mongoose;

const userSchema = new Schema({
  googleId: String,
  credits: { type: Number, default: 0 }
});

//create an actual Model class to create a new collection called users
mongoose.model('users', userSchema);
