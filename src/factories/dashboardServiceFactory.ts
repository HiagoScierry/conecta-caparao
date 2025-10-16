import { DashboardPrismaRepository } from "@/repositories/prisma/DashboardPrismaRepository";
import { DashboardService } from "@/services/dashboardService";

export const dashboardServiceFactory = () => {
  const repository = new DashboardPrismaRepository();

  return new DashboardService(repository);
}
