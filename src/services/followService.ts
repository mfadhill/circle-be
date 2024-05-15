import { Follow } from "@prisma/client";
import db from "../lib/db";

export const follow = async (followedById: string, followingId: string) => {
    const existingFollow = await db.follow.findFirst({
        where:{
            followedById,
            followingId
        }
    })
    if (existingFollow){
        await db.follow.deleteMany({
            where:{
                followedById,
                followingId
            }
        })
        return ("Unfollow Success")
    }
    await db.follow.create({
        data: {
            followedById: followedById,
            followingId: followingId
        }
    })
    return ("follow Success")
}
