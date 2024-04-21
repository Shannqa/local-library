const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const GenreSchema = new Schema({
  name: { type: String, required: true, minLength: 3, maxLength: 100 },
});

GenreSchema.virtual("url").get(function () {
  // dont use arrow function because this obj is needed
  return `/catalog/genre/${this._id}`;
});

module.exports = mongoose.model("Genre", GenreSchema);
