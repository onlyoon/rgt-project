import { serve } from "@hono/node-server";
import { Hono } from "hono";
import { compress } from "hono/compress";
import { cors } from "hono/cors";
import { showRoutes } from "hono/dev";
import router from "./router/index.js";
import { serveStatic } from "@hono/node-server/serve-static";
import dotenv from "dotenv";
import { readFile } from "fs/promises";

dotenv.config();

const app = new Hono();

app.use("/assets/*", serveStatic({ root: "./public" }));

app.use(compress());

app.route("/api", router);

app.get("*", async (c) => {
  try {
    const content = await readFile("./public/index.html", "utf-8");
    return c.html(content);
  } catch (error) {
    return c.text("File not found", 404);
  }
});

console.log(showRoutes(app));

const port = process.env.PORT ? Number(process.env.SERVER_PORT) : 8080;

console.log(`Server is running on http://localhost:${port}`);

serve({
  fetch: app.fetch,
  port,
  hostname: "0.0.0.0"
});
