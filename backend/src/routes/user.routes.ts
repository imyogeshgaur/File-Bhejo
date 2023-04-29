import { Request, Response, Router } from "express"
import UserController from "../controllers/user.controller";
import MiddleWare from "../middleware/Middleware";
const userRouter = Router();


userRouter.get("/get/:id", MiddleWare.authorization, async (req: Request, res: Response) => {
    try {
        const userController = new UserController(req, res);
        await userController.getASingleUser();
    } catch (error) {
        console.log("Global User Error !!!", error)
    }
})

userRouter.put("/update/:id", MiddleWare.authorization, async (req: Request, res: Response) => {
    try {
        const userController = new UserController(req, res);
        await userController.updateUser();
    } catch (error) {
        console.log("Global User Error !!!", error)
    }
})

userRouter.delete("/delete/:id", MiddleWare.authorization, async (req: Request, res: Response) => {
    try {
        const userController = new UserController(req, res);
        await userController.deleteUser();
    } catch (error) {
        console.log("Global User Error !!!", error)
    }
})

//! Authentication Routes

userRouter.post("/signup", async (req: Request, res: Response) => {
    try {
        const userController = new UserController(req, res);
        await userController.signUpUser();
    } catch (error) {
        console.log("Global Auth Error !!!", error)
    }
})

userRouter.post("/login", async (req: Request, res: Response) => {
    try {
        const userController = new UserController(req, res);
        await userController.loginUser();
    } catch (error) {
        console.log("Global Auth Error !!!", error)
    }
})

userRouter.get("/verify", async (req: Request, res: Response) => {
    try {
        const userController = new UserController(req, res);
        await userController.verifyUser();
    } catch (error) {
        console.log("Global Auth Error !!!", error)
    }
})

//? File Routes 

userRouter.post("/uploadFile", [MiddleWare.authorization, MiddleWare.uploadPdf], async (req: Request, res: Response) => {
    try {
        const userController = new UserController(req, res);
        await userController.uploadFile();
    } catch (error) {
        console.log("Global File Error !!!", error)
    }
})

userRouter.post("/filePass", async (req: Request, res: Response) => {
    try {
        const userController = new UserController(req, res);
        await userController.sendFile();
    } catch (error) {
        console.log("Global File Error !!!", error)
    }
})

userRouter.post("/mergeFiles", [MiddleWare.authorization, MiddleWare.uploadMultiplePdf], async (req: Request, res: Response) => {
    try {
        const userController = new UserController(req, res);
        await userController.mergeFiles();
    } catch (error) {
        console.log("Global File Error !!!", error)
    }
})

userRouter.get("/downloadFile", async (req: Request, res: Response) => {
    try {
        const userController = new UserController(req, res);
        await userController.downloadFile();
    } catch (error) {
        console.log("Global File Error !!!", error)
    }
})
export default userRouter;