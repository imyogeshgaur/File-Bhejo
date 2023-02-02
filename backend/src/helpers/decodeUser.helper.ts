import prisma from "../database/database.config";
import jwt from "jsonwebtoken";

const decodeUsers = async(token:any) => {
    const User = prisma.user;
    const decodeVal: any = jwt.decode(token, { complete: true })
    const decodedUser = await User.findFirst({
        where: {
            userId: decodeVal.payload.userId as string
        }
    })
    return decodedUser;
}

export default decodeUsers;