---
name: magi-docs-writer
description: >
  Multi-pass consensus documentation generator inspired by the MAGI system — three independent
  agents analyze a codebase from different perspectives, and a master agent merges their findings
  through consensus voting to produce high-confidence, verified documentation. Use this skill
  whenever the user asks to generate documentation for a codebase, create project docs, document
  code architecture, write technical documentation, or wants comprehensive and reliable software
  documentation. Also trigger when the user mentions "magi", "consensus docs", "multi-agent
  documentation", "document this project", "generate docs", or wants documentation they can trust
  is accurate. This skill is especially valuable for large or unfamiliar codebases where a single
  pass might miss details or produce inaccuracies.
---

# MAGI Documentation Writer

A consensus-based documentation system that produces verified, high-confidence software
documentation through multi-agent analysis and iterative validation.

## Why consensus matters

A single agent documenting a codebase will inevitably miss things or misinterpret code. By having
three independent agents analyze the same codebase from different angles and then requiring
agreement before accepting a finding, we dramatically reduce hallucination and surface a more
complete picture. Think of it like code review — three reviewers catch more than one.

## Overview

The MAGI system works in four phases:

1. **Initial Scan** — Three agents independently analyze the codebase, each from a distinct perspective
2. **Consensus Merge** — A master agent compares all three documents and separates consensus from contested findings
3. **Validation Loop** — Contested findings are sent back to three new agents for independent verification, repeating until resolved or max rounds reached
4. **Final Assembly** — Produce the final documentation with confidence annotations

---

## Phase 1: Initial Scan

Launch three agents in parallel using the Agent tool. Each agent scans the codebase independently
with a different analytical lens. The different perspectives ensure that consensus is meaningful —
if three agents looking at the code from completely different angles agree on something, it's
almost certainly accurate.

### The Three Perspectives

**Agent 1 — Architect (Structure & Design)**
Focuses on: system architecture, module organization, directory structure, design patterns,
dependency relationships, data flow between components, technology stack decisions.
Asks: "How is this system built? How do the pieces fit together?"

**Agent 2 — Developer (Interface & Usage)**
Focuses on: public APIs, function signatures, configuration options, environment setup,
build/test commands, developer workflows, entry points, integration patterns.
Asks: "How do I use this? How do I set it up and work with it day-to-day?"

**Agent 3 — Analyst (Behavior & Logic)**
Focuses on: business logic, runtime behavior, error handling strategies, edge cases,
security considerations, performance characteristics, data validation rules.
Asks: "What does this code actually do? What happens when things go wrong?"

### Launching the Agents

For each agent, use the Agent tool with a prompt structured like this:

```
You are the [Architect/Developer/Analyst] agent in a multi-agent documentation system.

Your job: Independently analyze the codebase at [path] and produce documentation focused on
your perspective — [perspective description].

IMPORTANT RULES:
- Work independently. Do not assume what other agents will cover.
- Only document what you can verify from the code. If you're unsure, say so.
- Assign a confidence score (0.0-1.0) to each section based on how certain you are.
- Cite evidence: reference specific files and line numbers.

Read the reference file at [skill-path]/references/agent-output-format.md for the exact
output format to follow.

Explore the codebase thoroughly. Read key files, trace dependencies, understand the structure.
Then produce your documentation.

Save your output to: [workspace]/phase-1/agent-[1|2|3]-[role].md
```

Launch all three agents in the same turn so they run in parallel.

### Workspace Setup

Create a workspace directory for the documentation process:
```
[project]-magi-docs/
├── phase-1/           # Initial agent outputs
├── phase-2/           # Consensus merge results
├── validation/        # Validation round outputs
│   ├── round-1/
│   ├── round-2/
│   └── round-3/
└── final/             # Final assembled documentation
```

---

## Phase 2: Consensus Merge

Once all three agents complete, the master (you) reads all three documents and performs the merge.

### Step 1: Topic Alignment

First, build a map of topics across all three documents. Agents will use different terminology
for the same concept — this is expected and actually valuable (it confirms understanding from
multiple angles).

To align topics:
- Read through each agent's section headers and content summaries
- Group sections that describe the same component, feature, or concept
- A topic may appear as "Authentication Module" in one doc and "Auth & Session Management" in another — these are the same topic
- Create a topic inventory: a list of unique topics with which agents covered each

### Step 2: Classify Each Topic

For each topic in the inventory, classify it:

