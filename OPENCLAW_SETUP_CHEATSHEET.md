# OpenClaw Setup - Quick Cheat Sheet

## 🚀 One-Liner Install

```bash
curl -fsSL https://openclaw.ai/install.sh | bash && openclaw setup && openclaw onboard
```

---

## ⚡ Quick Configuration

### Set Kimi K2.5

```bash
openclaw models set moonshot/kimi-k2.5
openclaw config set auth.profiles.moonshot:default.mode api_key
openclaw config set auth.profiles.moonshot:default.apiKey sk-YOUR_KEY_HERE
```

### Link Telegram

1. Message @BotFather in Telegram, send `/newbot`, get token
2. Run: `openclaw channels login telegram` (paste token when prompted)
3. Start gateway: `openclaw gateway start`

---

## 🔍 Quick Checks

| Check | Command |
|-------|---------|
| Version | `openclaw --version` |
| Model | `openclaw models list` |
| Gateway | `openclaw gateway status` |
| Channels | `openclaw channels list` |
| Health | `openclaw health` |

---

## 🆘 Emergency Commands

```bash
# Reset everything
openclaw reset

# Restart gateway
openclaw gateway restart

# Fix "command not found"
export PATH="$PATH:/opt/homebrew/bin"

# Re-link Telegram
openclaw channels login telegram
```

---

## 📁 Key Files

```
~/.openclaw/openclaw.json          # Main config
~/.openclaw/workspace/             # Your workspace
/tmp/openclaw/                     # Logs
```

---

## ✅ Verify Success

All should work:
```bash
openclaw --version
openclaw models list | grep default
openclaw gateway status
openclaw channels list
```

**Done!** Chat with your agent via Telegram or locally.
