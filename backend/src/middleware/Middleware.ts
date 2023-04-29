import multer from "multer"
import { v4 as uuidv4 } from 'uuid';
import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken"
import * as path from "path"
import dotenv from "dotenv";
dotenv.config({ path: path.resolve("./.env") })

namespace MiddleWare {

    const tempPdfStorage = multer.diskStorage({
        destination: function (req, file, callback) {
            const pathToFolder = path.resolve(process.env.USER_PDF_STORAGE as string)
            callback(null, pathToFolder);
        },
        filename: function (req, file, callback) {
            callback(null, uuidv4() + Date.now() + path.extname(file.originalname))
        }
    });

    const tempMultiPdfStorage = multer.diskStorage({
        destination: function (req, file, callback) {
            const pathToFolder = path.resolve(process.env.MERGE_PDF_STORAGE as string)
            callback(null, pathToFolder);
        },
        filename: function (req, file, callback) {
            callback(null, uuidv4() + Date.now() + path.extname(file.originalname))
        }
    });

    export const uploadPdf = multer({ storage: tempPdfStorage }).single("pdf");
    export const uploadMultiplePdf = multer({ storage: tempMultiPdfStorage }).array("pdf");


    export const authorization = (req: Request, res: Response, next: NextFunction) => {
        try {
            const token: any = req.headers.authorization;
            const verify = jwt.verify(token, process.env.JWT_SECRET as string)
            if (verify) {
                next()
            } else {
                return res.status(400).send({ message: "Not Authorized !!!" })
            }
        } catch (error) {
            console.log("Auth MiddleWare Error : ", error)
            return res.status(400).send({ message: "Not Authorized !!!" })
        }
    }


}

export default MiddleWare;