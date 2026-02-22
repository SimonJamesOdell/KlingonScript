import test from "node:test";
import assert from "node:assert/strict";
import { spawnSync } from "node:child_process";
import { mkdtempSync, writeFileSync } from "node:fs";
import { join } from "node:path";
import { tmpdir } from "node:os";

function runCli(args) {
  return spawnSync(process.execPath, ["./src/cli.js", ...args], {
    cwd: process.cwd(),
    encoding: "utf8"
  });
}

test("check command passes for valid input", () => {
  const result = runCli(["check", "./examples/counter.ks"]);

  assert.equal(result.status, 0);
  assert.match(result.stdout, /OK:/);
});

test("check command fails for invalid input", () => {
  const tempDir = mkdtempSync(join(tmpdir(), "klingon-script-"));
  const filePath = join(tempDir, "invalid.ks");
  writeFileSync(filePath, "Daq (HIja) {\n  jatlh('Qapla');\n", "utf8");

  const result = runCli(["check", filePath]);

  assert.equal(result.status, 1);
  assert.match(result.stderr, /Klingon-Script syntax error:/);
});

test("check command emits json on success", () => {
  const result = runCli(["check", "./examples/counter.ks", "--json"]);

  assert.equal(result.status, 0);
  const payload = JSON.parse(result.stdout);
  assert.equal(payload.ok, true);
  assert.equal(payload.command, "check");
  assert.match(payload.file, /counter\.ks$/);
});

test("check command emits json diagnostics on syntax error", () => {
  const tempDir = mkdtempSync(join(tmpdir(), "klingon-script-"));
  const filePath = join(tempDir, "invalid-json.ks");
  writeFileSync(filePath, "vIt x = (1 + 2];", "utf8");

  const result = runCli(["check", filePath, "--json"]);

  assert.equal(result.status, 1);
  const payload = JSON.parse(result.stderr);
  assert.equal(payload.ok, false);
  assert.equal(payload.error.name, "KlingonScriptSyntaxError");
  assert.equal(payload.error.file, filePath);
  assert.equal(payload.error.line, 1);
  assert.match(payload.error.message, /Mismatched closing '\]'/);
});
