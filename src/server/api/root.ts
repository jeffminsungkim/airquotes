import { createTRPCRouter } from "@/server/api/trpc";
import { generatedQuoteRouter } from "@/server/api/routers/generatedQuote";

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
  quote: generatedQuoteRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
