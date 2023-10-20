import { env } from "node:process";
import { createRequestHandler, staticFilePlugin } from "@mcansh/remix-fastify";
import { broadcastDevReady } from "@remix-run/node";
import fastify from "fastify";

const BUILD_PATH = "./build/index.js";
const PORT = 6590;

const build = await import(BUILD_PATH);

const app = fastify({
  logger: { transport: { target: "@fastify/one-line-logger" } }
});

const noopContentParser = (_, payload, done) => {
  done(null, payload);
};

app.addContentTypeParser("application/json", noopContentParser);
app.addContentTypeParser("*", noopContentParser);

await app
  .register(staticFilePlugin, {
    assetsBuildDirectory: "public/build",
    publicPath: "/build/"
  })
  .all("*", createRequestHandler({ build, mode: build.mode }))
  .listen({ port: PORT });

if (env.NODE_ENV === "development") {
  await broadcastDevReady(build);
}
