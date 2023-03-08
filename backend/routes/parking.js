const { Router } = require("express");
const router = Router();
const { checkIn, checkOut, uploadImage } = require("../controllers/parking");

// multer
const multer = require("multer");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./assets/");
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});

const upload = multer({ storage: storage });

router.post("/upload", upload.single("imageCheckIn"), checkIn);

router.post("/checkOut", upload.single("imageCheckOut"), checkOut);

module.exports = router;
