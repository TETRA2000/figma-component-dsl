# Gap Analysis — dsl-node-types

## Analysis Summary

- **Forward pipeline (Tasks 1–6, 10) is fully implemented**: All 5 new node types are working across DSL core types, factory functions, compiler, renderer, exporter, and Figma plugin. 506 tests pass including 40+ new tests for these types.
- **Reverse pipeline (Tasks 7–9) has significant gaps**: The plugin serializer, apply-changeset skill, verify-changeset skill, and validator have no support for the 5 new node types. The `PluginNodeDef` interface in `@figma-dsl/core` is missing 6 properties needed for round-trip fidelity.
- **Calibration (Task 11) not started**: No calibration categories, example files, or round-trip tests exist for new node types.
- **Risk is medium overall**: Tasks 7 and 11 follow well-established patterns (extend existing switch/dispatch). Tasks 8–9 are skill-based (AI instructions, no executable code). Task 9 (validator) is a small code change.
- **Key blocker**: `PluginNodeDef` in `plugin-types.ts` must be extended before serializer work can begin.

---

## 1. Current State — Requirement-to-Asset Map

### Fully Implemented (No Gaps)

| Requirement | Status | Assets |
|-------------|--------|--------|
| 1.1–1.8 (LINE) | Done | `types.ts`, `nodes.ts`, `compiler.ts`, `layout-resolver.ts`, `renderer.ts`, `exporter.ts`, `code.ts` |
| 2.1–2.7 (SECTION) | Done | Same pipeline files |
| 3.1–3.8 (POLYGON) | Done | Same pipeline files |
| 4.1–4.7 (STAR) | Done | Same pipeline files |
| 5.1–5.8 (BOOLEAN_OPERATION) | Done | Same pipeline files |
| 6.1–6.7 (Cross-cutting) | Done | All 5 types in NodeType, FigmaNodeType, exports verified |

### Gaps Identified

| Requirement | Gap Type | Detail |
|-------------|----------|--------|
| **7.1–7.5** (Serializer) | **Missing** | `serializer.ts` has no cases for LINE, SECTION, POLYGON, STAR, BOOLEAN_OPERATION. `SerializableNode` interface missing new properties. |
| **7.6–7.8** (Changeset paths) | **Missing** | `PluginNodeDef` in `plugin-types.ts` lacks `pointCount`, `innerRadius`, `booleanOperation`, `strokeCap`, `rotation`, `sectionContentsHidden`. Without these, serializer can't round-trip. |
| **8.1–8.7** (Apply-changeset) | **Missing** | Skill SKILL.md has no mapping rules for LINE→CSS/HR, POLYGON/STAR→SVG, BOOLEAN_OPERATION→SVG clipPath, SECTION→skip. |
| **9.1–9.4** (Verify-changeset) | **Missing** | No per-node-type similarity threshold config. Skill has fixed 0.85 threshold. |
| **10.1–10.3** (Validator) | **Missing** | `dsl-compatible-layout.ts` doesn't recognize `<svg>`, `<polygon>`, `<line>`, `<clipPath>` or CSS `border-bottom` as valid patterns. |
| **11.1–11.5** (Calibration) | **Missing** | No calibration categories (`line-shapes`, `polygon-star-shapes`, `boolean-operations`, `section-layout`). No example DSL files for new types. No round-trip test. |

---

## 2. Requirements Feasibility Analysis

### Technical Needs by Task

#### Task 7: Serializer Extension
- **Data model change**: Add 6 properties to `PluginNodeDef` (`pointCount`, `innerRadius`, `booleanOperation`, `strokeCap`, `rotation`, `sectionContentsHidden`)
- **Serializer switch**: Add 5 cases to `serializeNode()` in `serializer.ts`
- **SerializableNode**: Add corresponding properties to the interface
- **Tests**: Add tests for each new type serialization
- **Complexity**: Simple — follows exact pattern of existing IMAGE/TEXT/COMPONENT cases

#### Task 8: Apply-Changeset Skill
- **Skill update**: Add mapping rules to SKILL.md instructions
- **No code changes**: This is an AI instruction skill, not executable code
- **Mapping complexity**: LINE→CSS is straightforward; POLYGON/STAR→SVG requires vertex calculation documentation; BOOLEAN_OPERATION→SVG is complex (clipPath/compositing)
- **Complexity**: Medium — BOOLEAN_OPERATION SVG mapping is inherently complex

#### Task 9: Verify-Changeset & Validator
- **Verify skill**: Add per-node-type threshold config to SKILL.md
- **Validator code**: Small change to `dsl-compatible-layout.ts` to recognize SVG/CSS patterns
- **Complexity**: Simple — mostly documentation/instruction changes

