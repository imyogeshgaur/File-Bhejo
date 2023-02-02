import multer from "multer"
import { v4 as uuidv4 } from 'uuid';
import * as path from "path"
import dotenv from "dotenv";
dotenv.config({ path: path.resolve("./.env") })

const tempPdfStorage = multer.diskStorage({
    destination: function (req, file, callback) {
        const pathToFolder = path.resolve(process.env.USER_PDF_STORAGE as string)
        callback(null, pathToFolder);
    },
    filename: function (req, file, callback) {
        callback(null, uuidv4() + Date.now() + path.extname(file.originalname))
    }
});

export const uploadPdf = multer({ storage: tempPdfStorage }).single("pdf");
