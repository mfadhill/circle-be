import db from "../lib/db"
import { ERROR_MESSAGE } from "../utils/constant/error";

export const createLike = async (userId: string, threadId: string) => {


    const existingThread = await db.thread.findFirst({
        where: {
            id: threadId
        }
    })

    if (!existingThread) {
        throw new Error(ERROR_MESSAGE.DATA_NOT_FOUND)
    }

    const existingLike = await db.like.findFirst({
        where: {
            userId,
            threadId
        }
    })

    if (existingLike) {
        await db.like.deleteMany({
            where: {
                userId,
                threadId
            }
        })
        return ("unlike sukses")
    }
    await db.like.create({
        data: {
            userId,
            threadId
        }
    })
    return ("like sukses")
}

export const getLikes = async (threadId: string) => {
    console.log("thread id " + threadId);

    const getLike = await db.like.findMany({
        where: {
            threadId
        },
        include: {
            user: {
                select: {
                    id: true,
                    fullname: true,
                    email: true
                }
            }
        }
    })
    return (getLike)
}

export const getCurrentLike = async (threadId: string, userId: string) => {
    return await db.like.findFirst({
        where: {
            threadId,
            userId,
        },
    });
};