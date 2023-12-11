const multer = require("multer");
const storageUser = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "public/upload/users");
  },
  filename: function (req, file, cb) {
    console.log(file);
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});
const uploadUser = multer({ storage: storageUser });
exports.userImageMulter = uploadUser.single("userImage");

// books

const storageBook = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "public/upload/books");
  },
  filename: function (req, file, cb) {
    console.log(file);
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

const uploadBook = multer({ storage: storageBook });
exports.bookImageMulter = uploadBook.single("bookImage");
