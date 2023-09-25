import { sign } from "jsonwebtoken";
import dayjs from "dayjs";
import prisma from "@/lib/prisma";
import { JWT_SECRET_KEY } from "@/lib/secrets";

export async function generateTokens(id: string) {
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

    return new Response("Tokens generated", {
      status: 200,
      headers: {
        "Set-Cookie": [
          `refresh_token=${refresh_token}; HttpOnly; Path=/; Max-Age=${dayjs()
            .add(90, "d")
            .diff(dayjs(), "seconds")}; SameSite=Lax; Secure`,
          `access_token=${access_token}; HttpOnly; Path=/; Max-Age=${dayjs()
            .add(15, "minutes")
            .diff(dayjs(dayjs(), "seconds"))}; SameSite=Lax; Secure`,
        ].join(", "),
      },
    });
  } catch (error) {
    new Error("Error generating tokens", {
      cause: error,
    });
  }
}
