const BOOK = require("../models/booksStore");
const User = require("../models/userSchema");
exports.addbook = async (req, res) => {
  try {
    const { name, desciption, price,qty, available, author, category, language } =
      req.body;
    if (name==="" && desciption==="" && price==="" &&qty===""&&author==="" && category==="") {
   
      res.status(200).json({ succuss: false, message: "Invalid Credential" });
    } else {
      const newBook=  await BOOK.create({
        name,
        desciption,
        price,
        qty,
        available,
        author,
        category,
        language,
        user: req.user._id,
        bookImage: req.file ? req.file.filename : "",
      });
      // const newBook = await BOOK.find({});
      res
        .status(200)
        .json({
          succuss: true,
          message: "Book added sucessfuly",
          book: newBook,
        });
    }
  } catch (error) {
    console.log(error);
    res.status(400).json({ succuss: false, message: error });
  }
};
exports.getBook = async (req, res) => {
  try {
    const newBook = await BOOK.find({});
    res.status(200).json({ succuss: true, message: "get ", book: newBook });
  } catch (error) {
    res.status(400).json({ succuss: false, message: error });
  }
};
exports.getSingleBook = async (req, res) => {
  try {
    const { id } = req.params;
    const newBook = await BOOK.findById(id);
    if (newBook) {
      res.status(200).json({ succuss: true, message: "get ", book: newBook });
    } else {
      res.status(400).json({ succuss: false, message: "Not found " });
    }
  } catch (error) {
    res.status(400).json({ succuss: false, message: error });
  }
};
exports.updateBook = async (req, res) => {
  try {
    const {
      name,
      desciption,
      price,
      qty,
      available,
      author,
      category,
      language,
      bookImage,
    } = req.body;
    console.log(req.body);
    const { id } = req.params;

    if (name==="" && desciption==="" && price==="" &&qty===""&& author==="" && category==="" && language==="") {
     
      res.status(200).json({ succuss: false, message: "Invalid Credential" });
    } else {
      let book = await BOOK.findByIdAndUpdate(id, {
        name,
        desciption,
        price,
        qty,
        available,
        author,
        category,
        language,
        user: req.user._id,
        bookImage: req.file ? req.file.filename : bookImage,
      });

      res.status(200).json({
        succuss: true,
        message: "Book updated sucessfuly",
        // book: newBook,
      });
    }
  } catch (error) {
    console.log(error);
    res.status(400).json({ succuss: false, message: error });
  }
};
exports.removeBook = async (req, res) => {
  try {
    const { id } = req.params;
    if (id) {
      await BOOK.findByIdAndDelete(id);
      const newBook = await BOOK.find({});
      res
        .status(200)
        .json({ succuss: true, message: "deleted", book: newBook });
    } else {
      res.status(400).json({ succuss: false, message: "Not found " });
    }
  } catch (error) {
    res.status(400).json({ succuss: false, message: error });
  }
};
exports.searchBook = async (req, res) => {
  try {
    const { name } = req.query;
    console.log(name);
    const newBook = await BOOK.find({ name: name });
    if (newBook) {
      res.status(200).json({ succuss: true, message: "found", book: newBook });
    } else {
      res.status(400).json({ succuss: false, message: "Not found " });
    }
  } catch (error) {
    res.status(400).json({ succuss: false, message: error });
  }
};
exports.searchBookByCategory = async (req, res) => {
  try {
    const { category } = req.query;
    const newBook = await BOOK.find({ category: category });
    if (newBook) {
      res.status(200).json({ succuss: true, message: "found", book: newBook });
    } else {
      res.status(400).json({ succuss: false, message: "Not found " });
    }
  } catch (error) {
    res.status(400).json({ succuss: false, message: error });
  }
};
exports.searchBookBylanguage = async (req, res) => {
  try {
    const { language } = req.query;
    const newBook = await BOOK.find({ language: language });
    if (newBook) {
      res.status(200).json({ succuss: true, message: "found", book: newBook });
    } else {
      res.status(400).json({ succuss: false, message: "Not found " });
    }
  } catch (error) {
    res.status(400).json({ succuss: false, message: error });
  }
};
exports.userBook = async (req, res) => {
  try {
    const newBook = await BOOK.find({ user: req.user._id });
    if (newBook) {
      res.status(200).json({ succuss: true, message: "found", book: newBook });
    } else {
      res.status(400).json({ succuss: false, message: "Not found " });
    }
  } catch (error) {
    res.status(400).json({ succuss: false, message: error });
  }
};
