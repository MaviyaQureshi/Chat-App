import multer from "multer";
import { GridFsStorage } from "multer-gridfs-storage";
import dotenv from "dotenv";
import moment from "moment";

// Get the current date and time
const now = moment();

// Format the current date and time
console.log(now.format("YYYY-MM-DD HH:mm:ss"));

dotenv.config();

const username = process.env.DB_USERNAME;
const password = process.env.DB_PASSWORD;

const storage = new GridFsStorage({
  url: `mongodb://maviya:maviyaqureshi@ac-6jzs3ol-shard-00-00.uts6xns.mongodb.net:27017,ac-6jzs3ol-shard-00-01.uts6xns.mongodb.net:27017,ac-6jzs3ol-shard-00-02.uts6xns.mongodb.net:27017/?ssl=true&replicaSet=atlas-nqo7an-shard-0&authSource=admin&retryWrites=true&w=majority&appName=Cluster0`,
  file: (request, file) => {
    const match = ["image/png", "image/jpeg"];

    if (match.indexOf(file.mimetype) === -1) {
      // If the file is not an image, generate a unique filename with the original name and current timestamp
      return `${Date.now()}-blog-${file.originalname}`;
    }

    return {
      bucketName: "photos",
      filename: `${Date.now()}-blog-${file.originalname}`,
    };
  },
});

export default multer({ storage });
