import prisma from "../database/database.config";
import jwt from "jsonwebtoken";
import nodemailer from "nodemailer";
import { resolve, join } from "path"
import { config } from "dotenv";
config({ path: resolve("./.env") })
import PDFMerger from 'pdf-merger-js';



const myTransport = nodemailer.createTransport({
    host: "smtp.office365.com",
    port: 587,
    auth: {
        user: process.env.MAIL_ID,
        pass: process.env.MAIL_PASSWORD
    },
})

namespace Helper {

    export const mailToVerify = async (token: any, name: string, email: string) => {
        try {
            const info = await myTransport.sendMail({
                from: process.env.SENDER_MAIL,
                to: email,
                subject: "Log In Link",
                html: `
                <html>
                <head>
                </head>
                <body>
                    <p> Dear ${name}, </p>   
                    <p>Thank You for Registeration 
                    <br>
                    <a href="http://${process.env.BASE_URL}/user/verify">
                    Click Here</a> to Login !!!</p>
                    Thanks and Regards
                    <br>
                    Team Yogesh Gaur
                </body>
                </html>
                `
            })
            console.log("Mail Send Successfully !!!", info.messageId)
            return { message: "Check Mail For Login !!!", value: token };
        } catch (error) {
            console.log("Verification Mail Error : ", error)
        }
    }

    export const mailToSendPdfLink = async (link: string, name: string, email: string) => {
        try {
            const info = await myTransport.sendMail({
                from: process.env.SENDER_MAIL,
                to: email,
                subject: "Get Your PDF",
                html: `
                    <html>
                    <head>
                    </head>
                    <body>
                        <p> Dear ${name}, </p>    
                        <br>
                        <a href=${link}>
                        Click Here</a> to Download Pdf !!!</p>
                        Thanks and Regards
                        <br>
                        Team Yogesh Gaur
                    </body>
                    </html>
                    `
            })
            console.log("Mail Send Successfully !!!", info.messageId)
            return "Check Mail For Pdf Link !!!";
        } catch (error) {
            console.log("Pdf Link Mail Error : ", error)
        }
    }

    export const passwordProviderLink = async (link: string, name: string, email: string, password: string) => {
        try {
            const info = await myTransport.sendMail({
                from: process.env.SENDER_MAIL,
                to: email,
                subject: "Get Your PDF",
                html: `
                    <html>
                    <head>
                    </head>
                    <body>
                        <p>Dear ${name}, </p>    
                        <p>Your Password To Access Pdf is : ${password}</p>
                        <a href=${link}>
                        Click Here</a> to Download Pdf !!!</p>
                        Thanks and Regards
                        <br>
                        Team Yogesh Gaur
                    </body>
                    </html>
                    `
            })
            console.log("Mail Send Successfully !!!", info.messageId)
            return "Check Mail For Pdf Link !!!";
        } catch (error) {
            console.log("Pdf Password Mail Error : ", error)
        }
    }

    export const decodeUsers = async (token: any) => {
        const User = prisma.user;
        const decodeVal: any = jwt.decode(token, { complete: true })
        const decodedUser = await User.findFirst({
            where: {
                userId: decodeVal.payload.userId as string
            }
        })
        return decodedUser;
    }

    export const mergePDFs = async (files: any) => {
        try {
            const merger = new PDFMerger()
            for (const file of files) {
                await merger.add(file.path)
            }
            await merger.save(`${join(process.cwd() + "/src/uploads/merged")}/merged.pdf`);
            return "File Merged Successfully !!!"
        } catch (error) {
            console.log("File Merge Helper Error : ", error);
        }
    }

}


export default Helper