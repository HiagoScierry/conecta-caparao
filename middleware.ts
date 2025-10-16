import { authMiddleware, authConfig } from "@/middleware/authMiddleware";

export const middleware = authMiddleware;
export const config = authConfig;