**Full Consensus (3/3 agents agree):**
All three agents independently documented this topic, and their descriptions are consistent
(they don't contradict each other). Accept this into the master doc.
- Merge the three descriptions into one comprehensive section
- Aggregate confidence: average of the three agents' confidence scores, with a floor of 0.7
- Keep the best evidence citations from all three

**Partial Coverage (2/3 agents agree):**
Two agents documented this, one didn't (or one contradicts the others). Move to pending doc.
- Note which agents covered it and which didn't
- Note whether the missing agent simply omitted it (gap) or actively contradicted it (conflict)

**Single Source (1/3 agents):**
Only one agent documented this. Move to pending doc.
- Could be a genuine finding that others missed, or could be a hallucination
- Note the source agent and its confidence score

**Contradiction:**
Two or more agents make conflicting claims about the same topic. Move to pending doc with
high priority.
- Document the specific contradiction
- This is the most important category to resolve

### Step 3: Produce the Documents

Create two files:

**Master Doc** (`phase-2/master-doc.md`):
Contains all full-consensus sections, properly merged and organized.

**Pending Doc** (`phase-2/pending-doc.md`):
Contains all contested items, structured for validation. For each item, include:
- The claim or topic to validate
- Source agent(s) and their confidence
- Classification (partial coverage / single source / contradiction)
- Specific code areas to investigate (file paths from the original agents' evidence)

---

## Phase 3: Validation Loop

The pending doc contains items that need independent verification. Launch three new agents
to investigate each pending item.

### How Validation Works

For each validation round:

1. **Launch 3 validation agents in parallel.** Each agent receives:
   - The list of claims to verify (from the pending doc)
   - The relevant file paths to investigate
   - But NOT the original agents' full descriptions — to avoid confirmation bias

   The validation prompt should be:
   ```
   You are a validation agent in a multi-agent documentation system.

   Your job: Independently verify the following claims about the codebase at [path].
   For each claim, investigate the referenced code and determine:
   - Is this claim accurate? (yes / no / partially)
   - What is your confidence? (0.0-1.0)
   - What evidence supports your assessment? (file paths, line numbers)

   IMPORTANT: Form your own independent assessment. Do not try to guess what the
   "expected" answer is. If you think a claim is wrong, say so.

   Claims to verify:
   [list of pending items with code references]

   Read the reference file at [skill-path]/references/validation-output-format.md for
   the exact output format.

   Save your output to: [workspace]/validation/round-[N]/validator-[1|2|3].md
   ```

2. **Master reviews validation results** using the same consensus rules:
   - 3/3 validators confirm a claim → accepted into master doc
   - 3/3 validators reject a claim → rejected (removed from pending)
   - Mixed results → remains pending for next round
   - For contradictions: if validators agree on one side → resolved in favor of that side

3. **Update the pending doc** with remaining unresolved items and move to next round.

### Convergence Rules

- **Maximum rounds**: 3 (configurable by user). After max rounds, remaining items go to
  the "unresolved" section of the final doc with documented uncertainty.
- **Early termination**: If a round resolves zero new items, stop — further rounds won't help.
- **Escalation**: Items that remain contradicted after 2 rounds get flagged for human review
  with both sides of the argument presented.

---

## Phase 4: Final Assembly

Produce the final documentation with clear confidence annotations.

### Document Structure

Assemble the final doc at `final/DOCUMENTATION.md` with this structure:

```markdown
# [Project Name] Documentation
> Generated by MAGI Documentation System
> Consensus rounds: [N] | Date: [date]
> Overall confidence: [weighted average across all sections]

## Table of Contents
[auto-generated]

---

[For each section:]

## [Section Title]
**Confidence**: [score] | **Consensus**: Full / Majority / Unresolved
**Sources**: Architect, Developer, Analyst (or subset)

[Content — merged from consensus sources, written in clear technical prose]

---

## Appendix: Documentation Confidence Report

### Methodology
[Brief explanation of the MAGI consensus process]

### Confidence Summary
| Section | Confidence | Consensus Level | Rounds to Resolve |
|---------|-----------|----------------|-------------------|
| ...     | ...       | ...            | ...               |

### Unresolved Items
[Any items that didn't reach consensus after all rounds, with both sides presented]
```

### Confidence Scoring Guide

| Score Range | Meaning |
|------------|---------|
| 0.9 - 1.0 | All agents agreed immediately with high individual confidence |
| 0.7 - 0.9 | Full consensus, moderate individual confidence or resolved after 1 validation round |
| 0.5 - 0.7 | Majority agreement after validation; some uncertainty remains |
| 0.3 - 0.5 | Contested — included with caveats, may need human verification |
| 0.0 - 0.3 | Low confidence — flagged for human review |

### Writing the Final Prose

When merging agent descriptions into final documentation:
- Use the Architect's structural framing as the backbone
- Integrate the Developer's practical details (APIs, setup, usage)
- Weave in the Analyst's behavioral insights (what actually happens at runtime)
- Remove redundancy but preserve nuance — if agents described the same thing differently, the differences often add value
- Keep evidence citations (file paths, line numbers) as footnotes or inline references

---

## Progress Reporting

Throughout the process, keep the user informed at natural milestones:

1. After Phase 1: "Three agents have completed their analysis. Agent confidence scores: Architect [X], Developer [Y], Analyst [Z]. Moving to consensus merge."
2. After Phase 2: "Consensus merge complete. [N] sections accepted, [M] items pending validation. Starting validation round 1."
3. After each validation round: "Round [N] complete. [X] items resolved, [Y] remaining. [continuing / stopping because ...]"
4. After Phase 4: "Documentation complete. Overall confidence: [X]. [N] sections at full consensus, [M] at majority, [K] flagged for human review."

---

## Customization Options

The user can adjust these parameters:

- **Target scope**: Which parts of the codebase to document (default: entire project)
- **Max validation rounds**: How many rounds before giving up on pending items (default: 3)
- **Confidence threshold**: Minimum confidence to accept without validation (default: requires 3/3 consensus regardless of confidence)
- **Output format**: Markdown (default), or other formats if requested
- **Focus areas**: The user can ask agents to pay special attention to specific aspects

---

## Reference Files

Read these as needed during execution:

- `references/agent-output-format.md` — Structured format for initial scan agents
- `references/validation-output-format.md` — Structured format for validation agents
