import { User } from "@prisma/client";
import db from "../lib/db";

export const getUser = async (id: string): Promise<User | null > => {
return db.user.findFirst({
    where: {
        id,
    },
});
};

export const insertUser = async (body: User): Promise<User> => {
    return db.user.create({
       data: body,
    });
 };