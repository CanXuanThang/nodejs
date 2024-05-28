const multer = require("multer");

const storage = multer.diskStorage({
  filename: (req: any, file: any, cb: any) => {
    cb(null, file.originalname);
  },
});

export const upload = multer({ storage: storage });
