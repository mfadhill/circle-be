import { User } from "@prisma/client";
import db from "../lib/db";

export const getFollow = async (id: string): Promise<User | null> => {
    return db.user.findFirst({
        where:{
            id,
        },
    });
};