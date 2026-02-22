# Klingon-Script Language Invariants

This document defines the non-negotiable design constraints for Klingon-Script.

## Core Goal

Klingon-Script exists to prevent users from directly manipulating the symbolic substrate of programs.

Users should express intent and outcomes, while the language and compiler control low-level representation and execution details.

## Non-Negotiable Invariants

1. **No raw substrate access**
   - No arbitrary reflection, `eval`-style execution, dynamic code generation, or host runtime escape hatches.
   - No direct mutation of compiler-internal structures or generated runtime scaffolding.

2. **Intent-first semantics**
   - Surface syntax expresses domain intent (actions, state transitions, outcomes), not host-language mechanisms.
   - Low-level mechanism should be encapsulated in compiler/runtime primitives.

3. **Bounded mutability**
   - Mutation must be explicit, constrained, and statically checkable.
   - Reassignment and state updates should fail fast at compile time when violating mutability rules.

4. **Deterministic execution model**
   - Language-level behavior must not depend on hidden host object identity tricks or prototype mutation.
   - Equivalent source should yield equivalent semantics regardless of host runtime quirks.

5. **Capability-based interop**
   - Interop with host APIs is allowed only through explicit, approved capabilities.
   - Interop surfaces must be narrow, auditable, and deny-by-default.

6. **Compiler-enforced safety over convention**
   - Prohibited patterns are rejected by parser/static analysis/transpiler checks.
   - Safety must not rely on style guides alone.

## Implications for Compiler and Tooling

- Add static checks for substrate-leak patterns (dynamic property probes, reflective access, dynamic symbol construction where disallowed).
- Strengthen diagnostics around mutability (`maH` / `vIt`) to prevent runtime "assignment to constant" failures.
- Add an interop allowlist model (approved globals/modules/APIs only).
- Emit diagnostics with clear remediation steps in Klingon-Script terms.

## Definition of Done for New Language Features

A feature is acceptable only if it:

- Preserves all invariants above,
- Does not introduce new substrate escape routes,
- Is enforceable by compiler/lint checks,
- Has tests covering both allowed and disallowed usage.

## Governance Rule

When expressivity conflicts with abstraction boundaries, **abstraction boundaries win**.
