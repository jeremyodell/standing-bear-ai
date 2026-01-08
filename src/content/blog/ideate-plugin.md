---
title: "Building Team Alignment Through Code: The Ideate Plugin"
description: "How codifying workflows with Claude Code plugins transformed our team's feature development from inconsistent tribal knowledge into reliable, transferable infrastructure."
date: "2026-01-08"
author: "Jeremy Odell"
tags: ["Claude Code", "Team Workflows", "Plugin Development", "Engineering Culture"]
image: "/images/ideate-plugin-header.png"
---

![Visual showing transformation from chaotic ideas through workflow gates to structured Linear issues](/images/ideate-plugin-header.png)

## The Problem with Inconsistent Workflows

Every software team has battle-tested processes for breaking down features. Senior engineers intuitively challenge assumptions, identify dependencies, and validate scope before writing code. Yet junior engineers rarely inherit these workflows. The knowledge lives as tribal wisdom, scattered across Notion docs, or worse, trapped in experienced heads.

When that senior engineer leaves, the thoughtful approach vanishes.

Our team's feature delivery grew wildly inconsistent. Some engineers dove straight into code and discovered dependencies too late. Others over-engineered solutions, adding "might need" features that never materialized. We documented our "ideal process," but lacked enforcement.

Claude Code plugins changed this.

## What Claude Code Plugins Do

Claude Code plugins execute workflows that teach Claude your team's specific processes. They combine:

- **Commands** (slash commands like `/ideate`)
- **Skills** (teach Claude when/how to use the plugin)
- **Hooks** (intercept events to enforce rules)
- **MCP Integrations** (connect to external tools like Linear)

Traditional documentation differs fundamentally from plugins:

| Documentation | Plugins |
|---------------|---------|
| Lives in Notion/Confluence | Lives in your codebase |
| Gets stale | Git versions it |
| Suggests practices | Enforces them |
| Stays behind when people leave | Transfers with the code |

## The Ideate Plugin: Codifying Feature Development

The **ideate** plugin encodes five mandatory phases that transform ideas into validated, dependency-mapped Linear issues.

### Phase 1: Brainstorm

```bash
/ideate "Users need to know when their reports are ready"
```

The brainstorming phase uses collaborative Q&A to flesh out ideas. Claude asks probing questions:

- What triggers the notification?
- How should users receive it?
- What information should it include?
- Do privacy concerns exist?

**Key Feature**: When a feature has UI components, the workflow checks for the **frontend-designer** plugin. Without it, the workflow halts. This enforces design consistency across all features.

**Output**: `docs/features/2026-01-08-report-notifications/design.md`

### Phase 2: Pressure Test (The Secret Sauce)

Traditional workflows let you skip validation. The **ideate** plugin makes pressure testing mandatory. The design survives five challenges:

#### 1. Scope Drift Check
The plugin compares the design against the original idea:
```
Original: "Users need to know when reports are ready"

Design includes:
✓ Email notification system → directly addresses problem
✓ In-app notification badge → enhances original idea
? Report scheduling system → connection unclear
✗ Advanced analytics dashboard → scope creep
```

Every ? or ✗ item demands justification or removal. No hand-waving survives.

#### 2. Assumption Challenge
The plugin extracts key assumptions and challenges them:
```
Assumption: "Users check email regularly"
Challenge: What if users prefer Slack or SMS? Should notifications support multiple channels?

Your response: [Forces you to think through alternatives]
```

#### 3. Risk Identification
The plugin surfaces potential risks with severity ratings:
```
| Risk | Severity | Mitigation |
|------|----------|------------|
| Email deliverability | High | Use transactional service |
| Notification fatigue | Medium | Add frequency controls |
| GDPR compliance | High | Audit logging + opt-out |
```

#### 4. YAGNI Check
Mark each feature as Essential or Defer:
```
1. Email notifications → Essential
2. Slack integration → Defer to v2
3. SMS notifications → Defer to v3
4. Custom notification templates → Defer
```

Deferred items get logged but **removed from scope**. This prevents over-engineering.

#### 5. Edge Cases
The plugin forces you to consider failure modes:
```
- What happens when the email service fails?
- What happens when a user has 1000 reports ready simultaneously?
- What happens during mid-deployment?
```

