#!/usr/bin/env node
import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { KlingonScriptSyntaxError, transpileKlingonScript } from "./transpile.js";

function usage() {
  console.log(`Klingon-Script CLI

Usage:
  klingon-script build <input.ks> -o <output.js> [--html]
  klingon-script check <input.ks> [--json]

Examples:
  klingon-script build ./examples/counter.ks -o ./dist/counter.js --html
  klingon-script check ./examples/counter.ks
  klingon-script check ./examples/counter.ks --json
`);
}

function parseArgs(argv) {
  const [command, input, ...rest] = argv;
  if (!command || command === "--help" || command === "-h") {
    return { help: true };
  }

  const options = {
    command,
    input,
    output: null,
    html: false,
    json: false
  };

  for (let index = 0; index < rest.length; index += 1) {
    const arg = rest[index];
    if (arg === "-o" || arg === "--out") {
      options.output = rest[index + 1];
      index += 1;
      continue;
    }

    if (arg === "--html") {
      options.html = true;
    }

    if (arg === "--json") {
      options.json = true;
    }
  }

  return options;
}

function wrapHtml(jsPath) {
  const scriptName = jsPath.split(/[\\/]/).pop();
  return `<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>Klingon-Script App</title>
  </head>
  <body>
    <h1 id="title">Qapla' from Klingon-Script</h1>
    <button id="btn">Click</button>
    <p id="count">0</p>
    <script type="module" src="./${scriptName}"></script>
  </body>
</html>
`;
}

function ensureDir(filePath) {
  mkdirSync(dirname(filePath), { recursive: true });
}

function formatSyntaxError(error, source) {
  const lines = source.split(/\r?\n/);
  const errorLine = lines[error.line - 1] ?? "";
  const pointer = " ".repeat(Math.max(error.column - 1, 0)) + "^";

  return [
    `Klingon-Script syntax error: ${error.message}`,
    ` at line ${error.line}, column ${error.column}`,
    ` ${errorLine}`,
    ` ${pointer}`
  ].join("\n");
}

function formatSyntaxErrorJson(error, source, inputPath) {
  const lines = source.split(/\r?\n/);
  const errorLine = lines[error.line - 1] ?? "";

  return JSON.stringify({
    ok: false,
    error: {
      name: error.name,
      message: error.message,
      line: error.line,
      column: error.column,
      file: inputPath,
      sourceLine: errorLine
    }
  });
}

function main() {
  const args = parseArgs(process.argv.slice(2));

  if (args.help) {
    usage();
    process.exit(0);
  }

  if (!args.input || (args.command !== "build" && args.command !== "check")) {
    usage();
    process.exit(1);
  }

  if (args.command === "build" && !args.output) {
    usage();
    process.exit(1);
  }

  const inputPath = resolve(args.input);

  const source = readFileSync(inputPath, "utf8");
  let compiled;
  try {
    compiled = transpileKlingonScript(source);
  } catch (error) {
    if (error instanceof KlingonScriptSyntaxError) {
      if (args.json) {
        console.error(formatSyntaxErrorJson(error, source, inputPath));
      } else {
        console.error(formatSyntaxError(error, source));
      }
      process.exit(1);
    }

    throw error;
  }

  if (args.command === "check") {
    if (args.json) {
      console.log(JSON.stringify({ ok: true, command: "check", file: inputPath }));
    } else {
      console.log(`OK: ${inputPath}`);
    }
    process.exit(0);
  }

  const outputPath = resolve(args.output);

  ensureDir(outputPath);
  writeFileSync(outputPath, compiled, "utf8");

  if (args.html) {
    const htmlPath = outputPath.replace(/\.js$/, ".html");
    writeFileSync(htmlPath, wrapHtml(outputPath), "utf8");
  }

  if (args.json) {
    const payload = {
      ok: true,
      command: "build",
      input: inputPath,
      output: outputPath
    };

    if (args.html) {
      payload.html = outputPath.replace(/\.js$/, ".html");
    }

    console.log(JSON.stringify(payload));
  } else {
    console.log(`Built: ${outputPath}`);
  }
}

main();
