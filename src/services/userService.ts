import { User } from "@prisma/client";
import db from "../lib/db";
import { ERROR_MESSAGE } from "../utils/constant/error";

export const getUser = async (id: string): Promise<User | null> => {
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

export const deleteUser = async (id: string): Promise<string> => {
   const existUser = await db.user.findFirst({
      where: {
         id,
      },
   });

   if (!existUser) {
      throw new Error(ERROR_MESSAGE.DATA_NOT_FOUND);
   }

   await db.user.delete({
      where: {
         id,
      },
   });

   return "Sukses delete user dengan id " + id;
};

export const updateUser = async (
   id: string,
   body: User
): Promise<User | Error> => {
   const existUser = await db.user.findFirst({
      where: {
         id,
      },
   });

   if (!existUser) {
      throw new Error("User tidak ditemukan!");
   }

   return db.user.update({
      where: {
         id,
      },
      data: body,
   });
};

export function updateUserV2(id: string, body: User): Promise<User> {
   return db.user.update({
      where: {
         id,
      },
      data: body,
   });
}

export const getSingleUser = async (condition: {
   [key: string]: string;
}): Promise<User | null> => {
   return db.user.findFirst({
      where: condition,
   });
};