**Sign-off Required**: You must explicitly confirm the design's validity. No sign-off means no planning.

**Output**: `docs/features/2026-01-08-report-notifications/pressure-test.md`

> **Key Insight**: The pressure test phase embodies a key insight: validation must come before planning, not during code review. By forcing these questions up front, the plugin prevents the "why didn't we consider X?" questions that typically surface after implementation begins.

### Phase 3: Plan

With validated design in hand, Claude creates detailed implementation steps:

```markdown
## Implementation Plan

1. Database Schema
   - Add `notifications` table
   - Add `notification_preferences` table
   - Write migration scripts

2. Backend API
   - `POST /notifications/send`
   - `GET /notifications/history`
   - Notification worker service

3. Frontend Components
   - NotificationBell component
   - NotificationList component
   - Preferences modal

4. Testing
   - Unit tests for worker
   - Integration tests for API
   - E2E tests for UI flow
```

**Output**: `docs/features/2026-01-08-report-notifications/plan.md`

### Phase 4: Stories

The plugin decomposes the plan into testable stories with **explicit dependencies**:

```markdown
## Stories

### Story 1: Database Schema
**Type**: Infrastructure
**Estimate**: 2 points
**Blocks**: Story 2, Story 3
**Tests**:
- Migration runs successfully
- Tables have correct indexes
- Foreign keys enforce relationships

### Story 2: Notification Worker Service
**Type**: Backend
**Estimate**: 5 points
**Blocked By**: Story 1
**Blocks**: Story 4
**Tests**:
- Worker picks up jobs from queue
- Failed notifications retry automatically
- Rate limiting enforces limits

### Story 3: Notification API
**Type**: Backend
**Estimate**: 3 points
**Blocked By**: Story 1
**Blocks**: Story 5
**Tests**:
- POST endpoint validates input
- GET endpoint paginates correctly
- Auth layer enforces permissions

### Story 4: Email Service Integration
**Type**: Backend
**Estimate**: 3 points
**Blocked By**: Story 2
**Tests**:
- Emails send via transactional service
- System logs bounces
- Unsubscribe links work

### Story 5: Frontend Notification Bell
**Type**: Frontend
**Estimate**: 5 points
**Blocked By**: Story 3
**Tests**:
- Badge shows count
- Dropdown displays recent notifications
- Marking as read updates state
```

**Dependency Graph Preview**: The plugin shows the dependency chain before creating issues:
```
Story 1 (Database)
├─→ Story 2 (Worker Service)
│   └─→ Story 4 (Email Integration)
└─→ Story 3 (Notification API)
    └─→ Story 5 (Frontend Bell)
```

You confirm this structure before upload.

**Output**: `docs/features/2026-01-08-report-notifications/stories.md`

> **Key Insight**: The stories phase demonstrates why dependency mapping matters early. Most teams discover blocking relationships mid-sprint, causing schedule disruption. The plugin forces this conversation before any code ships.

### Phase 5: Upload to Linear

The plugin creates Linear issues with:

1. **Parent Issue**: Feature container with overview
2. **Sub-Issues**: Individual stories as children
3. **Native Blocking Relations**: Actual Linear dependencies, not just description text
4. **Auto-Suggested Labels**: Based on story content (backend, frontend, infrastructure)
5. **Pre-Planned Label**: Automatically added (see integration below)

```
✅ Issues Created

Parent: [PROJ-100] Report Notification System
├─ [PROJ-101] Database Schema (blocks: 102, 103)
├─ [PROJ-102] Notification Worker (blocked by: 101, blocks: 104)
├─ [PROJ-103] Notification API (blocked by: 101, blocks: 105)
├─ [PROJ-104] Email Integration (blocked by: 102)
└─ [PROJ-105] Frontend Bell (blocked by: 103)
```

**Output**: Linear issues + links saved to `stories.md`

## The Power of Plugin Integration: Team-Workflow Connection

Every issue the `/ideate:upload` command creates receives a "pre-planned" label. Our **team-workflow** plugin recognizes this label.

