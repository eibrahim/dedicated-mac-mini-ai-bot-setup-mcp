import assert from "node:assert/strict";
import { existsSync, readFileSync } from "node:fs";
import { Client } from "@modelcontextprotocol/sdk/client/index.js";
import { StdioClientTransport } from "@modelcontextprotocol/sdk/client/stdio.js";

const readJson = (path) => JSON.parse(readFileSync(path, "utf8"));

const packageJson = readJson("package.json");
const mcpServerJson = readJson("mcp-server.json");

assert.equal(packageJson.private, false);
assert.equal(packageJson.mcpName, "io.github.eibrahim/dedicated-mac-mini-ai-bot-setup");
assert.equal(packageJson.type, "module");
assert.equal(packageJson.bin["dedicated-mac-mini-ai-bot-setup-mcp"], "./server.mjs");

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

assert.ok(existsSync("server.mjs"), "server.mjs is required for package-based MCP directory submissions");
assert.ok(existsSync("Dockerfile"), "Dockerfile is required for Docker package publication");
const dockerfile = readFileSync("Dockerfile", "utf8");
assert.match(dockerfile, /npm ci --omit=dev/);
assert.match(dockerfile, /CMD \["node", "server\.mjs"\]/);
assert.ok(
  existsSync(".github/workflows/publish-docker.yml"),
  "Docker publish workflow is required"
);
const dockerWorkflow = readFileSync(".github/workflows/publish-docker.yml", "utf8");
assert.match(dockerWorkflow, /packages:\s+write/);
assert.match(dockerWorkflow, /ghcr\.io\/eibrahim\/dedicated-mac-mini-ai-bot-setup-mcp/);
assert.match(dockerWorkflow, /docker\/build-push-action/);

const transport = new StdioClientTransport({
  command: process.execPath,
  args: ["server.mjs"],
  stderr: "pipe"
});
const client = new Client({ name: "metadata-test-client", version: "1.0.0" });
try {
  await client.connect(transport);
  const tools = await client.listTools();
  const toolNames = tools.tools.map((tool) => tool.name).sort();
  assert.deepEqual(toolNames, ["get_bot_setup_offer", "get_bot_setup_queue"]);

  const offer = await client.callTool({ name: "get_bot_setup_offer", arguments: {} });
  assert.equal(offer.content[0].type, "text");
  const offerJson = JSON.parse(offer.content[0].text);
  assert.equal(offerJson.mcpEndpoint, mcpServerJson.endpoint);
  assert.equal(offerJson.readOnly, true);
  assert.ok(offerJson.buyerRoutes.some((route) => route.url.includes("official_mcp_registry")));

  const queue = await client.callTool({ name: "get_bot_setup_queue", arguments: {} });
  assert.equal(queue.content[0].type, "text");
  const queueJson = JSON.parse(queue.content[0].text);
  assert.equal(queueJson.target, 10);
  assert.equal(typeof queueJson.remaining, "number");
} finally {
  await client.close();
}
