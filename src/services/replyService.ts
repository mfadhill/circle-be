import { Thread } from "@prisma/client";
import db from "../lib/db";
import { threadId } from "worker_threads";

export const createReply = async(
    body: Thread,  files: { [fieldname: string]: Express.Multer.File[]}
) => {
    const reply = await db.thread.create({
        data: body,
    });

    if (Array.from(files.image)) {
        await db.threadImage.createMany({
           data: files.image.map((img) => ({
              url: img.filename,
              threadId: reply.id,
           })),
        });
     }
    return reply;
};

export const updateReply = async( id: string, files: { [fieldname: string]: Express.Multer.File[]}
)=> {
    const reply = await db.thread.findFirst({
        where:{
            id,
        },
        include:{
            author:{
                select:{
                    id:true,
                    fullname: true
                },
            },
            image:{
                select:{
                    url:true,
                },
            },
        },
    });
}


// export const deleteReply = async(id:string , files: { [fieldname: string]: Express.Multer.File[]}  
// ) => {
//     const reply = await db.thread.delete({
//         where:{
//             id,
//         }
//     })
//     return ("Delete reply success")
// }