### Without the Integration
```bash
/team:task PROJ-101  # Start working on story

# Workflow runs 5 phases:
1. Brainstorm (why do we need this?)
2. Pressure test (validate approach)
3. Plan (create implementation steps)
4. TDD (write tests first)
5. Implementation (write code)
```

### With Pre-Planned Label
```bash
/team:task PROJ-101  # Start working on story

# team-workflow sees "pre-planned" label
# Skips to phase 4:
1. TDD (write tests first)
2. Implementation (write code)
```

**Why This Matters**:
- Eliminates duplicate planning work
- The detailed story description becomes the implementation plan
- Workflow shrinks: 5 phases → 2 phases
- Handoff from ideation to execution happens seamlessly

This demonstrates **inter-plugin communication**. Two separate plugins, written at different times, work together through shared conventions (the "pre-planned" label).

> **Key Insight**: Plugin integration through conventions (like the pre-planned label) creates loose coupling between tools. No direct dependencies exist between plugins, yet they compose into a unified workflow. This mirrors Unix philosophy: small, focused tools that chain together.

## Resumability: Interrupted Workflows

Life interrupts work. Meetings disrupt flow. Deployments break focus. The **ideate** plugin saves artifacts at every checkpoint:

```
docs/features/2026-01-08-report-notifications/
├── design.md           ✓ Saved after Phase 1
├── pressure-test.md    ✓ Saved after Phase 2
├── plan.md             ✓ Saved after Phase 3
├── stories.md          ✓ Saved after Phase 4
└── ui/                 ✓ Saved during brainstorm (if applicable)
```

Resume from any point:

| If you have... | Run... |
|----------------|--------|
| Nothing | `/ideate "idea"` |
| design.md | `/ideate:pressure-test` |
| pressure-test.md (signed) | `/ideate:plan` |
| plan.md | `/ideate:stories` |
| stories.md (confirmed) | `/ideate:upload` |

## Enforcement Without Frustration

Traditional process documentation suggests practices ("you should"). The **ideate** plugin mandates them ("you must") while minimizing friction:

### Mandatory Steps
- **Pressure testing**: Cannot skip. Every idea survives validation.
- **UI design**: Features with UI require the frontend-designer plugin.
- **Sign-offs**: Cannot proceed without explicit user confirmation.

### Helpful Defaults
- Auto-suggests Linear labels based on content
- Creates parent/child issue structure automatically
- Generates dependency graphs for review
- Saves work at every checkpoint

### Clear Error Messages
```bash
❌ ERROR: frontend-designer plugin not installed

This feature has UI components. Install the plugin:
/plugin install frontend-designer@jeremyodell

Then resume with: /ideate:pressure-test
```

## Team Benefits: Beyond Individual Use

### For Junior Engineers
- Follow senior processes automatically
- Learn to challenge assumptions through guided questions
- See how experienced engineers decompose features
- Cannot skip critical validation steps

### For Senior Engineers
- Stop repeating the same planning advice
- Focus on hard problems, not reminding people about dependencies
- Review pressure-test artifacts instead of reverse-engineering decisions
- Transfer knowledge through code, not documentation

### For Engineering Managers
- Get consistent planning across the team
- See audit trails for every feature decision
- Track what gets deferred (YAGNI data)
- Gain dependency visibility from day one

### For Product Managers
- See transparent scope decisions (essential vs deferred)
- Get risk mitigation documented upfront
- Expect predictable story breakdown
- Receive clear acceptance criteria from the start

## Building Your Own Plugins: The Architecture

The **ideate** plugin demonstrates key patterns for building plugins:

### 1. Command Chaining
```
/ideate → calls → /ideate:brainstorm
                → /ideate:pressure-test
                → /ideate:plan
                → /ideate:stories
                → /ideate:upload
```

Each sub-command runs independently, enabling resumability.

### 2. Artifact Checkpointing
```typescript
// Pattern: Save work at phase boundaries
await writeArtifact('design.md', design);
await writeArtifact('pressure-test.md', pressureTest);
await writeArtifact('plan.md', plan);
```

### 3. Mandatory Gates
```yaml
# In CLAUDE.md (plugin rules)
pressure_test: MANDATORY
ui_design: REQUIRED_IF_UI
sign_offs: EXPLICIT_ONLY
```

