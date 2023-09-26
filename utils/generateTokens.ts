import { sign } from "jsonwebtoken";
import dayjs from "dayjs";
import prisma from "@/lib/prisma";
import { JWT_SECRET_KEY } from "@/lib/secrets";
import { cookies } from "next/headers";

export default async function generateTokens(id: string) {
  try {
    const existingToken = await prisma.refreshToken.findFirst({
      where: {
        userId: id,
      },
    });

    const hasTokenExpired =
      existingToken && dayjs().isAfter(dayjs(existingToken?.expiresAt));

    const access_token = sign({ id }, JWT_SECRET_KEY as string, {
      expiresIn: "15m",
    });

    const refresh_token =
      (!hasTokenExpired && existingToken?.token) ||
      sign({ id }, JWT_SECRET_KEY as string, {
        expiresIn: "90d",
      });

    if (!existingToken)
      await prisma.refreshToken.create({
        data: {
          token: refresh_token,
          expiresAt: dayjs().add(90, "d").toDate(),
          userId: id,
        },
      });

    if (hasTokenExpired) {
      await prisma.refreshToken.update({
        where: {
          userId: id,
        },
        data: {
          token: refresh_token,
          expiresAt: dayjs().add(90, "d").toDate(),
        },
      });
    }

    const user = await prisma.user.findUnique({
      where: {
        id,
      },
    });

    const openforkUserJSON = {
      id: user?.id,
      name: user?.name,
      email: user?.email,
      isVerified: user?.isVerified,
      github: user?.githubUrl,
      image: user?.image,
    };

    const cook = cookies();

    cook.set("access_token", access_token, {
      httpOnly: true,
      expires: dayjs().add(15, "m").toDate(),
    });
    cook.set("refresh_token", refresh_token, {
      httpOnly: true,
      expires: dayjs().add(90, "d").toDate(),
    });

    cook.set("openfork_user", JSON.stringify(openforkUserJSON), {
      expires: dayjs().add(90, "d").toDate(),
    });
  } catch (error) {}
}
