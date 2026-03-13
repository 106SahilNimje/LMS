const multer = require('multer');
const path = require('path');

// Configure Multer to use memory storage
const storage = multer.memoryStorage();

const upload = multer({
  storage,
  limits: { fileSize: 100 * 1024 * 1024 }, // 100MB max limit
  fileFilter: function (req, file, cb) {
    const filetypes = /jpeg|jpg|png|pdf|mp4|mkv/;
    const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype = filetypes.test(file.mimetype);

    if (mimetype && extname) {
      return cb(null, true);
    } else {
      cb(new Error("Error: Images, PDFs, and Videos Only!"));
    }
  }
});

module.exports = upload;
