# OpenClaw Agent Prompt: Mac Mini BYOC Setup

## 📋 Copy-Paste This Into a New Agent Session

---

```
SETUP TASK: Configure this Mac for 24/7 remote OpenClaw access via BYOC

REFERENCE DOCUMENT: ~/.openclaw/workspace/MACMINI_BYOC_SETUP.md

MY SECRETS (use these when prompted):
- BYOC API Key: {{BYOC_API_KEY}}
- Sudo Password: {{SUDO_PASSWORD}}

PHASE 1: SYSTEM PREPARATION
Execute these commands with sudo:
1. sudo pmset -c sleep 0
2. sudo pmset -c disksleep 0
3. sudo pmset -c displaysleep 10
4. sudo pmset -c autorestart 1

Verify with: pmset -g | grep -E "^ sleep|disksleep|autorestart"
Expected: sleep=0, disksleep=0, autorestart=1

PHASE 2: BRIDGE INSTALLATION
Run: bash <(curl -fsSL https://cdn.kimi.com/kimi-claw/install.sh) --bot-token {{BYOC_API_KEY}}

Verify with: openclaw plugins list | grep kimi-claw
Expected: Shows "kimi-claw" with status "loaded"

PHASE 3: GATEWAY SERVICE
Run: openclaw gateway install

Verify with: openclaw gateway status
Expected: "Runtime: running", "RPC probe: ok"

PHASE 4: VERIFICATION
Check bridge connection: grep "kimi-bridge.*connected" /tmp/openclaw/openclaw-$(date +%Y-%m-%d).log | tail -3
Expected: Shows "bridge ACP connected url=wss://www.kimi.com/..."

Run health check: openclaw health
Expected: Shows "Agents: main (default)" without errors

DELIVERABLE:
Report back with:
1. Sleep settings output
2. Gateway status output  
3. Bridge connection log lines
4. Confirmation that http://127.0.0.1:18789/ is accessible
```

---

## 🔧 How to Use This Template

1. Copy the text above
2. Replace `{{BYOC_API_KEY}}` with your actual kimi.com BYOC token
3. Replace `{{SUDO_PASSWORD}}` with your Mac's sudo password
4. Paste into a new OpenClaw session
5. The agent will execute everything and report back

---

## 📚 Reference Files

| File | Description |
|------|-------------|
| `MACMINI_BYOC_SETUP.md` | Full detailed runbook |
| `MACMINI_BYOC_CHEATSHEET.md` | Quick reference |
| `AGENT_PROMPT_BYOC.md` | This file - prompt template |

---

## ✅ Post-Setup Verification Checklist

After the agent reports completion, verify yourself:

- [ ] Open http://127.0.0.1:18789/ - Dashboard loads
- [ ] Go to https://kimi.com - Your Mac Mini appears as BYOC instance
- [ ] Close laptop lid (if applicable) - Mac stays running
- [ ] Wait 5 minutes - Still connected and responsive

---

Created: 2026-02-19
For: Mac Mini 24/7 BYOC Remote Access Setup
