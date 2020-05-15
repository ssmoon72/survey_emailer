const mongoose = require('mongoose')
const { Schema } = mongoose;
const RecipientSchema = require('./Recipient');

//_user property add the idea that every survey belongs to a user
//Schema.Types.ObjectId is the id of the user who owns the survey
//ref property in the _user object tells mongoose the reference belongs to the Users collection
const surveySchema = new Schema({
  title: String,
  body: String,
  subject: String,
  recipients: [RecipientSchema],
  yes: {type: Number, default: 0},
  no: {type: Number, default: 0},
  _user: { type: Schema.Types.ObjectId, ref: 'User' },
  dateSent: Date,
  lastResponded: Date
});

mongoose.model('surveys', surveySchema)
