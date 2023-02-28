import { cartRouter } from "./routers/cart";
import { exampleRouter } from "./routers/example";
import { menuRouter } from "./routers/menu";
import { orderRouter } from "./routers/order";
import { createTRPCRouter } from "./trpc";

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here
 */
export const appRouter = createTRPCRouter({
  example: exampleRouter,
  menu: menuRouter,
  cart: cartRouter,
  order: orderRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
