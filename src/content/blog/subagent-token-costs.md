---
title: "I Wasted 20% of My AI Quota on 100 Lines of Code"
description: "How nested AI agents turned simple tasks into a quota apocalypse"
date: "2026-01-05"
author: "Jeremy Odell"
tags: ["Claude Code", "AI Development", "Token Optimization", "Cost Analysis"]
image: "/images/claude-agents-tokens.png"
---

# I Wasted 20% of My AI Quota on 100 Lines of Code

*How nested AI agents turned simple tasks into a quota apocalypse*

![Token costs visualization showing nested agent overhead](/images/claude-agents-tokens.png)

## The First Warning Sign

I built a Claude Code plugin to orchestrate parallel development. Feed it a parent ticket with sub-tasks, and it spawns AI agents to work on independent tasks simultaneously. Ship faster, right?

I tested it on three simple tickets:
- **Task A**: Add cross-org search API (1 query function)
- **Task B**: Add 3 fields to a TypeScript type
- **Task C**: Create a scheduled Lambda

Total complexity? Maybe 100 lines of code. A senior dev knocks this out before lunch.

### The Bill: Round 1

**Expected:** ~1.5 million tokens
**Actual:** 4 million tokens (2.7x overhead)

Enough quota wasted to ship 3-4 real features.

*(For context: On API pricing, this would be $15-20 on Sonnet or $75-100 on Opus. On my $200/month Claude Max plan, this represents wasted quota I could have used for actual complex work.)*

I thought it was a fluke. So I investigated, wrote up my findings, and decided to test it on something bigger.

## Then I Did It Again

Same day. Different feature with 12 sub-tasks. Surely the efficiency would improve at scale?

### The Bill: Round 2

**Expected:** ~6 million tokens
**Actual:** 15-25 million tokens (2.5-4x overhead)

**Wall time:** 15 minutes to complete all 12 tasks.
**Quota impact:** 15-20% of my monthly quota - gone.
**Result:** Hit my rate limit. Couldn't work for hours.

*(For context: On API pricing, this would be $45-75 on Sonnet or $225-375 on Opus.)*

But here's the thing: it wasn't a fluke. The overhead was *consistent*.

| Session | Tasks | Expected | Actual | Overhead |
|---------|-------|----------|--------|----------|
| Test run | 3 | 1.5M | 4M | **2.7x** |
| Feature X | 12 | 6M | 15-25M | **2.5-4x** |

**The pattern held.** Whether you run 3 tasks or 12 tasks, you pay 2.5-4x more than you should.

## What Went Wrong

I dug into the plugin architecture. Here's what happened:

**Expected:** Three agents, each with ~500k token budget. Parallel execution, shared cost. Total: ~1.5M tokens.

**Reality:** Each agent ran a full workflow with phases: brainstorm → plan → implement → **quality gate**. That quality gate spawned a code review agent. *Inside each subagent.*

![Nested agents problem visualization showing expected vs actual agent spawning](/images/nested-agents-problem.png)

Three agents became six. Each with full context duplication.

For the 12-task session? **12 task agents + 12 review agents = 24 total agents.**

## Why This Costs So Much

AI agents aren't threads. They're not lightweight. Every subagent gets:
- Full system prompt (~15k tokens)
- All plugin instructions (~50k tokens)
- Project context (CLAUDE.md, recent git history) (~5k tokens)
- Conversation history

That's ~70-80k tokens just to *spawn*. Before doing any work.

Then there's the **triangle accumulation problem**. Every tool call includes all previous context:

```
Call 1:  80k context
Call 2:  85k context
Call 3:  90k context
...
Call 30: 230k context
```

For a 30-call task, token consumption looks like:
```
(80k + 230k) × 30 / 2 ≈ 4.6M tokens
```

Per agent.

**Nest agents inside agents?** Multiply that by 2. Run 12 tasks with nested agents? You're looking at 24 agents × 2-4M tokens each.

## The Real Kicker

My tasks were *trivial*. Task B was literally "add 3 fields to a TypeScript interface."

But the workflow didn't know that. Every task got the enterprise treatment:
- **Brainstorm phase**: "Consider 2-3 alternative approaches" (for adding 3 fields?)
- **Planning phase**: "Create acceptance criteria" (for adding 3 fields?)
- **Quality gate**: Spawn a fresh code review agent (for adding 3 fields?)

