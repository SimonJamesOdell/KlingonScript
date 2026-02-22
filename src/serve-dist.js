import { createReadStream, existsSync, statSync } from "node:fs";
import { createServer } from "node:http";
import { extname, join, normalize, resolve } from "node:path";

const host = "0.0.0.0";
const port = 5200;
const root = resolve("./dist");

const mimeTypes = {
  ".html": "text/html; charset=utf-8",
  ".js": "application/javascript; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".svg": "image/svg+xml",
  ".ico": "image/x-icon"
};

function send404(res) {
  res.writeHead(404, { "Content-Type": "text/plain; charset=utf-8" });
  res.end("Not Found");
}

createServer((req, res) => {
  const urlPath = req.url?.split("?")[0] ?? "/";
  const requestedPath = urlPath === "/" ? "/warroom.html" : urlPath;
  const safePath = normalize(requestedPath).replace(/^([\\/])+/, "");
  const fullPath = join(root, safePath);

  if (!fullPath.startsWith(root)) {
    send404(res);
    return;
  }

  if (!existsSync(fullPath)) {
    send404(res);
    return;
  }

  const stats = statSync(fullPath);
  if (stats.isDirectory()) {
    send404(res);
    return;
  }

  const ext = extname(fullPath).toLowerCase();
  const mimeType = mimeTypes[ext] ?? "application/octet-stream";
  res.writeHead(200, { "Content-Type": mimeType });
  createReadStream(fullPath).pipe(res);
}).listen(port, host, () => {
  console.log(`Klingon-Script server running at http://${host}:${port}`);
  console.log(`Open http://<your-machine-ip>:${port} from other devices on your network.`);
});
