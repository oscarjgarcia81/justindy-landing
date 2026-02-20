# OpenClaw Installation & Onboarding Guide

Complete runbook for installing OpenClaw on macOS, configuring Kimi K2.5, and linking Telegram.

---

## 📑 Table of Contents

1. [Quick Start](#quick-start)
2. [Prerequisites](#prerequisites)
3. [Installation](#installation)
4. [Onboarding](#onboarding)
5. [Configure Kimi K2.5](#configure-kimi-k25)
6. [Link Telegram](#link-telegram)
7. [Verification](#verification)
8. [Agent Prompt Template](#agent-prompt-template)
9. [Command Reference](#command-reference)
10. [Troubleshooting](#troubleshooting)

---

## 🚀 Quick Start

For experienced users - copy, paste, and run:

```bash
# 1. Install OpenClaw
curl -fsSL https://openclaw.ai/install.sh | bash

# 2. Verify installation
openclaw --version

# 3. Run onboarding wizard
openclaw onboard

# 4. Set default model to Kimi K2.5
openclaw models set moonshot/kimi-k2.5

# 5. Link Telegram
openclaw channels login telegram

# 6. Verify everything
openclaw status
```

---

## 📋 Prerequisites

Before starting, ensure you have:

| Requirement | How to Verify |
|-------------|---------------|
| macOS 12+ | `sw_vers -productVersion` |
| Homebrew installed | `brew --version` |
| Node.js 18+ | `node --version` |
| Moonshot API key | Get at https://platform.moonshot.ai |
| Telegram account | Have Telegram app installed |

---

## 🔧 Installation

### Step 1: Install OpenClaw

```bash
curl -fsSL https://openclaw.ai/install.sh | bash
```

**Expected output:**
```
Installing OpenClaw...
✓ OpenClaw installed successfully
Run 'openclaw --version' to verify
```

### Step 2: Verify Installation

```bash
which openclaw
openclaw --version
```

**Expected output:**
```
/opt/homebrew/bin/openclaw
2026.2.19-2
```

### Step 3: Initialize Workspace

```bash
openclaw setup
```

**Expected output:**
```
✓ Workspace initialized at ~/.openclaw/workspace
✓ Configuration created at ~/.openclaw/openclaw.json
```

---

## 🎯 Onboarding

### Step 1: Run Onboarding Wizard

```bash
openclaw onboard
```

**What happens:**
- Creates workspace structure
- Sets up default configuration
- Prompts for model selection

### Step 2: Configure Default Model

During onboarding, select:
- **Model Provider:** Moonshot
- **Model:** Kimi K2.5

Or set it manually after:

```bash
# Set Kimi K2.5 as default
openclaw models set moonshot/kimi-k2.5

# Verify
openclaw models list
```

**Expected output:**
```
Model                    Input   Ctx    Local Auth  Tags
moonshot/kimi-k2.5       text    250k   no    yes   default,configured
```

---

## 🤖 Configure Kimi K2.5

### Step 1: Add Moonshot API Key

Get your API key from https://platform.moonshot.ai → API Keys

```bash
# Set API key
openclaw config set auth.profiles.moonshot:default.mode api_key
openclaw config set auth.profiles.moonshot:default.apiKey sk-YOUR_MOONSHOT_API_KEY
```

Or manually edit `~/.openclaw/openclaw.json`:

```json
{
  "auth": {
    "profiles": {
      "moonshot:default": {
        "provider": "moonshot",
        "mode": "api_key",
        "apiKey": "sk-YOUR_MOONSHOT_API_KEY"
      }
    }
  }
}
```

### Step 2: Configure Model Details

```bash
# Ensure Kimi K2.5 is configured
openclaw config set models.providers.moonshot.baseUrl https://api.moonshot.ai/v1
openclaw config set models.providers.moonshot.api openai-completions
```

Add to `~/.openclaw/openclaw.json` if not present:

```json
{
  "models": {
    "mode": "merge",
    "providers": {
      "moonshot": {
        "baseUrl": "https://api.moonshot.ai/v1",
        "api": "openai-completions",
        "models": [
          {
            "id": "kimi-k2.5",
            "name": "Kimi K2.5",
            "reasoning": false,
            "input": ["text"],
            "cost": {
              "input": 0,
              "output": 0,
              "cacheRead": 0,
              "cacheWrite": 0
            },
            "contextWindow": 256000,
            "maxTokens": 8192
          }
        ]
      }
    }
  },
  "agents": {
    "defaults": {
      "model": {
        "primary": "moonshot/kimi-k2.5"
      },
      "models": {
        "moonshot/kimi-k2.5": {
          "alias": "Kimi"
        }
      }
    }
  }
}
```

### Step 3: Test the Model

```bash
# Start interactive agent
openclaw agent

# Or send a test message
openclaw agent --message "Hello, are you working?" --deliver
```

---

## 💬 Link Telegram

### Step 1: Create Telegram Bot

1. Open Telegram app
2. Search for **@BotFather**
3. Start chat and send: `/newbot`
4. Follow prompts to name your bot
5. **Save the bot token** (looks like: `123456789:ABCdefGHIjklMNOpqrsTUVwxyz`)

### Step 2: Link Bot to OpenClaw

```bash
openclaw channels login telegram
```

**What happens:**
- Prompts for bot token
- Validates connection
- Stores credentials securely

**Manual configuration** (alternative):

Add to `~/.openclaw/openclaw.json`:

```json
{
  "channels": {
    "telegram": {
      "bots": [
        {
          "name": "my-openclaw-bot",
          "token": "123456789:YOUR_BOT_TOKEN_HERE",
          "enabled": true
        }
      ]
    }
  }
}
```

### Step 3: Start Telegram Channel

```bash
# Start the gateway (if not running)
openclaw gateway start

# Or ensure it's running
openclaw gateway status
```

### Step 4: Test Telegram Connection

1. Open Telegram
2. Find your bot (search by username you created)
3. Send `/start`
4. Send a message like "Hello"
5. OpenClaw should respond via the gateway

### Step 5: Send Test Message from OpenClaw

```bash
# Send message via Telegram
openclaw message send --channel telegram --target @YOUR_BOT_USERNAME --message "Test from OpenClaw"
```

---

## ✅ Verification

### Complete System Check

```bash
echo "=== OPENCLOW SETUP VERIFICATION ==="
echo ""
echo "1. OpenClaw Version:"
openclaw --version
echo ""
echo "2. Default Model:"
openclaw models list | grep default
echo ""
echo "3. Gateway Status:"
openclaw gateway status 2>&1 | grep -E "Runtime|Listening"
echo ""
echo "4. Telegram Bot:"
openclaw channels list 2>&1 | grep telegram || echo "   No Telegram bots configured"
echo ""
echo "5. Health Check:"
openclaw health 2>&1 | head -3
echo ""
echo "=== VERIFICATION COMPLETE ==="
```

### Expected Results

| Check | Expected Output |
|-------|-----------------|
| OpenClaw version | `2026.2.19-2` or later |
| Default model | `moonshot/kimi-k2.5` with `default` tag |
| Gateway | `Runtime: running` |
| Telegram | Shows your bot name |
| Health | `Agents: main (default)` |

---

## 📝 Agent Prompt Template

Give this to a new OpenClaw agent:

```
SETUP TASK: Install and configure OpenClaw with Kimi K2.5 and Telegram

MY CREDENTIALS:
- Moonshot API Key: sk-YOUR_MOONSHOT_KEY_HERE
- Telegram Bot Token: YOUR_BOT_TOKEN_HERE (from @BotFather)

PHASE 1: INSTALLATION
1. Run: curl -fsSL https://openclaw.ai/install.sh | bash
2. Verify: openclaw --version (should show version)
3. Run: openclaw setup

PHASE 2: CONFIGURE KIMI K2.5
1. Run: openclaw models set moonshot/kimi-k2.5
2. Run: openclaw config set auth.profiles.moonshot:default.mode api_key
3. Run: openclaw config set auth.profiles.moonshot:default.apiKey sk-YOUR_MOONSHOT_KEY_HERE
4. Verify: openclaw models list (should show kimi-k2.5 as default)

PHASE 3: LINK TELEGRAM
1. Run: openclaw channels login telegram
   When prompted, enter bot token: YOUR_BOT_TOKEN_HERE
2. Start gateway: openclaw gateway start
3. Verify: openclaw channels list | grep telegram

PHASE 4: VERIFICATION
1. Run: openclaw health
2. Run: openclaw status
3. Test: Send test message via Telegram bot

REPORT BACK:
- OpenClaw version
- Default model shown
- Gateway status
- Telegram bot name
- Confirmation that agent responds via Telegram
```

---

## 📊 Command Reference

### Installation & Setup

```bash
# Install OpenClaw
curl -fsSL https://openclaw.ai/install.sh | bash

# Verify installation
openclaw --version

# Initialize workspace
openclaw setup

# Run onboarding wizard
openclaw onboard
```

### Model Management

```bash
# List configured models
openclaw models list

# Set default model
openclaw models set moonshot/kimi-k2.5

# Check model status
openclaw models status
```

### Gateway Control

```bash
# Start gateway
openclaw gateway start

# Check status
openclaw gateway status

# Stop gateway
openclaw gateway stop

# Restart gateway
openclaw gateway restart

# Install as service
openclaw gateway install
```

### Telegram

```bash
# Link Telegram bot
openclaw channels login telegram

# List configured channels
openclaw channels list

# Send test message
openclaw message send --channel telegram --target @BOT_USERNAME --message "Test"

# Get your chat ID
openclaw directory --channel telegram
```

### Configuration

```bash
# View config
openclaw config get

# Set a value
openclaw config set KEY VALUE

# View full config file
cat ~/.openclaw/openclaw.json | jq .
```

### Testing

```bash
# Test agent interaction
openclaw agent --message "Hello" --deliver

# Check health
openclaw health

# Check status
openclaw status
```

---

## 🆘 Troubleshooting

### Problem: Command not found

**Symptoms:**
```
zsh: command not found: openclaw
```

**Solution:**
```bash
# Add to PATH
export PATH="$PATH:/opt/homebrew/bin"

# Or reload shell
exec zsh -l
```

---

### Problem: Gateway won't start

**Symptoms:**
```
Runtime: stopped
Port 18789 already in use
```

**Solution:**
```bash
# Kill existing processes
pkill -f "openclaw-gateway"
sleep 2

# Restart
openclaw gateway install
openclaw gateway status
```

---

### Problem: Model not responding

**Symptoms:**
```
Error: No response from model
API key invalid
```

**Solution:**
```bash
# Verify API key is set
openclaw config get auth.profiles.moonshot:default.apiKey

# Re-set API key
openclaw config set auth.profiles.moonshot:default.apiKey sk-YOUR_KEY_HERE

# Test
openclaw agent --message "Test" --deliver
```

---

### Problem: Telegram bot not responding

**Symptoms:**
- Bot doesn't reply to messages
- Can't send messages from OpenClaw

**Solution:**
```bash
# 1. Verify bot token
openclaw config get channels.telegram.bots

# 2. Check gateway is running
openclaw gateway status

# 3. Restart gateway
openclaw gateway restart

# 4. Re-link if needed
openclaw channels login telegram
```

**Also check:**
- Did you send `/start` to the bot in Telegram?
- Is the bot token correct? (Get new one from @BotFather if unsure)
- Is the bot username correct in commands?

---

### Problem: Onboarding fails

**Symptoms:**
```
Wizard failed
Config already exists
```

**Solution:**
```bash
# Reset and start fresh
openclaw reset

# Or backup and re-run
mv ~/.openclaw/openclaw.json ~/.openclaw/openclaw.json.bak
openclaw onboard
```

---

## 📁 File Locations

| What | Where |
|------|-------|
| OpenClaw binary | `/opt/homebrew/bin/openclaw` |
| Configuration | `~/.openclaw/openclaw.json` |
| Workspace | `~/.openclaw/workspace/` |
| Sessions | `~/.openclaw/agents/main/sessions/` |
| Logs | `/tmp/openclaw/` |
| Gateway LaunchAgent | `~/Library/LaunchAgents/ai.openclaw.gateway.plist` |
| This guide | `~/.openclaw/workspace/OPENCLAW_SETUP_COMPLETE.md` |

---

## ✅ Success Checklist

Your OpenClaw installation is complete when:

- [ ] `openclaw --version` shows version number
- [ ] `openclaw models list` shows `moonshot/kimi-k2.5` as default
- [ ] `openclaw gateway status` shows "Runtime: running"
- [ ] `openclaw channels list` shows your Telegram bot
- [ ] You can chat with the agent via Telegram
- [ ] `openclaw health` reports no errors

---

## 🎉 You're Done!

Your OpenClaw installation is complete with:
- ✅ Kimi K2.5 as your AI model
- ✅ Telegram integration for remote access
- ✅ Gateway running for 24/7 availability

**Next steps:**
- Chat with your agent via Telegram from anywhere
- Add more channels (Discord, WhatsApp, etc.)
- Configure 24/7 BYOC following `MACMINI_BYOC_COMPLETE.md`

---

*Created: 2026-02-19*  
*Version: 1.0*  
*For: OpenClaw Installation with Kimi K2.5 + Telegram*