The 3-line change got the same ceremony as a complete feature rewrite.

## The Speed vs Cost Tradeoff

Here's the uncomfortable truth: the plugin *did* deliver value.

**15 minutes to complete 12 issues.** Full TDD. Tests passing. PRs created. Tickets updated in Linear.

Manually? That's a full day of work. Maybe two.

But look at the cost:

| Approach | Time | Tokens | Quota Impact | API Cost (ref) |
|----------|------|--------|--------------|----------------|
| Manual (me coding) | 4-8 hours | ~0 | 0% | $0 |
| Optimal (smart routing) | 30-60 min | ~2M | ~2-3% | ~$6-8 |
| Actual (nested workflow) | 15 min | 15-25M | **15-20%** | **$45-75** |

**I burned 15-20% of my monthly quota for 15 minutes of work.** That's quota I could have used to ship 8-10 real features.

Is that worth it? Depends:
- **If you're racing a deadline:** Absolutely. Ship 12 features in 15 minutes.
- **If you're quota-conscious:** Hell no. That's 7-12x more quota than optimal.
- **If you're doing this daily:** You'll hit rate limits constantly and burn through your entire monthly quota in days.

## The Lessons

### 1. Subagents Are Not Free Parallelism

Sequential: 1 agent × 12 tasks ≈ 6M tokens
Parallel: 12 agents × 1 task ≈ 6M tokens

**Same cost.** Parallel is just faster, not cheaper.

But nested agents? 24 agents ≈ 15-25M tokens. You're paying 3-4x overhead for architectural complexity.

### 2. Complexity Should Gate Workflow

Not every task needs:
- Design brainstorming
- Detailed planning
- Independent code review

A smart orchestrator would detect: "This is 10 lines of code. Skip the ceremony."

### 3. Never Nest Agents

If Agent A spawns Agent B, you've doubled your context cost.
If Agent B spawns Agent C? Tripled.

Code review inside a subagent should run inline, not spawn another agent.

### 4. Batch Trivial Work

Three simple tasks shouldn't need three agents. One agent doing all three sequentially costs the same and avoids coordination overhead.

### 5. Context Compaction is a Red Flag

The 12-task session hit the context limit and compacted *twice*. That means the orchestrator conversation was bloated by verbose agent outputs.

When agents return full tool traces to the parent, you get context bloat at both levels. That's the triangle problem happening recursively.

## The Fix

I'm updating the plugin with complexity scoring:

```typescript
if (task.estimatedLines < 50 && task.files < 3) {
  // Skip brainstorm/plan phases
  // Run code review inline (no nested agent)
  // Consider batching with other simple tasks
}
```

Simple tasks get simple treatment. Complex tasks get the full workflow.

And I'm adding a `--cost-optimized` flag that batches trivial work into single agents instead of spawning one per task.

## The Uncomfortable Truth

Subagents are powerful. Parallel execution is valuable. But the cost model is brutal if you don't understand it.

**The speed premium is real:** I paid 7-12x more to go 2-4x faster.

That's a valid tradeoff if:
- You value speed over cost
- The tasks are complex enough to justify full workflows
- You're aware of the cost and accept it

It's a *terrible* tradeoff if:
- You're running this at scale (dozens of features)
- Tasks are simple (like adding fields)
- You're optimizing for cost efficiency

## The Takeaway

Know your tools. Measure before you scale.

And for the love of tokens, **don't let your agents have children**.

| Approach | Tokens | Quota Impact | When to Use |
|----------|--------|--------------|-------------|
| Sequential, no workflow | ~1.5M | ~2% | Everyday work |
| Parallel, no nesting | ~1.5M | ~2% | Parallel features, time-sensitive |
| Nested workflow (current) | ~4-25M | ~5-20% | Never (until fixed) |
| Optimal (smart routing) | ~500k-2M | ~0.5-2% | Always (when available) |

*(API pricing reference: $2-8 optimal vs $15-75 actual)*

The difference between optimal and what I ran? **8x overhead** on small tasks, **7-12x overhead** at scale.

That's the difference between 2% quota and 20% quota for the same work.

Choose wisely.

---

*Have you hit any surprising AI costs? I'd love to hear your war stories. Connect with me on [LinkedIn](https://linkedin.com/in/yourprofile) or check out more at [standingbear.ai](https://standingbear.ai).*
