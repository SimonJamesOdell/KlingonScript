import test from "node:test";
import assert from "node:assert/strict";
import { KlingonScriptSyntaxError, transpileKlingonScript } from "../src/transpile.js";

test("transpiles klingon keywords", () => {
  const source = "vIt x = 1; Daq (x > 0) { jatlh(x); }";
  const compiled = transpileKlingonScript(source);

  assert.equal(compiled, "let x = 1; if (x > 0) { console.log(x); }");
});

test("does not replace inside strings", () => {
  const source = 'jatlh("vIt Daq Qap")';
  const compiled = transpileKlingonScript(source);

  assert.equal(compiled, 'console.log("vIt Daq Qap")');
});

test("supports apostrophes in identifiers", () => {
  const source = "vIt mI' = 2; pat yIghur'() { Qap mI' + 1; }";
  const compiled = transpileKlingonScript(source);

  assert.equal(compiled, "let mI__ = 2; function yIghur__() { return mI__ + 1; }");
});

test("throws line/column for unclosed delimiters", () => {
  const source = "Daq (HIja) {\n  jatlh('Qapla');\n";

  assert.throws(
    () => transpileKlingonScript(source),
    (error) => {
      assert.ok(error instanceof KlingonScriptSyntaxError);
      assert.equal(error.line, 1);
      assert.equal(error.column, 12);
      return true;
    }
  );
});

test("throws on mismatched closing token", () => {
  const source = "vIt x = (1 + 2];";

  assert.throws(
    () => transpileKlingonScript(source),
    (error) => {
      assert.ok(error instanceof KlingonScriptSyntaxError);
      assert.match(error.message, /Mismatched closing '\]'/);
      return true;
    }
  );
});
