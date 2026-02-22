import { cpSync, existsSync, mkdirSync, readFileSync, readdirSync, statSync, writeFileSync } from "node:fs";
import { dirname, resolve } from "node:path";

const source = resolve("./examples/warroom/warroom.html");
const target = resolve("./dist/warroom.html");
const musicSourceDir = resolve("./examples/warroom/music");
const musicTargetDir = resolve("./dist/warroom/music");
const playlistTarget = resolve("./dist/warroom/music/playlist.json");

const html = readFileSync(source, "utf8");
mkdirSync(dirname(target), { recursive: true });
writeFileSync(target, html, "utf8");

console.log(`Copied: ${source} -> ${target}`);

function listMp3RelativePaths(rootDir, baseDir = rootDir) {
	if (!existsSync(rootDir)) {
		return [];
	}

	const entries = readdirSync(rootDir);
	const results = [];

	for (const entry of entries) {
		const abs = resolve(rootDir, entry);
		const info = statSync(abs);
		if (info.isDirectory()) {
			results.push(...listMp3RelativePaths(abs, baseDir));
			continue;
		}

		if (!entry.toLowerCase().endsWith(".mp3")) {
			continue;
		}

		const rel = abs.slice(baseDir.length + 1).replaceAll("\\", "/");
		results.push(rel);
	}

	return results.sort((a, b) => a.localeCompare(b));
}

mkdirSync(musicTargetDir, { recursive: true });

if (existsSync(musicSourceDir)) {
	cpSync(musicSourceDir, musicTargetDir, { recursive: true, force: true });
}

const tracks = listMp3RelativePaths(musicSourceDir);
writeFileSync(playlistTarget, JSON.stringify({ tracks }, null, 2), "utf8");
console.log(`Wrote playlist: ${playlistTarget} (${tracks.length} tracks)`);
