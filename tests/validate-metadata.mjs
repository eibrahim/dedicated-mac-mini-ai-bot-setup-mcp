import assert from "node:assert/strict";
import { existsSync, readFileSync } from "node:fs";

const readJson = (path) => JSON.parse(readFileSync(path, "utf8"));

const packageJson = readJson("package.json");
const mcpServerJson = readJson("mcp-server.json");

assert.equal(packageJson.private, false);
assert.equal(packageJson.mcpName, "io.github.eibrahim/dedicated-mac-mini-ai-bot-setup");

assert.ok(existsSync("server.json"), "server.json is required for the official MCP Registry");
const registryJson = readJson("server.json");

assert.equal(registryJson.$schema, "https://static.modelcontextprotocol.io/schemas/2025-12-11/server.schema.json");
assert.equal(registryJson.name, packageJson.mcpName);
assert.equal(registryJson.title, mcpServerJson.displayName);
assert.equal(registryJson.version, packageJson.version);
assert.equal(registryJson.repository.url, "https://github.com/eibrahim/dedicated-mac-mini-ai-bot-setup-mcp");
assert.equal(registryJson.repository.source, "github");
assert.equal(registryJson.websiteUrl, "https://www.emadibrahim.com/bot-setup/mac-mini-ai-agent-setup?utm_source=official_mcp_registry&utm_medium=directory&utm_campaign=mcp_listing");
assert.deepEqual(registryJson.remotes, [
  {
    type: "streamable-http",
    url: mcpServerJson.endpoint
  }
]);
assert.ok(registryJson.description.toLowerCase().includes("read-only"));
assert.ok(registryJson.description.toLowerCase().includes("mac mini"));

assert.ok(
  existsSync(".github/workflows/publish-mcp-registry.yml"),
  "GitHub Actions publishing workflow is required"
);
const workflow = readFileSync(".github/workflows/publish-mcp-registry.yml", "utf8");
assert.match(workflow, /id-token:\s+write/);
assert.match(workflow, /mcp-publisher login github-oidc/);
assert.match(workflow, /mcp-publisher publish/);
