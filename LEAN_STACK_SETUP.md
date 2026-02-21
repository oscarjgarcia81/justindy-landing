# Lean Stack AI Lead Gen — Implementation Guide

Complete setup for $255/mo stack to get your next clients.

---

## Step 1: Account Setup (Do This First)

### Apollo.io (Basic Plan — $49/mo)
**Sign up:** https://apollo.io

**Setup:**
1. Create account with justin@justindy.ai
2. Connect your LinkedIn (helps with data quality)
3. Set up basic profile

**Key Settings:**
- Export limit: 1,000 contacts/month (Basic plan)
- Use filters: Industry, Company Size, Job Title, Location
- Save lists by ICP type

---

### Clay (Starter Plan — $134/mo)
**Sign up:** https://www.clay.com

**Setup:**
1. Create workspace
2. Install Clay Chrome extension
3. Connect Apollo (integration)
4. Connect your email (Gmail/Workspace)

**First Table Setup:**
```
Table Name: "Lead Gen Campaign — [ICP Name]"

Columns:
1. Company Name (Text)
2. Contact Name (Text)
3. Title (Text)
4. Email (Text)
5. LinkedIn URL (URL)
6. Company Size (Number)
7. Industry (Text)
8. AI Personalization (Formula → see below)
9. Email Valid (Checkbox)
10. Status (Single Select: To Contact, Contacted, Replied, Meeting Booked)
```

**Clay AI Formula for Personalization:**
```
Write a 1-sentence icebreaker for {{Contact Name}} at {{Company Name}}.

Context:
- Their title: {{Title}}
- Company size: {{Company Size}}
- Industry: {{Industry}}

The icebreaker should:
- Reference a likely pain point for their role/industry
- Be conversational, not salesy
- Mention something specific about automation or saving time
- End with a natural transition to a question

Examples:
- "{{Contact Name}} — saw {{Company Name}} is hiring for ops roles. Guessing manual processes are eating up your team's time?"
- "Noticed {{Company Name}} recently expanded. Bet your team's drowning in repetitive tasks right now?"

Return only the icebreaker, no extra text.
```

---

### Smartlead (Basic Plan — $37/mo)
**Sign up:** https://smartlead.ai

