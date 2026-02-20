# Mac Mini 24/7 BYOC Setup Guide
> Complete runbook for 24/7 remote OpenClaw access via BYOC bridging to kimi.com

---

## 📑 Table of Contents

1. [Quick Start](#quick-start)
2. [Prerequisites](#prerequisites)
3. [Setup Instructions](#setup-instructions)
   - Phase 1: System Preparation
   - Phase 2: Bridge Installation
   - Phase 3: Gateway Configuration
   - Phase 4: Verification
4. [Agent Prompt Template](#agent-prompt-template)
5. [Troubleshooting](#troubleshooting)
6. [Command Reference](#command-reference)
7. [File Locations](#file-locations)

---

## 🚀 Quick Start

For experienced users - copy, paste, and replace `YOUR_TOKEN` and `YOUR_PASSWORD`:

```bash
# 1. Prevent sleep (requires sudo password)
sudo pmset -c sleep 0
sudo pmset -c disksleep 0
sudo pmset -c displaysleep 10
sudo pmset -c autorestart 1

# 2. Install kimi-claw bridge (requires BYOC token)
bash <(curl -fsSL https://cdn.kimi.com/kimi-claw/install.sh) --bot-token sk-YOUR_TOKEN_HERE

# 3. Install gateway service
openclaw gateway install

# 4. Verify everything works
openclaw gateway status && grep "kimi-bridge.*connected" /tmp/openclaw/openclaw-$(date +%Y-%m-%d).log | tail -1
```

**Done!** Access your Mac remotely at https://kimi.com or locally at http://127.0.0.1:18789/

---

## 📋 Prerequisites

Before starting, ensure you have:

| Requirement | How to Check |
|-------------|--------------|
| macOS with admin access | `whoami` should show your user |
| OpenClaw installed | `openclaw --version` should return version |
| BYOC API key from kimi.com | Get at https://kimi.com/settings/api-keys |
| Mac connected to power | Check menu bar power icon |
| Sudo password | You'll need to enter it multiple times |

---

## 🔧 Setup Instructions

### Phase 1: System Preparation & Sleep Prevention

The goal is to keep your Mac awake 24/7 while on AC power.

#### Step 1: Verify OpenClaw

```bash
which openclaw
openclaw --version
```

**Expected output:**
```
/opt/homebrew/bin/openclaw
2026.2.19-2
```

If version is older than `v2026.1.29`, update:
```bash
curl -fsSL https://openclaw.ai/install.sh | bash
```

#### Step 2: Configure Sleep Settings

Run each command (you'll be prompted for your sudo password):

```bash
# Prevent system sleep when on charger
sudo pmset -c sleep 0

# Prevent disk spin-down
sudo pmset -c disksleep 0

# Allow display to sleep after 10 min (saves energy)
sudo pmset -c displaysleep 10

# Auto-restart after power failure
sudo pmset -c autorestart 1
```

#### Step 3: Verify Sleep Settings

```bash
pmset -g | grep -E "^ sleep|disksleep|autorestart"
```

**Expected output:**
```
 autorestart          1
 disksleep            0
 sleep                0 (sleep prevented by coreaudiod, powerd)
```

✅ **Phase 1 Complete!** Your Mac will stay awake on AC power.

---

### Phase 2: Install Kimi-Claw Bridge

This connects your local OpenClaw to kimi.com for remote access.

#### Step 1: Install with Your BYOC Token

Replace `sk-YOUR_TOKEN_HERE` with your actual kimi.com BYOC API key:

```bash
bash <(curl -fsSL https://cdn.kimi.com/kimi-claw/install.sh) --bot-token sk-YOUR_TOKEN_HERE
```

**Expected output:**
```
[install-oss] downloading package
[install-oss] staging main plugin
[install-oss] installing dependencies in staging dir
...
[install-oss] plugin config updated
[install-oss] main plugin installed successfully
[install-oss] restarting gateway
[install-oss] done
```

#### Step 2: Verify Plugin Installation

```bash
openclaw plugins list | grep kimi-claw
```

**Expected output:**
```
│ kimi-claw    │          │ loaded   │ global:kimi-claw/dist/index.js │ 0.5.6     │
```

✅ **Phase 2 Complete!** The bridge plugin is installed.

---

### Phase 3: Configure Gateway Service

This ensures OpenClaw starts automatically and stays running.

#### Step 1: Install Gateway Service

```bash
openclaw gateway install
```

**Expected output:**
```
Installed LaunchAgent: /Users/YOURNAME/Library/LaunchAgents/ai.openclaw.gateway.plist
```

#### Step 2: Verify Gateway is Running

```bash
openclaw gateway status
```

**Expected output:**
```
Runtime: running (pid XXXXX, state active)
RPC probe: ok
Listening: 127.0.0.1:18789
```

#### Step 3: Confirm Auto-Restart Configuration

```bash
grep -E "KeepAlive|RunAtLoad" ~/Library/LaunchAgents/ai.openclaw.gateway.plist
```

**Expected output:**
```
    <key>KeepAlive</key>
    <true/>
    <key>RunAtLoad</key>
    <true/>
```

✅ **Phase 3 Complete!** Gateway will auto-start on boot and restart if it crashes.

---

### Phase 4: Verification

Let's confirm everything is working.

#### Step 1: Check Bridge Connection

```bash
grep -E "kimi-bridge.*connected|kimi-bridge.*handshake" /tmp/openclaw/openclaw-$(date +%Y-%m-%d).log | tail -5
```

**Expected output (showing recent connections):**
```
[kimi-bridge] [gateway] handshake complete
[kimi-bridge] local gateway connected url=ws://127.0.0.1:18789 (acp adapter mode)
[kimi-bridge] [bridge-acp] connected
[kimi-bridge] bridge ACP connected url=wss://www.kimi.com/api-claw/bots/agent-ws
```

#### Step 2: Test Health

```bash
openclaw health
```

**Expected output:**
```
Agents: main (default)
Session store (main): /Users/.../sessions.json (X entries)
```

#### Step 3: Open Dashboard

```bash
open http://127.0.0.1:18789/
```

Your browser should open showing the OpenClaw Control UI.

✅ **Phase 4 Complete!** Everything is operational.

---

## 📝 Agent Prompt Template

Give this to a new OpenClaw agent to have it perform the entire setup:

```
SETUP TASK: Configure this Mac for 24/7 remote OpenClaw access via BYOC bridging

MY CREDENTIALS:
- BYOC API Key: sk-YOUR_KEY_HERE
- Sudo Password: YOUR_PASSWORD_HERE

Follow these phases exactly:

PHASE 1: SYSTEM PREPARATION
1. Run: sudo pmset -c sleep 0
2. Run: sudo pmset -c disksleep 0
3. Run: sudo pmset -c displaysleep 10
4. Run: sudo pmset -c autorestart 1
5. Verify: pmset -g | grep -E "^ sleep|disksleep|autorestart"
   Confirm: sleep=0, disksleep=0, autorestart=1

PHASE 2: BRIDGE INSTALLATION
1. Run: bash <(curl -fsSL https://cdn.kimi.com/kimi-claw/install.sh) --bot-token sk-YOUR_KEY_HERE
2. Verify: openclaw plugins list | grep kimi-claw
   Confirm: Shows "kimi-claw" with status "loaded"

PHASE 3: GATEWAY SERVICE
1. Run: openclaw gateway install
2. Verify: openclaw gateway status
   Confirm: Shows "Runtime: running" and "RPC probe: ok"
3. Check: grep -E "KeepAlive|RunAtLoad" ~/Library/LaunchAgents/ai.openclaw.gateway.plist
   Confirm: Both KeepAlive and RunAtLoad are set to true

PHASE 4: VERIFICATION
1. Check bridge: grep "kimi-bridge.*connected" /tmp/openclaw/openclaw-$(date +%Y-%m-%d).log | tail -3
   Confirm: Shows connection to wss://www.kimi.com
2. Run health: openclaw health
   Confirm: Shows "Agents: main (default)" with no errors

REPORT BACK:
- Sleep settings output
- Gateway status
- Bridge connection lines
- Confirmation that http://127.0.0.1:18789/ loads
```

---

## 🆘 Troubleshooting

### Problem: Gateway won't start

**Symptoms:**
```
Runtime: stopped
Port 18789 is already in use
```

**Solution:**
```bash
# Kill any existing processes
pkill -f "openclaw-gateway"
sleep 2

# Restart
openclaw gateway stop
openclaw gateway install
openclaw gateway status
```

---

### Problem: Bridge shows "auth failed (http 401)"

**Symptoms:**
```
[kimi-bridge] [bridge-acp] auth failed (http 401)
```

**Cause:** Invalid or expired BYOC token

**Solution:**
1. Get new token from https://kimi.com/settings/api-keys
2. Update the config:
```bash
openclaw config set plugins.entries.kimi-claw.config.bridge.token "sk-NEW_TOKEN_HERE"
```
3. Restart gateway:
```bash
openclaw gateway restart
```

---

### Problem: "device token mismatch" error

**Symptoms:**
```
unauthorized: device token mismatch (rotate/reissue device token)
```

**Solution:**
```bash
openclaw gateway stop
pkill -f "openclaw-gateway"
openclaw gateway install
sleep 3
openclaw health
```

---

### Problem: Mac goes to sleep despite configuration

**Check current settings:**
```bash
pmset -g | grep sleep
```

**Re-apply settings:**
```bash
sudo pmset -c sleep 0
sudo pmset -c disksleep 0
```

**Note:** Some Macs have hardware limitations. Check Activity Monitor for apps preventing sleep.

---

### Problem: Can't access from kimi.com

**Checklist:**
1. Is bridge connected? `grep "kimi-bridge.*connected" /tmp/openclaw/openclaw-$(date +%Y-%m-%d).log`
2. Is gateway running? `openclaw gateway status`
3. Is BYOC token valid? Check at https://kimi.com/settings/api-keys
4. Try restarting: `openclaw gateway restart`

---

## 📊 Command Reference

### Gateway Control

```bash
openclaw gateway status      # Check if running
openclaw gateway start       # Start manually
openclaw gateway stop        # Stop service
openclaw gateway restart     # Restart service
openclaw gateway install     # Install as LaunchAgent
```

### Health Checks

```bash
openclaw health              # Overall health check
openclaw status              # Channel status
openclaw plugins list        # List installed plugins
```

### Sleep Settings

```bash
pmset -g                     # View all power settings
sudo pmset -c sleep 0        # Never sleep on AC
sudo pmset -c disksleep 0    # Never spin down disk
sudo pmset -c displaysleep 10 # Display sleeps after 10 min
sudo pmset -c autorestart 1  # Auto-restart after power loss
```

### Log Viewing

```bash
# View today's gateway logs
tail -f /tmp/openclaw/openclaw-$(date +%Y-%m-%d).log

# View bridge connection logs
grep "kimi-bridge" /tmp/openclaw/openclaw-$(date +%Y-%m-%d).log

# View gateway errors
tail -f /Users/$USER/.openclaw/logs/gateway.err.log
```

---

## 📁 File Locations

| What | Where |
|------|-------|
| **OpenClaw Config** | `~/.openclaw/openclaw.json` |
| **Gateway LaunchAgent** | `~/Library/LaunchAgents/ai.openclaw.gateway.plist` |
| **Gateway Logs** | `/tmp/openclaw/openclaw-YYYY-MM-DD.log` |
| **kimi-claw Plugin** | `~/.openclaw/extensions/kimi-claw/` |
| **Session Storage** | `~/.openclaw/agents/main/sessions/sessions.json` |
| **This Guide** | `~/.openclaw/workspace/MACMINI_BYOC_COMPLETE.md` |

---

## 🌐 Access Points

| Method | URL | When to Use |
|--------|-----|-------------|
| **Local Dashboard** | http://127.0.0.1:18789/ | On same network as Mac |
| **Remote (kimi.com)** | https://kimi.com | Anywhere with internet |

---

## ✅ Success Checklist

Your Mac Mini is correctly configured when all are true:

- [ ] `pmset -g | grep "^ sleep"` shows `sleep 0`
- [ ] `openclaw gateway status` shows "Runtime: running"
- [ ] `launchctl list | grep openclaw` shows the service
- [ ] Logs show "kimi-bridge bridge ACP connected"
- [ ] http://127.0.0.1:18789/ loads in browser
- [ ] Your instance appears at https://kimi.com

---

## 🎉 You're Done!

Your Mac Mini is now a 24/7 remote OpenClaw agent accessible from anywhere via kimi.com!

**What happens next:**
- Mac stays awake while on power
- Gateway auto-starts on boot
- Bridge reconnects automatically if disconnected
- You can access your agent from any device via https://kimi.com

---

*Created: 2026-02-19*  
*Version: 1.0*  
*For: Mac Mini 24/7 BYOC Remote Access*
