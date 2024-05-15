import { Request, Response } from "express";
import * as replyService from "../services/replyService";
import { errorHandler } from "../utils/errorHandler";

export const createReply = async (req: Request, res: Response) => {
    try {
       console.log(res.locals.userId);
       const body = req.body;
       body.userId = res.locals.userId;
       console.log(body);
 
       const files = req.files as {
          [fieldname: string]: Express.Multer.File[];
       };
 
       res.status(200).json(await replyService.createReply(body, files));
    } catch (error) {
       console.log(error);
 
       errorHandler(error, res);
    }
 };