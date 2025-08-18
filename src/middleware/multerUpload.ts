import multer from "multer";
import { storage } from "../services/cloudinaryConfig";
import { Request } from "express";


// import { multer, storage } from "../../middleware/multerMiddleware";
// const upload = multer({ storage: storage });

const upload = multer({
  storage: storage,
  fileFilter: (req: Request, file: Express.Multer.File, cb) => {
    const allowedFileTypes = ["image/png", "image/jpeg", "image/jpg"];
    if (allowedFileTypes.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new Error("Only image are supported"));
    }
  },
});

export default upload