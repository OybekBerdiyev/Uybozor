const { v4: uuid } = require("uuid");
const path = require("path");

const allowedFormats = [".png", ".jpg", ".jpeg"];
const maxFileCount = 10; 

const fileUpload = (req, res, next) => {
  const files = req.files;
  if (!files) return res.status(400).json({ message: "Images are required" });

  if (Object.keys(files).length > maxFileCount) {
    return res.status(400).json({ message: `Maximum ${maxFileCount} files allowed` });
  }

  req.imageNames = [];

  for (const key in files) {
    if (Object.hasOwnProperty.call(files, key)) {
      const file = files[key];
      const mimetype = path.extname(file.name);

      if (allowedFormats.includes(mimetype.toLowerCase())) { 
        const imageName = uuid() + mimetype;
        file.mv(`${process.cwd()}/uploads/${imageName}`);
        req.imageNames.push(imageName);
      } else {
       return res.status(400).json({ message: "Invalid file format" });
      }
    }
  }

  next();
};

module.exports = fileUpload;
