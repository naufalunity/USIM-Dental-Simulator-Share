# Free Hosting Guide for USIM Dental Simulator

## Overview

This guide helps you choose the best **free hosting platform** for deploying the USIM Dental Simulator to support 60+ users without exceeding your budget.

## Quick Recommendation

🏆 **Use Vercel** — it's already configured in your project and provides the best free tier for serverless functions.

---

## Platform Comparison

### 1. Vercel (Recommended) ⭐

**Tier:** Hobby (Free)

| Metric | Allowance |
|--------|-----------|
| Function Invocations | 1,000,000/month |
| Bandwidth | 100 GB/month |
| Active CPU | 4 hours/month |
| Memory | 360 GB-hours/month |
| Cold Start | <100ms |

**Pros:**
- ✅ Already configured in your `vercel.json`
- ✅ **1M function calls/month** = ~33,000/day
- ✅ Handles 60+ users easily
- ✅ Best cold-start performance (<100ms)
- ✅ Simple Git-based deployment
- ✅ Built-in monitoring and logs
- ✅ No credit card required for hobby tier

**Cons:**
- ⚠️ Pro plan ($20/seat/month) charges per developer
- Overages charged after free quota

**Cost Estimate (60 users):**
- Function calls: **FREE** (900 calls << 1M quota)
- OpenAI API: ~$1-2/month
- **Total: ~$1-2/month**

**Setup Time:** 5 minutes

---

### 2. Railway

**Tier:** Hobby (Free $5 credit/month)

| Metric | Allowance |
|--------|-----------|
| Monthly Credit | $5 USD/month |
| Function Time | Unlimited |
| Bandwidth | Unmetered |
| Cold Start | <50ms |
| Execution Timeout | 120s |

**Pros:**
- ✅ Very generous $5/month free credit
- ✅ Faster cold starts than Render
- ✅ No service spin-down
- ✅ Better for persistent workloads
- ✅ Pay-as-you-go after credit exhausted

**Cons:**
- ⚠️ Requires config changes (not Vercel-specific)
- Slightly less mature for serverless than Vercel
- Node.js setup requires additional steps

**Cost Estimate (60 users):**
- Hosting: **FREE** ($5 credit covers it)
- OpenAI API: ~$1-2/month
- **Total: ~$1-2/month**

**Setup Time:** 10 minutes

---

### 3. Render

**Tier:** Hobby (Free)

| Metric | Allowance |
|--------|-----------|
| Web Services | 512 MB RAM, 0.1 CPU |
| Bandwidth | 100 GB/month |
| Database | 256 MB PostgreSQL |
| Cold Start | **30-60s** ⚠️ |
| Inactivity Spin-down | 15 minutes |

**Pros:**
- ✅ Completely free tier
- ✅ Good for small projects
- ✅ Includes free PostgreSQL database
- ✅ Unlimited projects

**Cons:**
- ⚠️ **30-60 second cold starts** (user experience impact)
- ⚠️ Services spin down after 15 min inactivity
- ⚠️ Limited CPU (0.1) and RAM (512 MB)
- Pro plan is $25/month (more expensive than Vercel)

**Cost Estimate (60 users):**
- Hosting: **FREE** (limited tier)
- OpenAI API: ~$1-2/month
- Potential Render Pro: $25/month
- **Total: ~$1-2/month → $25-27/month if upgraded**

**Setup Time:** 10 minutes

---

### 4. AWS Lambda (Alternative)

**Tier:** Free Tier (1 million requests/month)

| Metric | Allowance |
|--------|-----------|
| Requests | 1,000,000/month |
| Compute | 400,000 GB-seconds/month |
| Bandwidth | 1 GB/month outbound |
| Cold Start | <100ms |

**Pros:**
- ✅ Same 1M requests as Vercel
- ✅ Industry standard
- ✅ Highly scalable

**Cons:**
- ⚠️ Complex setup (requires IAM, API Gateway, etc.)
- ⚠️ Harder to manage than Vercel
- ⚠️ Steeper learning curve
- ⚠️ Setup time: 30+ minutes

**Cost Estimate:** Similar to Vercel, but more complex

**Setup Time:** 30+ minutes

---

## Cost Breakdown: API Costs (The Real Expense)

**Important:** Hosting is FREE on all platforms. Your main costs are **OpenAI API calls**.

### Per-Turn Costs (OpenAI)

| Component | Model | Cost |
|-----------|-------|------|
| Transcription | gpt-4o-mini-transcribe | ~$0.001 |
| Response Generation | gpt-4.1-mini | ~$0.0005 |
| Text-to-Speech | gpt-4o-mini-tts | ~$0.0015 |
| **Total per turn** | - | **~$0.003** |

### Monthly Cost for 60 Users

**Scenario:** 60 students × 5 turns each
- Total turns: 60 × 5 = 300 turns
- Cost: 300 × $0.003 = **$0.90/month**

