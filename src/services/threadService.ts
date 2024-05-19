import { Thread } from "@prisma/client";
import db from "../lib/db";
import { threadId } from "worker_threads";
import { error } from "console";
import { ERROR_MESSAGE } from "../utils/constant/error";

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
         replies: {
            select: {
               id: true,
               content: true,
               image: true,
               threadId: true,
               createdAt:true
            }
         },
         image: {
            select: {
               url: true,
            },
         },
      },
   });
};

export const deleteThread = async ( threadId:string, userId:string ) => {
   const existiedThread = await db.thread.findFirst({
      where:{
         id:threadId,
      },
   });

   console.log("exitedThread", threadId);
   
   if(!existiedThread){
      throw new Error(ERROR_MESSAGE.DATA_NOT_FOUND);
   }
   console.log("existedThread.id", existiedThread.userId);
   
   console.log("userID", userId);

   if(existiedThread.userId !== userId){
      throw new Error("tes");
   }

   await db.threadImage.deleteMany({
      where:{
         threadId:threadId,
      },
   });
   await db.thread.deleteMany({
      where:{
         id:threadId,
      },
   });
   return (existiedThread);
};

export const getRepliesThreads = async () => {
   return await db.thread.findMany({
      where: {
         threadId: { not: null },
      },
      include: {
         author: {
            select: {
               id: true,
               fullname: true,
               profile: true,
            },
         },
         image: {
            select: {
               url: true,
            },
         },
         like: true,
         replies: {
            select: {
               id: true,
               content: true,
               image: {
                  select: {
                     url: true,
                  }

               },
               author: {
                  select: {
                     fullname: true,
                     id: true,
                     email: true
                  }
               }

            }
         }
      },
   });
};

export const updateThread = async (
   body: Thread,
   files: { [fieldname: string]: Express.Multer.File[] }
) => {
   const thread = await db.thread.update({
      where: {
         id: body.id,
      },
      data: body,
   });

   if (files.image && files.image.length > 0) {
      // Hapus gambar lama yang terkait dengan thread
      await db.threadImage.deleteMany({
         where: {
            threadId: thread.id,
         },
      });

      // Tambahkan gambar baru
      await db.threadImage.createMany({
         data: files.image.map((img) => ({
            url: img.filename,
            threadId: thread.id,
         })),
      });
   }

   return thread;
}