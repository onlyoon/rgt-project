import { serve } from "@hono/node-server";
import { Hono } from "hono";
import { compress } from "hono/compress";
import { cors } from "hono/cors";
import { showRoutes } from "hono/dev";
import router from "./router/index.js";
import "dotenv/config";

const app = new Hono();

app.use(
  cors({
    credentials: true,
    origin: "*", // 모든 출처 허용
    allowMethods: ["GET", "POST", "PUT", "DELETE"]
  })
);

app.use(compress());

app.route("/api", router);

console.log(showRoutes(app));

const port = process.env.PORT ? Number(process.env.SERVER_PORT) : 8080;

console.log(`Server is running on http://localhost:${port}`);

serve({
  fetch: app.fetch,
  port
});
