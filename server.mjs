import fastifyEarlyHints from "@fastify/early-hints";
import { env } from "node:process";
import {
  createRequestHandler,
  getEarlyHintLinks,
  staticFilePlugin
} from "@mcansh/remix-fastify";
import { broadcastDevReady } from "@remix-run/node";
import fastifyCompress from "@fastify/compress";
import fastify from "fastify";

const BUILD_PATH = "./build/index.js";
const PORT = 6590;

const build = await import(BUILD_PATH);

const app = fastify({
  logger: { transport: { target: "@fastify/one-line-logger" } }
});

if (env.NODE_ENV === "development") {
  await app.register(fastifyCompress);
}

await app
  .register(fastifyEarlyHints, { warn: true })
  .register(staticFilePlugin, {
    assetsBuildDirectory: "public/build",
    publicPath: "/build/"
  })
  .all("*", async (request, reply) => {
    const links = getEarlyHintLinks(request, build);
    await reply.writeEarlyHintsLinks(links);
    return createRequestHandler({ build, mode: build.mode })(request, reply);
  })
  .listen({ port: PORT });

if (env.NODE_ENV === "development") {
  await broadcastDevReady(build);
}
