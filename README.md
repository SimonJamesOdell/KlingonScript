# Klingon-Script (MVP)

Klingon-Script is a public demonstration of a practical claim: with modern LLM assistance, a programmer can quickly become productive in unfamiliar codebases and unfamiliar languages—even intentionally niche ones.

## Disclaimer

This software is 100% AI-generated and has not been human inspected.

It is provided "as is", without warranty or guarantee of any kind, express or implied, including but not limited to warranties of merchantability, fitness for a particular purpose, non-infringement, correctness, reliability, safety, or performance.

No representation is made regarding applicability or suitability for any given problem, use case, environment, or regulatory context.

Klingon-Script is a new language concept: write JavaScript-like code with Klingon keywords, then transpile it to standard JavaScript for browsers or Node.js.

This repository contains a minimal, working compiler path:

1. Write `*.ks` files
2. Compile with CLI
3. Run output JavaScript in a web app

In your intended workflow, an LLM can generate the Klingon-Script source and hand it to this compiler. The compiler produces JavaScript/HTML artifacts for web app deployment.

## Why this project matters

- It shows that language novelty is no longer a hard barrier to building real software.
- It demonstrates a human + LLM workflow where the human sets intent and constraints, while the model accelerates implementation details.
- It highlights that strong compiler checks and project guardrails are essential for safe LLM-assisted development.
- It provides a concrete example that "any codebase, any language" can be a realistic engineering posture.

## Why this MVP design

- Practical: ships quickly and works now
- Extensible: easy to add grammar later
- Web-ready: output is plain JavaScript modules

## Language invariants

Klingon-Script is designed as an abstraction firewall: users should not directly manipulate the symbolic substrate of programs.

See [docs/language-invariants.md](docs/language-invariants.md) for the non-negotiable rules that should guide compiler and tooling changes.

## Current language mapping

| Klingon-Script | JavaScript |
|---|---|
| `pat` | `function` |
| `Qap` | `return` |
| `Daq` | `if` |
| `Daqbe` | `else` |
| `loQ` | `while` |
| `waQ` | `for` |
| `vIt` | `let` |
| `maH` | `const` |
| `jatlh` | `console.log` |
| `chegh` | `await` |
| `pej` | `break` |
| `mevyap` | `continue` |
| `pagh` | `null` |
| `ghobe` | `false` |
| `HIja` | `true` |

## Quick start

```bash
npm install
npm run build:example
```

War Room demo:

```bash
npm run check:warroom
npm run build:warroom
```

This generates:
- `dist/counter.js`
- `dist/counter.html`

Then open `dist/counter.html` in a browser.

## CLI

```bash
node ./src/cli.js build <input.ks> -o <output.js> [--html]
node ./src/cli.js check <input.ks>
node ./src/cli.js check <input.ks> --json
```

## Diagnostics (for LLM output quality)

The compiler now validates core syntax structure before writing output:

- balanced `()`, `{}`, `[]`
- unterminated strings
- unterminated multi-line comments
- line/column error reporting with source pointer
- supports Klingon-style identifiers containing apostrophes (for example `mI'`)

This makes LLM-driven codegen safer by failing fast when malformed output is produced.

Recommended pipeline for LLM-generated Klingon source:

1. Generate `.ks` with the LLM
2. Run `klingon-script check` to validate syntax
3. Run `klingon-script build` only on validated input

For orchestration systems, add `--json` to receive machine-readable success/error payloads.

## Suggested roadmap

1. Add a real parser and AST (instead of keyword replacement only)
2. Add diagnostics with line/column errors
3. Add package system and standard library for web/server
4. Add formatter and language server support for VS Code
5. Add battle tests (property tests + browser integration tests)
