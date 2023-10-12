/**
 * @type {import("@remix-run/dev").AppConfig}
 */
module.exports = {
  cacheDirectory: "./node_modules/.cache/remix",
  ignoredRouteFiles: ["**/.*", "**/*.css"],
  serverModuleFormat: "cjs",
  serverDependenciesToBundle: [
    /^rehype.*/,
    /^remark.*/,
    /^unified.*/,
    /^hast-util.*/,
    /^mdast-util.*/,
    /^micromark.*/,
    /^unist-util.*/,
    /^vfile.*/,
    "react-markdown",
    "longest-streak",
    "property-information",
    "space-separated-tokens",
    "bail",
    "comma-separated-tokens",
    "is-plain-obj",
    "trough",
    "hastscript",
    "web-namespaces",
    "decode-named-character-reference",
    "trim-lines",
    "character-entities",
    "ccount",
    "markdown-table",
    "escape-string-regexp",
    "lowlight",
    "fault",
    "devlop",
    "html-url-attributes"
  ]
};
