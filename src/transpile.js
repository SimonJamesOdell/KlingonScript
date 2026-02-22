import { keywordMap } from "./keywordMap.js";

export class KlingonScriptSyntaxError extends Error {
  constructor(message, line, column) {
    super(`${message} at ${line}:${column}`);
    this.name = "KlingonScriptSyntaxError";
    this.line = line;
    this.column = column;
  }
}

function isIdentifierStart(char) {
  return /[A-Za-z_]/.test(char);
}

function isIdentifierPart(char) {
  return /[A-Za-z0-9_']/.test(char);
}

function nextPosition(char, line, column) {
  if (char === "\n") {
    return { line: line + 1, column: 1 };
  }

  return { line, column: column + 1 };
}

function syntaxError(message, line, column) {
  return new KlingonScriptSyntaxError(message, line, column);
}

function normalizeIdentifier(token) {
  return token.replaceAll("'", "__");
}

export function transpileKlingonScript(input) {
  let output = "";
  let index = 0;
  let line = 1;
  let column = 1;

  let inSingleLineComment = false;
  let inMultiLineComment = false;
  let inSingleQuoteString = false;
  let inDoubleQuoteString = false;
  let inTemplateString = false;
  let multiLineCommentStart = null;
  let singleQuoteStart = null;
  let doubleQuoteStart = null;
  let templateStart = null;

  const openStack = [];
  const openerFor = {
    ")": "(",
    "}": "{",
    "]": "["
  };

  while (index < input.length) {
    const current = input[index];
    const next = input[index + 1];

    if (inSingleLineComment) {
      output += current;
      const pos = nextPosition(current, line, column);
      line = pos.line;
      column = pos.column;
      if (current === "\n") {
        inSingleLineComment = false;
      }
      index += 1;
      continue;
    }

    if (inMultiLineComment) {
      output += current;
      if (current === "*" && next === "/") {
        output += next;
        const posCurrent = nextPosition(current, line, column);
        const posNext = nextPosition(next, posCurrent.line, posCurrent.column);
        line = posNext.line;
        column = posNext.column;
        index += 2;
        inMultiLineComment = false;
        multiLineCommentStart = null;
      } else {
        const pos = nextPosition(current, line, column);
        line = pos.line;
        column = pos.column;
        index += 1;
      }
      continue;
    }

    if (inSingleQuoteString) {
      output += current;
      if (current === "\\") {
        output += next || "";
        const posCurrent = nextPosition(current, line, column);
        const posNext = nextPosition(next || "", posCurrent.line, posCurrent.column);
        line = posNext.line;
        column = posNext.column;
        index += 2;
        continue;
      }
      if (current === "'") {
        inSingleQuoteString = false;
        singleQuoteStart = null;
      }
      const pos = nextPosition(current, line, column);
      line = pos.line;
      column = pos.column;
      index += 1;
      continue;
    }

    if (inDoubleQuoteString) {
      output += current;
      if (current === "\\") {
        output += next || "";
        const posCurrent = nextPosition(current, line, column);
        const posNext = nextPosition(next || "", posCurrent.line, posCurrent.column);
        line = posNext.line;
        column = posNext.column;
        index += 2;
        continue;
      }
      if (current === '"') {
        inDoubleQuoteString = false;
        doubleQuoteStart = null;
      }
      const pos = nextPosition(current, line, column);
      line = pos.line;
      column = pos.column;
      index += 1;
      continue;
    }

    if (inTemplateString) {
      output += current;
      if (current === "\\") {
        output += next || "";
        const posCurrent = nextPosition(current, line, column);
        const posNext = nextPosition(next || "", posCurrent.line, posCurrent.column);
        line = posNext.line;
        column = posNext.column;
        index += 2;
        continue;
      }
      if (current === "`") {
        inTemplateString = false;
        templateStart = null;
      }
      const pos = nextPosition(current, line, column);
      line = pos.line;
      column = pos.column;
      index += 1;
      continue;
    }

    if (current === "/" && next === "/") {
      output += "//";
      const posCurrent = nextPosition(current, line, column);
      const posNext = nextPosition(next, posCurrent.line, posCurrent.column);
      line = posNext.line;
      column = posNext.column;
      index += 2;
      inSingleLineComment = true;
      continue;
    }

    if (current === "/" && next === "*") {
      output += "/*";
      multiLineCommentStart = { line, column };
      const posCurrent = nextPosition(current, line, column);
      const posNext = nextPosition(next, posCurrent.line, posCurrent.column);
      line = posNext.line;
      column = posNext.column;
      index += 2;
      inMultiLineComment = true;
      continue;
    }

    if (current === "'") {
      output += current;
      inSingleQuoteString = true;
      singleQuoteStart = { line, column };
      const pos = nextPosition(current, line, column);
      line = pos.line;
      column = pos.column;
      index += 1;
      continue;
    }

    if (current === '"') {
      output += current;
      inDoubleQuoteString = true;
      doubleQuoteStart = { line, column };
      const pos = nextPosition(current, line, column);
      line = pos.line;
      column = pos.column;
      index += 1;
      continue;
    }

    if (current === "`") {
      output += current;
      inTemplateString = true;
      templateStart = { line, column };
      const pos = nextPosition(current, line, column);
      line = pos.line;
      column = pos.column;
      index += 1;
      continue;
    }

    if (current === "(" || current === "{" || current === "[") {
      openStack.push({ token: current, line, column });
      output += current;
      const pos = nextPosition(current, line, column);
      line = pos.line;
      column = pos.column;
      index += 1;
      continue;
    }

    if (current === ")" || current === "}" || current === "]") {
      const expectedOpen = openerFor[current];
      const actualOpen = openStack.pop();
      if (!actualOpen || actualOpen.token !== expectedOpen) {
        throw syntaxError(`Mismatched closing '${current}'`, line, column);
      }

      output += current;
      const pos = nextPosition(current, line, column);
      line = pos.line;
      column = pos.column;
      index += 1;
      continue;
    }

    if (isIdentifierStart(current)) {
      let end = index + 1;
      while (end < input.length && isIdentifierPart(input[end])) {
        end += 1;
      }

      const token = input.slice(index, end);
      const mapped = keywordMap[token];
      output += mapped ?? normalizeIdentifier(token);
      for (let posIndex = index; posIndex < end; posIndex += 1) {
        const pos = nextPosition(input[posIndex], line, column);
        line = pos.line;
        column = pos.column;
      }
      index = end;
      continue;
    }

    output += current;
    const pos = nextPosition(current, line, column);
    line = pos.line;
    column = pos.column;
    index += 1;
  }

  if (inMultiLineComment && multiLineCommentStart) {
    throw syntaxError("Unterminated multi-line comment", multiLineCommentStart.line, multiLineCommentStart.column);
  }

  if (inSingleQuoteString && singleQuoteStart) {
    throw syntaxError("Unterminated single-quoted string", singleQuoteStart.line, singleQuoteStart.column);
  }

  if (inDoubleQuoteString && doubleQuoteStart) {
    throw syntaxError("Unterminated double-quoted string", doubleQuoteStart.line, doubleQuoteStart.column);
  }

  if (inTemplateString && templateStart) {
    throw syntaxError("Unterminated template string", templateStart.line, templateStart.column);
  }

  if (openStack.length > 0) {
    const unclosed = openStack[openStack.length - 1];
    throw syntaxError(`Unclosed '${unclosed.token}'`, unclosed.line, unclosed.column);
  }

  return output;
}
