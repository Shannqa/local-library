const BookInstance = require("../models/bookinstance");
const asyncHandler = require("express-async-handler");

// list all book instances
exports.bookinstance_list = asyncHandler(async (req, res, next) => {
  const allBookInstances = await BookInstance.find().populate("book").exec();

  res.render("bookinstance_list", {
    title: "Book Instance List",
    bookinstance_list: allBookInstances,
  });
});

// specific book instance
exports.bookinstance_detail = asyncHandler(async (req, res, next) => {
  const bookInstance = await BookInstance.findById(req.params.id)
    .populate("book")
    .exec();

  if (bookInstance === null) {
    // No results.
    const err = new Error("Book copy not found");
    err.status = 404;
    return next(err);
  }

  res.render("bookinstance_detail", {
    title: "Book:",
    bookinstance: bookInstance,
  });
});

// show bookinstance create form on get
exports.bookinstance_create_get = asyncHandler(async (req, res, next) => {
  res.send("get");
});

// send bookinstance create form on post
exports.bookinstance_create_post = asyncHandler(async (req, res, next) => {
  res.send("post");
});

// show bookinstance delete form on get
exports.bookinstance_delete_get = asyncHandler(async (req, res, next) => {
  res.send("get");
});

// send bookinstance delete form on post
exports.bookinstance_delete_post = asyncHandler(async (req, res, next) => {
  res.send("post");
});

// show bookinstance update form on get
exports.bookinstance_update_get = asyncHandler(async (req, res, next) => {
  res.send("get");
});

// send bookinstance update form on post
exports.bookinstance_update_post = asyncHandler(async (req, res, next) => {
  res.send("post");
});
