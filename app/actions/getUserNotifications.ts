import prisma from "@/libs/prismadb";
import getCurrentUser from "./getCurrentUser";

export async function getUserNotifications() {
  const user = await getCurrentUser();

  if (!user) {
    return [];
  }

  const notifications = await prisma.notification.findMany({
    where: { userId: user.id },
    orderBy: { createdAt: "desc" },
  });

  await prisma.user.update({
    where: { id: user.id },
    data: { hasNotification: false },
  });

  return notifications;
}
