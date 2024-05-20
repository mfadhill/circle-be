import { Profile } from "@prisma/client";
import db from "../lib/db";

export const getProfile = async (userId: string) => {
  const getProfiles = await db.profile.findFirst({
    where: {
      userId,
    },
    select: {
        username: true,
        avatar:true,
        bio:true,
        cover:true,
        fullname:true
    }
    });

    if(!getProfiles) {
        throw new Error("Profile not Found")
    }
    return getProfiles
};

export const updateProfile = async (
  userId: string,
  body: Profile,
  files: { [fieldname: string]: Express.Multer.File[] }
)  => {
  try {
      const cover = files?.cover?.[0]?.filename;
      const avatar = files?.avatar?.[0]?.filename;

      if (cover) {
          body.cover = cover;
      }

      if (avatar) {
          body.avatar = avatar;
      }
      const updatedProfile = await db.profile.update({
          where: { userId },
          data: body,
          select: {
              id: true,
              username: true,
              bio: true,
              avatar: true,
              cover: true,
              fullname:true
          },
        });
      return updatedProfile;
  } catch (error) {
      throw error;
  }
};
