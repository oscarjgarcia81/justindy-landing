# Mac Mini 24/7 BYOC Setup Guide

Complete runbook for configuring a Mac Mini for 24/7 remote OpenClaw access via BYOC (Bring Your Own Claw) bridging to kimi.com.

---

## 📋 Prerequisites

- macOS with admin access
- OpenClaw installed (`openclaw --version` should work)
- BYOC API key from kimi.com (get at https://kimi.com/settings/api-keys)
- Mac Mini connected to power (for sleep prevention to matter)

---

## 🚀 Quick Start (Copy-Paste)

**Prompt to give your new OpenClaw instance:**

```
Configure this Mac for 24/7 remote OpenClaw access via BYOC bridging to kimi.com. 
Follow the runbook at ~/.openclaw/workspace/MACMINI_BYOC_SETUP.md and execute all phases.
My BYOC API key is: sk-YOUR_KEY_HERE
My sudo password is: YOUR_PASSWORD_HERE
```

---

## Phase 1: System Preparation & Sleep Prevention

### 1.1 Verify OpenClaw Installation

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

### 1.2 Configure Sleep Settings

```bash
sudo pmset -c sleep 0
sudo pmset -c disksleep 0
sudo pmset -c displaysleep 10
sudo pmset -c autorestart 1
```

**Verify:**
```bash
pmset -g | grep -E "^ sleep|disksleep|autorestart"
```

**Expected:**
```
 autorestart          1
 disksleep            0
 sleep                0 (sleep prevented by ...)
```

---

## Phase 2: Install Kimi-Claw Bridge

### 2.1 Install with BYOC Token

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

### 2.2 Verify Plugin Installation

```bash
openclaw plugins list | grep kimi-claw
```

**Expected:**
```
│ kimi-claw    │          │ loaded   │ global:kimi-claw/dist/index.js │ 0.5.6     │
```

---

## Phase 3: Configure Gateway Service

### 3.1 Install/Reinstall Gateway with Auto-Start

```bash
openclaw gateway install
```

**Expected:**
```
Installed LaunchAgent: /Users/USERNAME/Library/LaunchAgents/ai.openclaw.gateway.plist
```

### 3.2 Verify Gateway is Running

```bash
openclaw gateway status
```

**Expected:**
```
Runtime: running (pid XXXXX, state active)
RPC probe: ok
Listening: 127.0.0.1:18789
```

### 3.3 Check Auto-Restart Configuration

```bash
grep -E "KeepAlive|RunAtLoad" ~/Library/LaunchAgents/ai.openclaw.gateway.plist
```

**Expected:**
```
    <key>KeepAlive</key>
    <true/>
    <key>RunAtLoad</key>
    <true/>
```

---

## Phase 4: Verify Bridge Connection

### 4.1 Check Bridge Logs

```bash
grep -E "kimi-bridge.*connected|kimi-bridge.*handshake" /tmp/openclaw/openclaw-$(date +%Y-%m-%d).log | tail -5
```

**Expected:**
```
[kimi-bridge] [gateway] handshake complete
[kimi-bridge] local gateway connected url=ws://127.0.0.1:18789
[kimi-bridge] [bridge-acp] connected
[kimi-bridge] bridge ACP connected url=wss://www.kimi.com/api-claw/bots/agent-ws
```

### 4.2 Test Health

```bash
openclaw health
```

**Expected:**
```
Agents: main (default)
Session store (main): /Users/.../sessions.json (X entries)
```

---

## Phase 5: Final Verification

Run this comprehensive check:

```bash
echo "=== MAC MINI 24/7 REMOTE ACCESS STATUS ==="
echo ""
echo "Sleep Prevention:"
pmset -g | grep -E "^ sleep|disksleep|autorestart"
echo ""
echo "Gateway Process:"
ps aux | grep -v grep | grep "openclaw-gateway"
echo ""
echo "LaunchAgent:"
launchctl list | grep openclaw
echo ""
echo "Bridge Connection:"
grep "kimi-bridge.*connected" /tmp/openclaw/openclaw-$(date +%Y-%m-%d).log | tail -1
echo ""
echo "Dashboard: http://127.0.0.1:18789/"
echo "Remote: https://kimi.com"
```

---

## 🔧 Troubleshooting

### Issue: Gateway won't start

**Fix:**
```bash
# Kill any existing processes
pkill -f "openclaw-gateway"
sleep 2

# Restart
openclaw gateway stop
openclaw gateway install
openclaw gateway status
```

### Issue: Bridge shows "auth failed (http 401)"

**Cause:** Invalid or expired BYOC token

**Fix:**
1. Get new token from https://kimi.com/settings/api-keys
2. Update config:
```bash
openclaw config set plugins.entries.kimi-claw.config.bridge.token "sk-NEW_TOKEN_HERE"
```
3. Restart gateway:
```bash
openclaw gateway restart
```

### Issue: "device token mismatch"

**Fix:** Rotate gateway token
```bash
openclaw gateway stop
pkill -f "openclaw-gateway"
openclaw gateway install
sleep 3
openclaw health
```

### Issue: Mac goes to sleep

**Check:**
```bash
pmset -g | grep sleep
```

**Fix:**
```bash
sudo pmset -c sleep 0
sudo pmset -c disksleep 0
```

---

## 📁 Important File Locations

| File | Path |
|------|------|
| OpenClaw Config | `~/.openclaw/openclaw.json` |
| Gateway LaunchAgent | `~/Library/LaunchAgents/ai.openclaw.gateway.plist` |
| Gateway Logs | `/tmp/openclaw/openclaw-YYYY-MM-DD.log` |
| kimi-claw Plugin | `~/.openclaw/extensions/kimi-claw/` |
| Session Store | `~/.openclaw/agents/main/sessions/sessions.json` |

---

## 🌐 Access Points

| Method | URL | Notes |
|--------|-----|-------|
| Local Dashboard | http://127.0.0.1:18789/ | Same network only |
| Remote Access | https://kimi.com | Anywhere with internet |

---

## 📝 Commands Reference

```bash
# Gateway control
openclaw gateway status
openclaw gateway start
openclaw gateway stop
openclaw gateway restart
openclaw gateway install

# Health check
openclaw health
openclaw status

# Plugin management
openclaw plugins list

# View logs
tail -f /tmp/openclaw/openclaw-$(date +%Y-%m-%d).log

# Sleep settings
pmset -g                    # View all settings
sudo pmset -c sleep 0       # Never sleep on AC
```

---

## ✅ Success Criteria

Your Mac Mini is correctly configured when:

- [ ] `pmset -g | grep "^ sleep"` shows `sleep 0`
- [ ] `openclaw gateway status` shows "Runtime: running"
- [ ] `launchctl list | grep openclaw` shows the service
- [ ] Logs show "kimi-bridge bridge ACP connected"
- [ ] You can access http://127.0.0.1:18789/ locally
- [ ] Your instance appears on https://kimi.com

---

## 🎉 Done!

Your Mac Mini is now a 24/7 remote OpenClaw agent accessible from anywhere via kimi.com!

Created: 2026-02-19
Version: 1.0
