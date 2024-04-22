const mongoose = require("mongoose");
const { DateTime } = require("luxon");

const Schema = mongoose.Schema;

const AuthorSchema = new Schema({
  first_name: { type: String, required: true, maxLength: 100 },
  family_name: { type: String, required: true, maxLength: 100 },
  date_of_birth: { type: Date },
  date_of_death: { type: Date },
});

AuthorSchema.virtual("name").get(function () {
  // dont use arrow function because this obj is needed
  let fullname = "";
  if (this.first_name && this.family_name) {
    fullname = `${this.family_name}, ${this.first_name}`;
  }
  return fullname;
});

AuthorSchema.virtual("url").get(function () {
  // dont use arrow function because this obj is needed
  return `/catalog/author/${this._id}`;
});

AuthorSchema.virtual("dates_formatted").get(function () {
  // dont use arrow function because this obj is needed

  let birth = this.date_of_birth
    ? DateTime.fromJSDate(this.date_of_birth).toLocaleString(DateTime.DATE_MED)
    : "";
  let death = this.date_of_death
    ? DateTime.fromJSDate(this.date_of_death).toLocaleString(DateTime.DATE_MED)
    : "";

  if (this.date_of_birth && this.date_of_death) {
    return `(${birth} - ${death})`;
  } else if (this.date_of_birth) {
    return `(born ${birth})`;
  } else if (this.date_of_death) {
    return `(died ${death})`;
  } else {
    return "";
  }
});

module.exports = mongoose.model("Author", AuthorSchema);
