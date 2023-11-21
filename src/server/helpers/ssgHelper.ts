import { createServerSideHelpers } from "@trpc/react-query/server";
import superjson from "superjson";
import { db } from "~/server/db";
import { appRouter } from "../../server/api/root";

export const generateSSGHelper = () =>
  createServerSideHelpers({
    router: appRouter,
    ctx: { db, userId: null },
    transformer: superjson,
  });
