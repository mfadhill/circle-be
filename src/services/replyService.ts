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