**Setup:**
1. Create account
2. Add your domains (we'll set these up next)
3. Connect mailboxes
4. Enable warmup (automatic)

---

## Step 2: Domain & Email Setup

### Buy 3 Satellite Domains
**Where:** Namecheap, Cloudflare, or Google Domains (~$12/yr each)

**Domain Ideas:**
- tryjustindy.com
- getjustindy.com
- justindysolutions.com

### Set Up DNS Records (Per Domain)

**Required for deliverability:**

**1. SPF Record (TXT):**
```
Host: @
Value: v=spf1 include:_spf.google.com ~all
```

**2. DKIM (Google Workspace auto-generates this)**

**3. DMARC Record (TXT):**
```
Host: _dmarc
Value: v=DMARC1; p=quarantine; rua=mailto:dmarc@yourdomain.com
```

### Create Mailboxes
**Per domain:** 2 mailboxes
- john@tryjustindy.com
- sarah@tryjustindy.com

**Setup in Google Workspace:**
1. Add users ($6/user/mo)
2. Enable 2FA
3. Set profile pictures (professional headshots)
4. Configure signatures

---

## Step 3: n8n Workflow (Your Mac)

### Install n8n (if not already)
```bash
npm install n8n -g
n8n start
```

Access at: http://localhost:5678

### Import This Workflow

**Workflow Name:** "Lead Gen — Apollo to Smartlead"

```json
{
  "name": "Lead Gen Automation",
  "nodes": [
    {
      "parameters": {
        "rule": {
          "interval": [
            {
              "field": "hours",
              "hoursInterval": 24
            }
          ]
        }
      },
      "name": "Schedule Trigger",
      "type": "n8n-nodes-base.scheduleTrigger",
      "typeVersion": 1,
      "position": [250, 300]
    },
    {
      "parameters": {
        "operation": "search",
        "table": "Lead Gen Campaign",
        "options": {
          "filterByFormula": "{Status} = 'To Contact'"
        }
      },
      "name": "Get Leads from Clay",
      "type": "n8n-nodes-base.airtable",
      "typeVersion": 1,
      "position": [450, 300]
    },
    {
      "parameters": {
        "method": "POST",
        "url": "https://api.smartlead.ai/v1/campaigns/{campaign_id}/leads",
        "authentication": "genericCredentialType",
        "genericAuthType": "httpHeaderAuth",
        "sendBody": true,
        "contentType": "json",
        "body": {
          "first_name": "={{ $json['Contact Name'].split(' ')[0] }}",
          "last_name": "={{ $json['Contact Name'].split(' ')[1] || '' }}",
          "email": "={{ $json['Email'] }}",
          "company_name": "={{ $json['Company Name'] }}",
          "custom_fields": {
            "personalization": "={{ $json['AI Personalization'] }}"
          }
        }
      },
      "name": "Send to Smartlead",
      "type": "n8n-nodes-base.httpRequest",
      "typeVersion": 4.1,
      "position": [650, 300]
    },
    {
      "parameters": {
        "operation": "update",
        "table": "Lead Gen Campaign",
        "id": "={{ $json.id }}",
        "options": {
          "fields": {
            "Status": "Contacted"
          }
        }
      },
      "name": "Update Status in Clay",
      "type": "n8n-nodes-base.airtable",
      "typeVersion": 1,
      "position": [850, 300]
    }
  ],
  "connections": {
    "Schedule Trigger": {
      "main": [
        [
          {
            "node": "Get Leads from Clay",
            "type": "main",
            "index": 0
          }
        ]
      ]
    },
    "Get Leads from Clay": {
      "main": [
        [
          {
            "node": "Send to Smartlead",
            "type": "main",
            "index": 0
          }
        ]
      ]
    },
    "Send to Smartlead": {
      "main": [
        [
          {
            "node": "Update Status in Clay",
            "type": "main",
            "index": 0
          }
        ]
      ]
    }
  }
}
```

---

## Step 4: Email Sequences

### Sequence 1: Service-Based Businesses (3 Emails)

**Email 1 (Day 1):**
```
Subject: {{Company Name}} — quick question

{{AI Personalization}}

I help {{Industry}} companies automate repetitive tasks that are eating up their team's time — things like lead follow-up, data entry, and reporting.

Recently helped a similar company save 15 hours/week with a simple automation setup.

Worth a 15-min call to see if there's a fit?

Justin
```

**Email 2 (Day 3):**
```
Subject: Re: {{Company Name}} — quick question

{{Contact Name}} — wanted to bump this to the top of your inbox.

The manual work I mentioned — is that something your team is struggling with too, or have you found a solution?

Justin
```

**Email 3 (Day 7):**
```
Subject: Should I close your file?

{{Contact Name}} —

Haven't heard back, so I'll assume this isn't a priority right now.

If things change and you want to explore automation, just reply and I'll pick this back up.

Justin
```

---

## Step 5: Daily Workflow (Your 30-Minute Routine)

### Morning (15 min):
1. **Check Clay** — Review AI-generated personalizations
2. **Edit if needed** — Fix any weird AI outputs
3. **Mark "Email Valid"** — After verification
4. **Approve for sending** — Change status to "To Contact"

### Afternoon (15 min):
1. **Check Smartlead** — Review replies
2. **Respond to interested leads** — Within 5 minutes ideally
3. **Update Clay status** — "Replied" or "Meeting Booked"
4. **Book calls** — Calendly link

---

## Step 6: Metrics to Track (Weekly)

| Metric | Target | Where to Find |
|--------|--------|---------------|
| Emails sent | 250-350/week | Smartlead dashboard |
| Open rate | 25-40% | Smartlead |
| Reply rate | 8-15% | Smartlead |
| Positive replies | 2-5/week | Manual count |
| Meetings booked | 1-3/week | Calendly |

---

## Step 7: First Campaign — Target ICP

### Who to Target First

**Ideal Prospect:**
- Industry: B2B services (marketing agencies, IT services, consulting)
- Size: 10-50 employees
- Location: Midwest (Chicago area)
- Title: Owner, Founder, CEO, Operations Director
- Signal: Hiring for admin/operations roles (Indeed/LinkedIn)

### Apollo Filters to Use
```
- Company Size: 11-50
- Industry: Marketing & Advertising OR Computer Software OR Business Services
- Location: Illinois, Wisconsin, Indiana, Ohio
- Job Title: Owner OR Founder OR CEO OR COO OR Operations
- Seniority: Director, VP, C-Level, Owner
```

### First Week Goal
- Export: 100 contacts
- Enrich in Clay: 100 contacts
- Verify emails: 100 contacts
- Send: 50 emails (Day 1)
- Send: 50 emails (Day 3)

---

## Quick Reference: Costs

| Item | Monthly Cost |
|------|--------------|
| Apollo.io Basic | $49 |
| Clay Starter | $134 |
| Smartlead Basic | $37 |
| Email Verification | $20 |
| Domains (3) | $3 |
| Google Workspace (2 seats) | $12 |
| **TOTAL** | **$255** |

---

## Support & Troubleshooting

**If emails go to spam:**
- Check warmup status in Smartlead
- Reduce daily send volume
- Verify DKIM/SPF records

**If no replies:**
- Check personalization quality in Clay
- Test different subject lines
- Narrow ICP further

**If Apollo limits hit:**
- Upgrade to Professional ($99)
- Or use multiple accounts

---

*Ready to implement. Start with Apollo setup, then work through each step.*
