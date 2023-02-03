import prisma from "../database/database.config";
import jwt from 'jsonwebtoken';
import { resolve } from "path"
import { config } from "dotenv";
config({ path: resolve("./.env") })
import decodeUser from "../helpers/decodeUser.helper";
import { mailToVerify } from "../helpers/mail.helper";
import bcryptjs from "bcryptjs"

class UserService {
    private User: any;
    constructor() {
        this.User = prisma.user;
    }

    async getASingleUser(userId: string) {
        try {
            if (userId.length <= 40) {
                const user = await this.User.findFirst({
                    where: {
                        userId
                    }
                })
                if (user) {
                    return user;
                } else {
                    return 0;
                }
            } else {
                const userRet = await decodeUser(userId);
                const user = await this.User.findFirst({
                    where: {
                        userId: userRet?.userId
                    }
                })
                if (user) {
                    return user;
                } else {
                    return 0;
                }
            }
        } catch (error) {
            console.log("User's Service : Internal Server Error !!!", error)
        }
    }

    async updateUser(id: string, userData: any) {
        const { email, name } = userData
        try {
            const user = await this.User.findFirst({
                where: {
                    userId: id
                }
            })
            if (user) {
                const updateUser = await this.User.update({
                    where: {
                        userId: id
                    },
                    data: {
                        email,
                        name
                    }
                })
                return updateUser
            } else {
                return 0;
            }
        } catch (error) {
            console.log("User's Service : Internal Server Error !!!", error)
        }
    }

    async deleteUser(id: string) {
        try {
            const user = await this.User.findFirst({
                where: {
                    userId: id
                }
            })
            if (user) {
                const deleteUser = await this.User.delete({
                    where: {
                        userId: id
                    }
                })
                return deleteUser;
            } else {
                return 0;
            }
        } catch (error) {
            console.log("User's Service : Internal Server Error !!!", error)
        }
    }

    //! Authentication Service

    async signUpUser(userData: any) {
        try {
            const enteredEmail = userData.email;
            const email = enteredEmail.toLowerCase();
            const userExist = await this.User.findFirst({
                where: {
                    email
                }
            })
            if (userExist) {
                return 0;
            } else {
                const name = userData.name
                const user = await this.User.create({
                    data: {
                        email,
                        name
                    }
                })
                return user
            }
        } catch (error) {
            console.log("Auth's Service : Internal Server Error !!!", error)
        }
    }

    async loginUser(userData: any) {
        try {
            const enteredEmail = userData.email;
            const email = enteredEmail.toLowerCase();
            const user = await this.User.findFirst({
                where: {
                    email
                }
            })
            if (user) {
                const token = jwt.sign({ userId: user.userId }, process.env.JWT_SECRET as string)
                const message = await mailToVerify(token, user.name, email);
                return message
            } else {
                return 0;
            }
        } catch (error) {
            console.log("Auth's Service : Internal Server Error !!!", error)
        }
    }

    async verifyUser(userId: string) {
        try {
            const userToFind = await this.User.findFirst({
                where: {
                    userId
                }
            });
            return userToFind
        } catch (error) {
            console.log("Auth's Service : Internal Server Error !!!", error)
        }
    }

    //? File Upload Service 

    async uploadFile(data: any, userId: string) {
        const { file, filePassword } = data
        try {
            const user = await this.User.findFirst({
                where: {
                    userId
                }
            })
            const previousFile = user.file;
            if (user) {
                if (filePassword) {
                    const newPassword = await bcryptjs.hash(filePassword, 12);
                    const fileCreated = await this.User.update({
                        where: {
                            userId
                        },
                        data: {
                            file,
                            filePassword: newPassword
                        }
                    })
                    return fileCreated;
                } else {
                    const fileCreated = await this.User.update({
                        where: {
                            userId
                        },
                        data: {
                            file
                        }
                    })
                    return fileCreated;
                }
            } else {
                return 0;
            }

        } catch (error) {
            console.log("File's Service : Internal Server Error !!!", error)
        }
    }
}

export default UserService