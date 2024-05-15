import { Request, Response } from "express";
import * as threadService from "../services/threadService";
import { errorHandler } from "../utils/errorHandler";

export const getThread = async (req: Request, res: Response) => {
   try {
      const threadId = req.params.threadId;
      res.status(200).json(await threadService.getThread(threadId));
   } catch (error) {
      console.log(error);

      errorHandler(error, res);
   }
};