#### Task 11: Calibration
- **Generator**: Add 4 new categories to `test-suite-generator.ts`
- **Examples**: Create 5 new `.dsl.ts` example files
- **Round-trip test**: New test file exercising compile→export→serialize→compare
- **Complexity**: Medium — generator needs category-specific DSL templates

### Constraints from Existing Architecture

1. **`PluginNodeDef` is shared across packages** — changing it in `dsl-core/plugin-types.ts` requires rebuild of exporter and plugin packages
2. **Serializer uses `SerializableNode` abstraction** — new Figma node properties (e.g., `PolygonNode.pointCount`) must be mapped through this interface, not accessed directly
3. **Skills are instruction-based** — apply-changeset and verify-changeset don't have executable code to test; changes are to AI prompt instructions only
4. **Validator uses AST analysis** — recognizing SVG elements requires JSX AST node type checks, which the existing rule infrastructure already supports

---

## 3. Implementation Approach Options

### Option A: Extend Existing Components (Recommended)

All 4 remaining tasks naturally extend existing files/patterns:

| Task | Files to Extend | Pattern |
|------|----------------|---------|
| 7 (Serializer) | `plugin-types.ts`, `serializer.ts`, `serializer.test.ts` | Add properties to interface, add switch cases (same as IMAGE) |
| 8 (Apply-changeset) | `.claude/skills/apply-changeset/SKILL.md` | Add mapping rule sections to instructions |
| 9 (Validator) | `packages/validator/src/rules/dsl-compatible-layout.ts` | Add JSX element type checks |
| 11 (Calibration) | `packages/cli/src/test-suite-generator.ts`, `examples/` | Add categories and template functions |

**Trade-offs**:
- ✅ No new files needed (except example .dsl.ts files)
- ✅ Follows all existing patterns exactly
- ✅ Minimal architecture impact
- ❌ `serializer.ts` grows by ~100 lines (acceptable — it's currently ~350 lines)

### Option B: New Components

Not warranted — no task has enough distinct responsibility to justify new modules.

### Option C: Hybrid

Not needed — Option A is sufficient for all remaining tasks.

---

## 4. Implementation Complexity & Risk

| Task | Effort | Risk | Justification |
|------|--------|------|---------------|
| **7 (Serializer)** | **S** (1–2 days) | **Low** | Extends established switch/dispatch pattern. 5 new cases following IMAGE precedent. |
| **8 (Apply-changeset)** | **S** (1 day) | **Medium** | Instruction-only changes. BOOLEAN_OPERATION→SVG mapping is complex to document accurately. No automated tests possible for skill instructions. |
| **9 (Validator)** | **S** (< 1 day) | **Low** | Small code change to one rule file. Well-understood JSX AST patterns. |
| **11 (Calibration)** | **M** (2–3 days) | **Low** | Generator templates need careful DSL construction. Round-trip test requires integration with serializer (depends on Task 7). |
| **Overall** | **M** (5–7 days) | **Medium** | Clear scope, known patterns, but Task 11.3 depends on Task 7 completion. |

### Dependency Order

```
Task 7 (PluginNodeDef + Serializer) ──┐
                                       ├── Task 11.3 (round-trip test)
Task 9 (Validator)  ──── independent   │
Task 8 (Skills)     ──── independent   │
Task 11.1–11.2 (examples/categories) ─┘
```

---

## 5. Research Items for Design Phase

| Item | Priority | Notes |
|------|----------|-------|
| **BOOLEAN_OPERATION SVG mapping** | Medium | How to represent `destination-out`/`destination-in` compositing in SVG `<clipPath>`? May need manual-review fallback. |
| **Figma SECTION serialization** | Low | Verify that `SectionNode` in Figma exposes `sectionContentsHidden` — may be `devStatus` only (current plugin code uses devStatus as proxy). |
| **Star `innerRadius` in Figma API** | Low | Confirm `StarNode.innerRadius` property name matches Figma Plugin API typings exactly. |
| **Polygon `cornerRadius` on vertices** | Low | Canvas 2D `roundRect` handles rectangular corners but polygon vertex rounding may need bezier approximation in the serializer direction. |

---

## 6. Recommendations

1. **Start with Task 7 (Serializer)** — it's the critical-path dependency for Task 11.3 round-trip tests, and unblocks full bidirectional sync
2. **Extend `PluginNodeDef` first** — this is the shared interface that both serializer and exporter consume; must be done before serializer cases
3. **Do Tasks 8–9 in parallel** — they're independent and small
4. **Task 11 last** — calibration examples and round-trip tests validate everything else works end-to-end
5. **Flag BOOLEAN_OPERATION SVG mapping as manual-review** in the apply-changeset skill — the compositing semantics don't map cleanly to static SVG
