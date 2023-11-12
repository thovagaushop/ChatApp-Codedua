import multer from "multer";
import path from "path";

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    if (req.body["type_image"] === "message") {
      return cb(null, "/public/images/messages");
    } else if (req.body["type_image"] === "profile") {
      return cb(null, "/public/images/avatars");
    }
  },
  filename: (req, file, cb) => {
    return cb(null, Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({ storage: storage });

export default upload;