**Scenario:** 60 students × 10 turns each (more practice)
- Total turns: 60 × 10 = 600 turns
- Cost: 600 × $0.003 = **$1.80/month**

**Scenario:** Heavy usage (60 students × 20 turns each)
- Total turns: 60 × 20 = 1,200 turns
- Cost: 1,200 × $0.003 = **$3.60/month**

**Budget Planning:** Set a $5-10/month budget for OpenAI to be safe.

---

## Function Invocation Analysis

### How Many Invocations per User?

Each student turn triggers **3 API calls**:

1. **`/api/turn`** → Transcription + Response + TTS (1 invocation)
2. Internally calls OpenAI 3 times (transcribe, generate, speak)

So per student turn = **1 Vercel function invocation**

### Monthly Quota Check

**Vercel Free Tier: 1,000,000 invocations/month**

- 60 users × 5 turns = 300 invocations
- 60 users × 20 turns = 1,200 invocations
- 60 users × 50 turns = 3,000 invocations

✅ **Even heavy usage (3,000 invocations) is 0.3% of quota**

All platforms easily handle 60+ users.

---

## Recommended Deployment Path

### Step 1: Deploy to Vercel (5 minutes)

```bash
# Navigate to project folder
cd C:\Users\user\Downloads\USIM-Dental-Simulator-Share

# Install Vercel CLI globally
npm install -g vercel

# Login to Vercel
vercel login

# Deploy
vercel
```

### Step 2: Set Environment Variables

In Vercel Dashboard → Your Project → Settings → Environment Variables:

```
OPENAI_API_KEY=sk-proj-xxxxxx
OPENAI_TEXT_MODEL=gpt-4.1-mini
```

Select deployment environments:
- ✅ Production
- ✅ Preview
- ✅ Development

### Step 3: Test the Deployment

1. Vercel will provide a URL (e.g., `your-project.vercel.app`)
2. Open it in browser
3. Test all functions per `DEPLOYMENT_GUIDE.md` Section C

### Step 4: Monitor Usage

- **Vercel Dashboard** → Analytics
- **OpenAI Dashboard** → Billing & Usage
- Set alerts for OpenAI spending

---

## When to Upgrade (If Needed)

### Upgrade to Vercel Pro ($20/month) if:
- ⚠️ You exceed 1M function invocations/month
- ⚠️ You exceed 4 hours active CPU/month
- ⚠️ You need dedicated support
- ⚠️ You're adding team members ($20 per extra seat)

**Reality:** At 60 users, you won't hit these limits.

### Upgrade to Railway ($5 credit → pay-as-you-go) if:
- You want to scale beyond Vercel free tier
- You need faster cold starts
- You want simpler per-user billing

---

## Troubleshooting

### Problem: "Deployment failed"
- Check your `package.json` is valid
- Ensure `api/case1-prompt.txt` is included
- Verify `vercel.json` exists

### Problem: "Function runs out of memory"
- Unlikely with your simple API (< 100MB)
- Check OpenAI SDK version

### Problem: "OPENAI_API_KEY not found"
- Verify variable name spelling in Vercel dashboard
- Redeploy after adding variables
- Check that variable is assigned to Production environment

### Problem: "Cold start is too slow"
- Vercel has <100ms cold starts (good)
- Render has 30-60s cold starts (slow)
- Switch to Railway if needed

### Problem: "Costs are too high"
- Check OpenAI billing dashboard
- Verify API key isn't being used elsewhere
- Implement rate limiting before scaling

---

## Summary Table

| Feature | Vercel ⭐ | Railway | Render | AWS |
|---------|---------|---------|--------|-----|
| **Free Tier** | 1M calls | $5/mo | Hobby | 1M calls |
| **Cold Start** | <100ms | <50ms | 30-60s | <100ms |
| **Setup Time** | 5 min | 10 min | 10 min | 30+ min |
| **Best For** | This project | Scaling | Hobby | Enterprise |
| **Recommendation** | ✅ USE THIS | Good alternative | Not ideal | Overkill |

---

## Next Steps

1. **Follow `DEPLOYMENT_GUIDE.md`** Section A-B for detailed Vercel setup
2. **Set OpenAI API key** in Vercel dashboard (Section B, step 3)
3. **Run tests** in `DEPLOYMENT_GUIDE.md` Section C
4. **Monitor costs** in OpenAI dashboard
5. **Get faculty approval** before student rollout (Section D)

---

## Additional Resources

- **Vercel Docs:** https://vercel.com/docs
- **OpenAI Pricing:** https://openai.com/pricing
- **Node.js Deployment:** https://nodejs.org/docs/

---

## Questions?

Refer to the **troubleshooting section** in `DEPLOYMENT_GUIDE.md` Section E, or consult your university IT team for deployment support.

---

**Document Version:** 1.0 (November 2026)  
**Last Updated:** November 6, 2026  
**Status:** Ready for deployment
