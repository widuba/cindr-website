import { existsSync, readFileSync, readdirSync, statSync } from "node:fs";
import { dirname, join, resolve } from "node:path";

const root = resolve(import.meta.dirname, "..");
const htmlFiles = [];

function walk(directory) {
  for (const name of readdirSync(directory)) {
    if (name === ".git" || name === "node_modules") continue;
    const path = join(directory, name);
    if (statSync(path).isDirectory()) walk(path);
    else if (name.endsWith(".html")) htmlFiles.push(path);
  }
}

walk(root);
const errors = [];

for (const file of htmlFiles) {
  const source = readFileSync(file, "utf8");
  const label = file.slice(root.length + 1);
  if (!/<html\s+lang="en"/.test(source)) errors.push(`${label}: missing language`);
  if (!/<title>[^<]+<\/title>/.test(source)) errors.push(`${label}: missing title`);
  if (!/name="viewport"/.test(source)) errors.push(`${label}: missing viewport`);

  const references = [...source.matchAll(/(?:href|src)="(\/[^"#?]+)"/g)].map((match) => match[1]);
  for (const reference of references) {
    let target = join(root, reference);
    if (reference.endsWith("/")) target = join(target, "index.html");
    if (!existsSync(target)) errors.push(`${label}: broken local reference ${reference}`);
  }
}

const config = readFileSync(join(root, "assets/js/site-config.js"), "utf8");
if (config.includes("YOUR-DOMAIN.example")) {
  console.warn("NOTE: replace YOUR-DOMAIN.example in assets/js/site-config.js before public launch.");
}

if (errors.length) {
  console.error(errors.join("\n"));
  process.exit(1);
}

console.log(`Verified ${htmlFiles.length} HTML pages and their local asset links.`);
