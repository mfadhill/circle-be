import { Request, Response } from "express";
import * as  followService from "../services/followService"
import { errorHandler } from "../utils/errorHandler";

export const getFollow = async (req: Request, res: Response) => {
   try {
       const followId = req.params.followId;
       res.status(200).json(await followService.getFollow(followId));
   }catch(error){
    console.log(error);
    errorHandler(error, res);
   }   
};

