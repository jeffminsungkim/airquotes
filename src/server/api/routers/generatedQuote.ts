import { createTRPCRouter, publicProcedure } from "@/server/api/trpc";

export const generatedQuoteRouter = createTRPCRouter({
  create: publicProcedure.mutation(async ({ ctx }) => {
    await ctx.prisma.generatedQuote.create({
      data: { id: undefined, createdAt: new Date() },
    });
  }),
  getAllGeneratedQuotes: publicProcedure.query(async ({ ctx }) => {
    const totalQuotes = await ctx.prisma.generatedQuote.count();

    return totalQuotes;
  }),
});
