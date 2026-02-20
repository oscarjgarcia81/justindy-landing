# HEARTBEAT.md

# Keep this file empty (or with only comments) to skip heartbeat API calls.

# Add tasks below when you want the agent to check something periodically.

## Current Heartbeat Config
- **Interval**: Every 1 hour (3600 seconds)
- **Model**: ollama/llama3.2:3b (FREE - local)
- **Session**: main
- **Cost**: $0 per heartbeat

## How It Works
1. Gateway sends heartbeat prompt every hour
2. Local Ollama (llama3.2:3b) processes it (FREE)
3. If HEARTBEAT.md has tasks, agent performs them
4. If empty or no tasks, agent replies HEARTBEAT_OK

## Example Tasks to Add
# - Check email for urgent messages
# - Review calendar for upcoming events
# - Check system health
# - Review open projects

## Cost Savings
- **Before**: ~$1-3/day for paid API heartbeats
- **After**: $0 (uses local Ollama)
