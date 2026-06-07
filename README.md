# Dedicated Mac Mini AI Bot Setup MCP

This repository documents the hosted, read-only MCP endpoint for Emad Ibrahim's dedicated Mac mini AI operator setup offer.

The service helps founders get a private AI operator running on a dedicated Mac mini, connected through Telegram or Discord, with practical automations for SEO, marketing, email, coding, deployment, research, reporting, and operations.

## Hosted Endpoint

- MCP endpoint: `https://www.emadibrahim.com/mcp`
- Transport: Streamable HTTP
- Protocol version: `2025-06-18`
- Offer API: `https://www.emadibrahim.com/api/bot-setup/offer`
- OpenAPI spec: `https://www.emadibrahim.com/openapi.json`
- Landing page: `https://www.emadibrahim.com/bot-setup/mac-mini-ai-agent-setup?utm_source=github_mcp_repo&utm_medium=repo&utm_campaign=public_mcp_listing`

## Buyer Routes

Use these source-tagged routes when the buyer is comparing options or trying to
decide whether a managed Mac mini operator is a fit:

- Primary offer: `https://www.emadibrahim.com/bot-setup/mac-mini-ai-agent-setup?utm_source=github_mcp_repo&utm_medium=repo&utm_campaign=public_mcp_listing`
- Cloud vs Mac mini: `https://www.emadibrahim.com/bot-setup/cloud-vs-mac-mini-ai-agent?utm_source=github_mcp_repo&utm_medium=repo&utm_campaign=public_mcp_listing`
- SetupLobster / PrivateClawd / OpenClaw comparison: `https://www.emadibrahim.com/bot-setup/setuplobster-privateclawd-openclaw-comparison?utm_source=github_mcp_repo&utm_medium=repo&utm_campaign=public_mcp_listing`
- NitroClaw alternative: `https://www.emadibrahim.com/bot-setup/nitroclaw-alternative?utm_source=github_mcp_repo&utm_medium=repo&utm_campaign=public_mcp_listing`
- Fiverr OpenClaw installer alternative: `https://www.emadibrahim.com/bot-setup/fiverr-openclaw-installer-alternative?utm_source=github_mcp_repo&utm_medium=repo&utm_campaign=public_mcp_listing`
- No API token AI operator: `https://www.emadibrahim.com/bot-setup/no-api-token-ai-operator?utm_source=github_mcp_repo&utm_medium=repo&utm_campaign=public_mcp_listing`

## Tools

The hosted MCP endpoint exposes read-only tools:

- `get_bot_setup_offer`: returns the service description, pricing, proof, buyer links, contact details, and guardrails.
- `get_bot_setup_queue`: returns the current founder-slot count, remaining capacity, and queue labels.

The endpoint is read-only. It does not create leads, reserve slots, send emails, or mutate production data.

## Example Client Config

```json
{
  "mcpServers": {
    "emad-bot-setup": {
      "type": "streamable-http",
      "url": "https://www.emadibrahim.com/mcp"
    }
  }
}
```

## Agentget Install

This repo also includes an installable agent definition for AI coding assistants that support the `agentget` layout.

```sh
npx agentget add eibrahim/dedicated-mac-mini-ai-bot-setup-mcp --agent dedicated-mac-mini-ai-bot-setup
```

The agent definition lives at `agents/dedicated-mac-mini-ai-bot-setup.agent.md` and is read-only. It helps a buyer evaluate fit, pick a first workflow, and route to the public offer, demo, audit, or queue without creating fake leads or sending outreach.

## Local MCP Package

This repo also ships a small open-source stdio MCP server that mirrors the hosted read-only tools. It fetches the live production offer and queue APIs, but it does not create leads, send emails, reserve slots, or mutate data.

Run with Node after cloning this repo:

```sh
npm install
node server.mjs
```

Run with Docker:

```sh
docker run --rm -i ghcr.io/eibrahim/dedicated-mac-mini-ai-bot-setup-mcp:1.0.2
```

Client config example:

```json
{
  "mcpServers": {
    "emad-bot-setup-local": {
      "command": "docker",
      "args": [
        "run",
        "--rm",
        "-i",
        "ghcr.io/eibrahim/dedicated-mac-mini-ai-bot-setup-mcp:1.0.2"
      ]
    }
  }
}
```

## Pricing

- Setup: `$1,000`
- Maintenance: `$100/month`
- Includes a dedicated Mac mini operator and no customer-managed API keys or token billing.

## Proof

Emad Ibrahim has run a 7-figure consulting company, launched 40+ SaaS products and internal tools, and automated workflows across marketing, SEO, email, coding, deployment, reporting, operations, and stock-trading support.

## Verification

Use the hosted endpoints as the source of truth:

```sh
curl https://www.emadibrahim.com/mcp
curl https://www.emadibrahim.com/api/bot-setup/offer
curl https://www.emadibrahim.com/openapi.json
```

## Contact

Emad Ibrahim: `eibrahim@gmail.com`
