const Genre = require("../models/genre");
const Book = require("../models/book");
const asyncHandler = require("express-async-handler");

// list all genres
exports.genre_list = asyncHandler(async (req, res, next) => {
  const allGenres = await Genre.find()
    .sort({ name: 1 })
    .exec();
  
  res.render("genre_list", {
    title: "Genre List",
    genre_list: allGenres,
  });
});

// specific genre
exports.genre_detail = asyncHandler(async (req, res, next) => {
  
  
  const [genre, booksInGenre] = await Promise.all([
    Genre.findById(req.params.id).exec(),
    Book.find({genre: req.params.findById}, "title summary").exec()
    ]);
    if (genre === null) {
      const err = new Error("Genre not found.");
      err.status = 404;
      return next(err);
    }
    res.render("genre_detail", {
      title: "Genre detail",
      genre: genre,
      genre_books: booksInGenre
    })
  res.send(`genre detail ${req.params.id}`); 
});

// show genre create form on get
exports.genre_create_get = asyncHandler(async (req, res, next) => {
  res.send("get");
});

// send genre create form on post
exports.genre_create_post = asyncHandler(async (req, res, next) => {
  res.send("post");
});

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
