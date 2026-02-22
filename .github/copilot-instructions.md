# Workspace Copilot Instructions

- Do not edit generated artifacts in `dist/**`.
- Implement gameplay and UI changes in source files only:
  - `examples/**/*.ks`
  - `examples/**/warroom.html` (source HTML only)
  - `src/**` for compiler/build infrastructure.
- Use compiler changes only to increase Klingon-Script expressivity or correctness.
- When compiler is changed, update/add tests.
- Rebuild artifacts; do not hand-edit generated files.
- Validate with:
  - `npm run check:warroom`
  - `npm run build:warroom`
