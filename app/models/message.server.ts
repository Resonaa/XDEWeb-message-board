import type { Message } from "@prisma/client";

import { prisma } from "~/db.server";

export type { Message } from "@prisma/client";

export async function getMessage(id: Message["id"]) {
  await prisma.message.updateMany({
    where: { id },
    data: { viewCount: { increment: 1 } }
  });

  return await prisma.message.findUnique({ where: { id } });
}

export async function getMessages(page: number) {
  const firstMessage = await prisma.message.findFirst({
    orderBy: { id: "desc" }
  });
  const maxId = firstMessage?.id ?? 0;

  await prisma.message.updateMany({
    where: { id: { gt: maxId - page * 10 } },
    data: { viewCount: { increment: 1 } }
  });

  return prisma.message.findMany({
    orderBy: { id: "desc" },
    skip: (page - 1) * 10,
    take: 10
  });
}

export function createMessage(content: Message["content"]) {
  return prisma.message.create({ data: { content } });
}
