# Agent Output Format — Initial Scan

Follow this format exactly when producing your documentation. This structured format enables
the master agent to compare your findings with other agents and build consensus.

## File Structure

Save your output as a single markdown file with the following structure:

```markdown
---
agent_role: [Architect | Developer | Analyst]
codebase_path: [path to the codebase analyzed]
overall_confidence: [0.0-1.0, your overall confidence in this document]
total_sections: [number of sections]
---

# [Project Name] — [Role] Analysis

## Summary
[2-3 sentence overview of the project from your perspective]

---

## Section: [Descriptive Topic Name]

**Confidence**: [0.0-1.0]
**Evidence**:
- `path/to/file.py:42-65` — [brief description of what this code shows]
- `path/to/other.ts:10-30` — [brief description]

[Your documentation content for this topic. Be specific and factual.
Reference the evidence above. If you're uncertain about something, say
"appears to" or "likely" rather than stating it as definitive fact.]

---

## Section: [Next Topic]
...
```

## Guidelines for Writing Sections

### What makes a good section
- **One clear topic** per section. Don't combine unrelated things.
- **Verifiable claims.** Every statement should trace back to code you actually read.
- **Honest confidence.** Rate your confidence based on:
  - 0.9-1.0: You read the code, it's clear, you're sure
  - 0.7-0.9: You read the code, the logic is complex but your interpretation is solid
  - 0.5-0.7: You read the code but it's ambiguous or you're inferring behavior
  - 0.3-0.5: You're extrapolating from limited evidence
  - Below 0.3: You're mostly guessing — consider omitting instead

### Section naming
Use descriptive names that identify the component or concept:
- Good: "Authentication Flow via JWT", "Database Migration System", "Error Handling Strategy"
- Bad: "Section 1", "Important Code", "Miscellaneous"

Consistent naming helps the master agent align topics across agents. Use the most common or
obvious name for each component.

### Evidence requirements
- At minimum, cite one file path per section
- For complex topics, cite the key files that support your description
- Include line numbers or line ranges when possible
- Briefly note what each piece of evidence demonstrates

### What to include vs. omit

**Include:**
- Things you directly observed in the code
- Architecture or patterns that are clearly present
- Configuration or setup that's documented in the code or config files

**Omit:**
- Speculation about intent that isn't supported by code or comments
- Generic best-practice advice that isn't specific to this codebase
- Things you'd need to run the code to verify (unless you did run it)
