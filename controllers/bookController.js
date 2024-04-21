const Book = require("../models/book");
const Author = require("../models/author");
const Genre = require("../models/genre");
const BookInstance = require("../models/bookinstance");
const asyncHandler = require("express-async-handler");

// list index
exports.index = asyncHandler(async (req, res, next) => {
  const [
    numBooks,
    numBookInstances,
    numAvailableBookInstances,
    numAuthors,
    numGenres,
  ] = await Promise.all([
    Book.countDocuments({}).exec(),
    BookInstance.countDocuments({}).exec(),
    BookInstance.countDocuments({ status: "Available" }).exec(),
    Author.countDocuments({}).exec(),
    Genre.countDocuments({}).exec(),
  ]);

  res.render("index", {
    title: "Local Library Home",
    book_count: numBooks,
    book_instance_count: numBookInstances,
    book_instance_available_count: numAvailableBookInstances,
    author_count: numAuthors,
    genre_count: numGenres,
  });
});

// list all books
exports.book_list = asyncHandler(async (req, res, next) => {
  const allBooks = await Book.find({}, "title author")
    .sort({ title: 1 })
    .populate("author")
    .exec();

  res.render("book_list", {
    title: "Book List",
    book_list: allBooks,
  });
});

// specific book
exports.book_detail = asyncHandler(async (req, res, next) => {
  
  const [book, bookInstances] = await Promise.all([
    Book.findById(req.params.id).populate("author").populate("genre").exec(),
    BookInstance.find({book: req.params.id}).exec()
    ]);
    
    if (book === null) {
      const err = new Error("Book not found.");
      err.status = 404;
      return next(err);
    }
    
    res.render("book_detail", {
      title: book.title,
      book: book,
      book_instances: bookInstances
    })
});

// show book create form on get
exports.book_create_get = asyncHandler(async (req, res, next) => {
  res.send("get");
});

// send book create form on post
exports.book_create_post = asyncHandler(async (req, res, next) => {
  res.send("post");
});

// show book delete form on get
exports.book_delete_get = asyncHandler(async (req, res, next) => {
  res.send("get");
});

// send book delete form on post
exports.book_delete_post = asyncHandler(async (req, res, next) => {
  res.send("post");
});

// show book update form on get
exports.book_update_get = asyncHandler(async (req, res, next) => {
  res.send("get");
});

// send book update form on post
exports.book_update_post = asyncHandler(async (req, res, next) => {
  res.send("post");
});