Claude enforces these rules during execution.

### 4. Plugin Integration via Conventions
```typescript
// team-workflow checks for this label
const PRE_PLANNED_LABEL = 'pre-planned';

// ideate creates it during upload
await createOrGetLabel(PRE_PLANNED_LABEL);
await addLabelToIssue(issue.id, PRE_PLANNED_LABEL);
```

No direct coupling exists—just shared conventions.

### 5. MCP Integration
```json
{
  "mcpServers": {
    "linear": {
      "command": "npx",
      "args": ["-y", "@modelcontextprotocol/server-linear"]
    }
  }
}
```

The plugin assumes Linear MCP availability and fails gracefully without it.

## Installation and Setup

```bash
# Add marketplace
/plugin marketplace add git@github.com:jeremyodell/claude-assistant.git

# Install plugin
/plugin install ideate@jeremyodell

# Configure defaults
/ideate:setup
```

The setup command creates `.claude/ideate.local.md`:
```yaml
---
linear_team: "Engineering"
linear_project: "Product Development"
default_labels:
  - "from-ideate"
---
```

Git ignores these per-project settings for privacy.

## Real-World Impact

After three months using **ideate**:

**Before:**
- 40% of stories missing dependency info
- 60% of features experienced scope creep
- Story breakdown varied wildly by engineer
- Reviews averaged 3 "why didn't we consider X?" questions

**After:**
- 100% of stories have explicit dependencies
- 15% of features experience scope creep (tracked via YAGNI data)
- Story quality remains uniform regardless of author
- Reviews average 0.3 "why didn't we consider X?" questions (usually genuinely new information)

**Unexpected Benefits:**
- Junior engineers ship features independently within 2 weeks
- Product managers understand technical dependencies better
- "Scope change" conversations decreased mid-sprint
- Shared vocabulary emerged: "Did this get pressure-tested?" became a valid question

## The Bigger Picture: Workflows as Code

The **ideate** plugin proves a concept: **workflows as code**.

Traditional documentation:
- Lives in Notion/Confluence
- Gets stale
- Lacks enforcement
- Doesn't transfer with people

Plugins:
- Live in your codebase
- Git versions them
- Enforce themselves
- Transfer as code you can share

What other workflows could become plugins?

- **Code review processes**: Enforce checklists, auto-assign reviewers
- **Incident response**: Structure runbooks with automated status updates
- **Onboarding**: Create interactive guides that verify completion
- **Security reviews**: Mandate threat modeling for new features
- **Performance testing**: Automate benchmarking before deploys

The key insight: when workflows become code, they become **reliable, improvable, and transferable**.

## Getting Started

1. **Install the plugin**: `/plugin install ideate@jeremyodell`
2. **Run setup**: `/ideate:setup`
3. **Try the full workflow**: `/ideate "your idea here"`
4. **Customize for your team**: Edit CLAUDE.md rules
5. **Build your own plugins**: Study the pattern, adapt to your process

MIT license. Available on GitHub. Fork it, modify it, make it yours.

## Conclusion

The **ideate** plugin demonstrates that you can codify team workflows without losing flexibility. Mandatory gates ensure quality. Resumability and clear checkpoints prevent frustration.

More importantly, plugins can communicate through shared conventions. The "pre-planned" label creates seamless handoff between ideation and execution—two separate plugins, one unified experience.

Your team's best practices shouldn't live in someone's head. Make them code. Make them transferable. Make them infrastructure.

**What workflow in your team could become a plugin?**

---

**Links:**
- GitHub: [github.com/jeremyodell/claude-assistant](https://github.com/jeremyodell/claude-assistant)
- Plugin marketplace: `/plugin marketplace add git@github.com:jeremyodell/claude-assistant.git`
- Install: `/plugin install ideate@jeremyodell`

**Related Plugins:**
- **team-workflow**: TDD enforcement and quality gates
- **frontend-designer**: UI/UX design integration
- **arch-designer**: Architecture diagram generation

**About the Author:**
Jeremy Odell builds personal AI infrastructure as a software engineer. He explores how Claude Code plugins codify team practices and make workflows transferable.
