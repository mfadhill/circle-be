import { Request, Response } from "express";
import * as  likeService from "../services/likeService"
import { errorHandler } from "../utils/errorHandler";

export const like = async (req: Request, res:Response) => {
    try{
        console.log(req.body)
        const threadId = req.params.threadId;
        const userId = res.locals.userId;
        const like = await likeService.like( userId , threadId);
        res.json({
            success:true,
            message:like,
        });
    }catch(error){
        console.log(error);
        res.status(500).json({
            success:false,
            error:error,
        })
    }
}