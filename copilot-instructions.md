# KlingonScript Agent Rules (Persistent)

These rules are mandatory for all AI/code-assistant edits in this workspace.

## Source of Truth

- Primary editable game/application sources are under `examples/**` and `src/**`.
- Generated output under `dist/**` is build artifact only.

## Hard Prohibitions

- NEVER edit any file under `dist/**` directly.
- NEVER use `dist/**` as implementation source.
- NEVER add gameplay/UI logic by patching generated files.

## Allowed Edit Scope

- Modify `*.ks` files for gameplay/UI behavior.
- Modify compiler/transpiler files under `src/**` only when KS expressivity requires it.
- Modify build scripts to copy/compile from source to `dist/**`.

## Build Discipline

- Treat `examples/**` (including `examples/warroom/warroom.html`) as source-of-truth.
- Regenerate `dist/**` only via build commands.
- After changes, run:
  1. `npm run check:warroom`
  2. `npm run build:warroom`

## Session Guardrail

Before applying patches, the assistant must confirm:

1. No target file path is inside `dist/**`.
2. If change is UI/gameplay, change must be in `.ks` or source HTML under `examples/**`.
3. If compiler change is made, include test coverage update.

If a user request conflicts with these rules, ask for explicit override before proceeding.
