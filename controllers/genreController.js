const Genre = require("../models/genre");
const Book = require("../models/book");
const { body, validationResult } = require("express-validator");
const asyncHandler = require("express-async-handler");

// list all genres
exports.genre_list = asyncHandler(async (req, res, next) => {
  const allGenres = await Genre.find().sort({ name: 1 }).exec();

  res.render("genre_list", {
    title: "Genre List",
    genre_list: allGenres,
  });
});

// specific genre
exports.genre_detail = asyncHandler(async (req, res, next) => {
  const [genre, booksInGenre] = await Promise.all([
    Genre.findById(req.params.id).exec(),
    Book.find({ genre: req.params.id }, "title summary").exec(),
  ]);
  if (genre === null) {
    const err = new Error("Genre not found.");
    err.status = 404;
    return next(err);
  }
  res.render("genre_detail", {
    title: "Genre detail",
    genre: genre,
    genre_books: booksInGenre,
  });
});

// show genre create form on get
exports.genre_create_get = (req, res, next) => {
  res.render("genre_form", {
    title: "Create Genre",
    genre: null,
    errors: null,
  });
};

// send genre create form on post
exports.genre_create_post = [
  //validate and sanitize the field
  body("name", "Genre name must contain at least 3 characters")
    .trim()
    .isLength({ min: 3 })
    .escape(),

  // process request
  asyncHandler(async (req, res, next) => {
    // extract validation errors
    const errors = validationResult(req);

    const genre = new Genre({
      name: req.body.name,
    });

    if (!errors.isEmpty()) {
      // there are errors, render the form again
      res.render("genre_form", {
        title: "Create Genre",
        genre: genre,
        errors: errors.array(),
      });
      return;
    } else {
      const genreExists = await Genre.findOne({
        name: req.body.name,
      })
        .collation({ locale: "en", strength: 2 })
        .exec();
      if (genreExists) {
        // genre with this name already exists
        res.redirect(genreExists.url);
      } else {
        await genre.save();
        res.redirect(genre.url);
      }
    }
  }),
];

// show genre delete form on get
exports.genre_delete_get = asyncHandler(async (req, res, next) => {
  res.send("get");
});

// send genre delete form on post
exports.genre_delete_post = asyncHandler(async (req, res, next) => {
  res.send("post");
});

// show genre update form on get
exports.genre_update_get = asyncHandler(async (req, res, next) => {
  res.send("get");
});

// send genre update form on post
exports.genre_update_post = asyncHandler(async (req, res, next) => {
  res.send("post");
});
