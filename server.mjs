#!/usr/bin/env node

import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";

const MCP_ENDPOINT = "https://www.emadibrahim.com/mcp";
const PRIMARY_ROUTE =
  "https://www.emadibrahim.com/bot-setup/mac-mini-ai-agent-setup?utm_source=official_mcp_registry&utm_medium=directory&utm_campaign=mcp_listing";
const OFFER_API = "https://www.emadibrahim.com/api/bot-setup/offer";
const QUEUE_API = "https://www.emadibrahim.com/api/bot-setup";

const buyerRoutes = [
  {
    label: "Primary Mac mini AI agent setup",
    url: PRIMARY_ROUTE
  },
  {
    label: "Cloud vs Mac mini AI agent comparison",
    url: "https://www.emadibrahim.com/bot-setup/cloud-vs-mac-mini-ai-agent?utm_source=official_mcp_registry&utm_medium=directory&utm_campaign=mcp_listing"
  },
  {
    label: "SetupLobster / PrivateClawd / OpenClaw comparison",
    url: "https://www.emadibrahim.com/bot-setup/setuplobster-privateclawd-openclaw-comparison?utm_source=official_mcp_registry&utm_medium=directory&utm_campaign=mcp_listing"
  },
  {
    label: "NitroClaw alternative",
    url: "https://www.emadibrahim.com/bot-setup/nitroclaw-alternative?utm_source=official_mcp_registry&utm_medium=directory&utm_campaign=mcp_listing"
  },
  {
    label: "No API token AI operator",
    url: "https://www.emadibrahim.com/bot-setup/no-api-token-ai-operator?utm_source=official_mcp_registry&utm_medium=directory&utm_campaign=mcp_listing"
  }
];

async function fetchJson(url) {
  const response = await fetch(url, {
    headers: {
      accept: "application/json",
      "user-agent": "dedicated-mac-mini-ai-bot-setup-mcp/1.0.2"
    }
  });
  if (!response.ok) {
    throw new Error(`${url} returned HTTP ${response.status}`);
  }
  return response.json();
}

function jsonContent(payload) {
  return {
    content: [
      {
        type: "text",
        text: JSON.stringify(payload, null, 2)
      }
    ]
  };
}

const server = new McpServer({
  name: "dedicated-mac-mini-ai-bot-setup-mcp",
  version: "1.0.2"
});

server.registerTool(
  "get_bot_setup_offer",
  {
    description:
      "Return the read-only Mac mini AI operator setup offer, pricing, proof links, buyer routes, and contact path.",
    inputSchema: {}
  },
  async () => {
    let liveOffer = null;
    try {
      liveOffer = await fetchJson(OFFER_API);
    } catch (error) {
      liveOffer = { fetchWarning: error.message };
    }

    return jsonContent({
      name: "Dedicated Mac Mini AI Bot Setup",
      mcpEndpoint: MCP_ENDPOINT,
      transport: "streamable-http",
      readOnly: true,
      pricing: {
        setupUsd: 1000,
        monthlyMaintenanceUsd: 100
      },
      interfaces: ["Telegram", "Discord"],
      buyerRoutes,
      contact: {
        name: "Emad Ibrahim",
        email: "eibrahim@gmail.com"
      },
      liveOffer
    });
  }
);

server.registerTool(
  "get_bot_setup_queue",
  {
    description:
      "Return the current 10-founder bot setup queue count from the live production counter.",
    inputSchema: {}
  },
  async () => {
    let queue;
    try {
      queue = await fetchJson(QUEUE_API);
    } catch (error) {
      queue = {
        count: null,
        target: 10,
        remaining: null,
        fetchWarning: error.message
      };
    }

    return jsonContent({
      ...queue,
      source: QUEUE_API,
      signupRoute: PRIMARY_ROUTE,
      readOnly: true
    });
  }
);

const transport = new StdioServerTransport();
await server.connect(transport);
