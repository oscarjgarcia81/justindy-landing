# RATE_LIMITS.md
# Rate Limits & Budget Controls
# Last Updated: 2026-02-19

## API Rate Limits (Moonshot AI)

Based on account tier:
- **Current Tier**: Check at https://platform.moonshot.ai
- **RPM** (Requests Per Minute): Varies by tier
- **TPM** (Tokens Per Minute): Varies by tier
- **Concurrency**: Max simultaneous requests

## Operational Rate Limits (Self-Enforced)

### Time Delays Between Operations
- **5 seconds minimum** between API calls
- **10 seconds minimum** between web searches
- **2-minute break** after every 5 searches
- **5-minute cooldown** after hitting 429 error, then retry

### Batch Operations
- ✅ DO: One request for 10 leads
- ❌ DON'T: 10 separate requests for 10 leads
- ✅ DO: Batch similar work together
- ❌ DON'T: Make individual calls when batching is possible

### Error Handling
- **429 Error (Rate Limited)**: STOP immediately, wait 5 minutes, retry
- **401/403 Error**: Check API key validity
- **5xx Errors**: Wait 30 seconds, retry with exponential backoff

## Budget Controls

### Daily Budget
- **Limit**: $10 USD
- **Warning**: At 75% ($7.50)
- **Action at limit**: Pause non-essential operations, ask user

### Monthly Budget
- **Limit**: $300 USD
- **Warning**: At 75% ($225)
- **Action at limit**: Emergency stop, require explicit approval

### Cost-Saving Rules
1. Use **Ollama** (free) for heartbeats and simple tasks
2. Use **Kimi** (paid) only for complex reasoning
3. **Cache results** when possible
4. **Batch requests** instead of individual calls
5. **Check HEARTBEAT.md** before starting new work cycles

## Token Efficiency

### Context Management
- Load only essential files on startup
- Use memory_search() instead of full MEMORY.md load
- Compact old context before adding new

### Model Selection
- **llama3.2:3b** (Ollama): Free, for heartbeats, simple checks
- **kimi-k2.5**: Standard tasks, general conversation
- **kimi-k2-thinking**: Complex reasoning, analysis, coding

## Emergency Stop Triggers

STOP and alert user if:
- Daily spend exceeds $10
- Monthly spend exceeds $300
- 429 errors occur more than 3 times in 10 minutes
- Unexpected cost spike detected

## Budget Bypass Protocol

If approaching or hitting budget limits:
1. **STOP** non-essential operations
2. **Alert user** with current spend and projected cost
3. **Ask explicitly**: "Daily/Monthly budget limit reached. Request bypass? (yes/no)"
4. **If granted**: Continue operations with bypass noted in memory
5. **If denied**: Pause until next budget period or explicit approval

**Always ask first. Never assume bypass is automatic.**

## Audit Trail

Track in memory/YYYY-MM-DD.md:
- API calls made
- Costs incurred
- Rate limit hits
- Budget status
