import { Like } from "@prisma/client";
import db from "../lib/db";

export const like = async (userId:string, threadId: string) =>{
    const existingLike = await db.like.findFirst({
        where:{
            userId,
            threadId
        }
    })
    if (existingLike){
        await db.like.deleteMany({
            where:{
                userId,
                threadId
            }
        })
        return ("Unlike")
    }
    await db.like.create({
        data: {
            userId: userId,
            threadId: threadId
        }
    })
return ("Like")
}