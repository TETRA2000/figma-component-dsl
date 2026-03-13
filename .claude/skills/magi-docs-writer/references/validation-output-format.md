# Validation Agent Output Format

You are verifying claims from a previous documentation pass. For each claim, investigate
the referenced code independently and produce your assessment.

## File Structure

Save your output as a single markdown file:

```markdown
---
validator_id: [1 | 2 | 3]
round: [validation round number]
total_claims: [number of claims evaluated]
confirmed: [number confirmed]
rejected: [number rejected]
uncertain: [number uncertain]
---

# Validation Report — Round [N], Validator [ID]

## Claim: [Short description of the claim]

**Original Source**: [which agent(s) made this claim]
**Classification**: [partial-coverage | single-source | contradiction]

### Assessment
**Verdict**: [confirmed | rejected | partially-confirmed | uncertain]
**Confidence**: [0.0-1.0]

**Evidence**:
- `path/to/file.py:42-65` — [what you found]
- `path/to/other.ts:10-30` — [what you found]

**Reasoning**: [1-3 sentences explaining your assessment. What did you find in the code?
Does it support or contradict the claim? If partially confirmed, what part is accurate
and what part isn't?]

---

## Claim: [Next claim]
...

---

## Validator Summary

| Claim | Verdict | Confidence |
|-------|---------|-----------|
| ...   | ...     | ...       |
```

## Verdict Definitions

- **confirmed**: The code clearly supports this claim. You found direct evidence.
- **rejected**: The code contradicts this claim, or the claimed behavior/structure does not exist.
- **partially-confirmed**: Some aspects of the claim are accurate, but it's incomplete or
  contains inaccuracies. Explain which parts hold up and which don't.
- **uncertain**: You investigated but the code is ambiguous. You can neither confirm nor
  reject with confidence. This is an honest answer — don't force a verdict if the evidence
  is genuinely unclear.

## Important: Independence

Your assessment must be based on your own reading of the code. The fact that a previous agent
made a claim should not bias you toward confirming it. If you find that the code doesn't
support the claim, say so — that's exactly why this validation step exists.

Similarly, if the claim was flagged as a "contradiction" between agents, don't try to find
a middle ground. Just report what you see in the code.
