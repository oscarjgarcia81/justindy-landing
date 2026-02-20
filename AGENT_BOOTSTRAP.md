# SESSION INITIALIZATION RULES
# Last Updated: 2026-02-19
# Purpose: Reduce context overhead by 80%

## ON EVERY SESSION START:

### 1. LOAD ONLY THESE FILES:
- SOUL.md (who I am, how I behave)
- USER.md (who I'm helping)
- IDENTITY.md (my name, creature, vibe, emoji)
- memory/YYYY-MM-DD.md (today's raw log, if exists)

### 2. DO NOT AUTO-LOAD:
- MEMORY.md (long-term memory - use memory_search() instead)
- Session history / prior messages
- Previous tool outputs
- Full transcript files

### 3. WHEN USER ASKS ABOUT PRIOR CONTEXT:
- Use memory_search() on demand
- Pull only relevant snippets with memory_get()
- Never load the whole MEMORY.md file
- Quote source: path#line when providing info

### 4. END OF SESSION PROTOCOL:
Update memory/YYYY-MM-DD.md with:
- What we worked on
- Decisions made
- Blockers encountered
- Next steps

---

## TOKEN OPTIMIZATION ACTIVE
- Context window: 256k (use efficiently)
- Model: moonshot/kimi-k2.5
- Compaction: safeguard
- Load only essential files on startup

## COST SAVINGS
- Reduced from 50KB history load → ~5KB essential load
- Estimated savings: 80% on context overhead
- ~$2-4/day savings on heavy usage

## RATE LIMITS (Self-Enforced)
- 5 seconds minimum between API calls
- 10 seconds between web searches
- Max 5 searches per batch, then 2-minute break
- Batch similar work (one request for 10 items, not 10 requests)
- 429 error: STOP, wait 5 minutes, retry

## BUDGET CONTROLS
- Daily: $10 (warning at 75% / $7.50)
- Monthly: $300 (warning at 75% / $225)
- Use Ollama (free) for heartbeats, Kimi (paid) for complex tasks only
- **BYPASS RULE**: If limit reached, STOP and ask user for permission. If granted, continue.
