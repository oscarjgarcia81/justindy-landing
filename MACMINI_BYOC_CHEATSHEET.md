# Mac Mini BYOC Setup - Quick Cheat Sheet

## 🚀 One-Liner Setup

```bash
# 1. Sleep prevention
sudo pmset -c sleep 0 disksleep 0 displaysleep 10 autorestart 1

# 2. Install bridge (replace TOKEN)
bash <(curl -fsSL https://cdn.kimi.com/kimi-claw/install.sh) --bot-token sk-YOUR_TOKEN_HERE

# 3. Install gateway service
openclaw gateway install

# 4. Verify
openclaw gateway status && grep "kimi-bridge.*connected" /tmp/openclaw/openclaw-$(date +%Y-%m-%d).log | tail -1
```

---

## 📝 Prompt Template for New Agent

Copy-paste this into a new OpenClaw session:

```
I need you to configure this Mac Mini for 24/7 remote OpenClaw access via BYOC bridging to kimi.com.

MY CREDENTIALS:
- BYOC API Key: sk-YOUR_KEY_HERE
- Sudo Password: YOUR_PASSWORD_HERE

STEPS TO EXECUTE:
1. Run: sudo pmset -c sleep 0; sudo pmset -c disksleep 0; sudo pmset -c displaysleep 10; sudo pmset -c autorestart 1
2. Verify: pmset -g | grep -E "^ sleep|disksleep|autorestart"
3. Install bridge: bash <(curl -fsSL https://cdn.kimi.com/kimi-claw/install.sh) --bot-token sk-YOUR_KEY_HERE
4. Verify plugin: openclaw plugins list | grep kimi-claw
5. Install gateway: openclaw gateway install
6. Verify running: openclaw gateway status
7. Check bridge: grep "kimi-bridge.*connected" /tmp/openclaw/openclaw-$(date +%Y-%m-%d).log | tail -3
8. Run final check: openclaw health

CONFIRM EACH STEP BEFORE PROCEEDING TO THE NEXT.
Report back with: sleep settings, gateway status, and bridge connection status.
```

---

## 🔍 Quick Checks

| Check | Command |
|-------|---------|
| Sleep status | `pmset -g \| grep sleep` |
| Gateway running? | `openclaw gateway status` |
| Bridge connected? | `grep "kimi-bridge.*connected" /tmp/openclaw/openclaw-$(date +%Y-%m-%d).log` |
| Health check | `openclaw health` |
| Dashboard | `open http://127.0.0.1:18789/` |

---

## 🆘 Emergency Fixes

```bash
# Gateway stuck?
pkill -f "openclaw-gateway" && sleep 2 && openclaw gateway install

# Bridge auth failed?
openclaw config set plugins.entries.kimi-claw.config.bridge.token "sk-NEW_TOKEN"
openclaw gateway restart

# Full reset?
openclaw gateway stop
pkill -f "openclaw-gateway"
openclaw gateway install
```

---

## 📊 Expected Outputs

### Sleep Prevention
```
sleep                0 (sleep prevented by ...)
disksleep            0
autorestart          1
```

### Gateway Status
```
Runtime: running (pid XXXXX, state active)
RPC probe: ok
Listening: 127.0.0.1:18789
```

### Bridge Connection
```
[kimi-bridge] bridge ACP connected url=wss://www.kimi.com/api-claw/bots/agent-ws
```

---

## 🎯 Success = All Green

- ✅ Sleep: 0
- ✅ Gateway: running
- ✅ Bridge: connected to kimi.com
- ✅ Dashboard: accessible
