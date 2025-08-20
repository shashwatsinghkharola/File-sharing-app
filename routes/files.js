const router = require("express").Router();
const multer = require("multer");
const path = require("path");
const File = require("../models/file");
const { v4: uuid4 } = require("uuid");

let storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, "uploads/"),
  filename: (req, file, cb) => {
    const uniqueName = `${Date.now()}-${
      Math.round(Math.random()) * 1e9
    }${path.extname(file.originalname)}`;
    cb(null, uniqueName);
  },
});

let upload = multer({
  storage,
  limit: { fileSize: 1000000 * 100 },
}).single("myfile");

router.post("/", (req, res) => {
  upload(req, res, async (err) => {
    if (!req.file) {
      return res.json({ error: "All fileds are required " });
    }
    if (err) {
      return res.status(500).send({ error: err.message });
    }

    const file = new File({
      filename: req.file.filename,
      uuid: uuid4(),
      path: req.file.path,
      size: req.file.size,
    });

    const response = await file.save();
    return res.json({
      file: `${process.env.APP_BASE_URL}/files/${response.uuid}`,
    });
  });

  // Response -> Link
});

router.post("/send", async (req, res) => {
  const { uuid, emailTo, emailFrom } = req.body;

  if (!uuid || !emailTo || !emailFrom) {
    return res
      .status(422)
      .send({ error: "All fields are required except expiry." });
  }

  try {
    const file = await File.findOne({ uuid: uuid });
    if (file.sender) {
      return res.status(422).send({ error: "Email already sent once." });
    }

    file.sender = emailFrom.trim(); 
    file.receiver = emailTo.trim();
    await file.save();

    const sendMail = require("../services/mail");
    await sendMail({ emailFrom, emailTo, file }); 

    return res.json({ message: "mail sent !!" });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
});


module.exports = router;








