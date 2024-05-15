import { Thread } from "@prisma/client";
import db from "../lib/db";

export const insertThread = async (
   body: Thread,
   files: { [fieldname: string]: Express.Multer.File[] }
) => {
   const thread = await db.thread.create({
      data: body,
   });

   if (Array.from(files.image)) {
      await db.threadImage.createMany({
         data: files.image.map((img) => ({
            url: img.filename,
            threadId: thread.id,
         })),
      });
   }

   return thread;
};

export const getThread = async (id: string) => {
   return await db.thread.findFirst({
      where: {
         id,
      },
      include: {
         author: {
            select: {
               id: true,
               fullname: true,
            },
         },
         image: {
            select: {
               url: true,
            },
         },
      },
   });
};

export const getThreads = async () => {
   return await db.thread.findMany({
      include: {
         author: {
            select: {
               id: true,
               fullname: true,
            },
         },
         image: {
            select: {
               url: true,
            },
         },
      },
   });
};
