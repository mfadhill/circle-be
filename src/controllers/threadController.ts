import { Request, Response } from "express";
import * as threadService from "../services/threadService";
import { errorHandler } from "../utils/errorHandler";
import { threadId } from "worker_threads";
import db from "../lib/db";

export const getThread = async (req: Request, res: Response) => {
   try {
      const threadId = req.params.threadId;
      res.status(200).json(await threadService.getThread(threadId));
   } catch (error) {
      console.log(error);

      errorHandler(error, res);
   }
};

export const getThreads = async (req: Request, res: Response) => {
   try {
      res.status(200).json(await threadService.getThreads());
   } catch (error) {
      console.log(error);

      errorHandler(error, res);
   }
};


export const createThreads = async (req: Request, res: Response) => {
   try {
      console.log(res.locals.userId);

      const body = req.body;
      body.userId = res.locals.userId;

      console.log(body);

      const files = req.files as {
         [fieldname: string]: Express.Multer.File[];
      };

      res.status(200).json(await threadService.insertThread(body, files));
   } catch (error) {
      console.log(error);

      errorHandler(error, res);
   }
};

export const updateThread = async (req: Request, res: Response) => {
   try {

      const threadId = req.params.threadId;
      await threadService.getThread(threadId)

      console.log(res.locals.userId);
      const body = req.body;
      body.id = threadId;
      body.userId = res.locals.userId;

      console.log(body);

      const files = req.files as {
         [fieldname: string]: Express.Multer.File[];
      };
      res.status(200).json(await threadService.updateThread(body, files));

   } catch (error) {
      console.log(error);

      errorHandler(error, res);
   }
}