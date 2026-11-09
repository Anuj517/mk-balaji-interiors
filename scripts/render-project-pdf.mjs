import { copyFile, mkdir, readFile, writeFile } from "node:fs/promises";
import os from "node:os";
import path from "node:path";
import { createCanvas, DOMMatrix, ImageData, Path2D } from "@napi-rs/canvas";
import * as pdfjs from "pdfjs-dist/legacy/build/pdf.mjs";
import sharp from "sharp";

globalThis.DOMMatrix ??= DOMMatrix;
globalThis.ImageData ??= ImageData;
globalThis.Path2D ??= Path2D;

const source =
  process.argv[2] ?? String.raw`C:\Users\Anuj\Downloads\Completed-Project_work.pdf`;
const output = path.join(os.tmpdir(), "mk-balaji-project-pdf-review");
const projectRoot = path.resolve("public", "assets", "projects");
await mkdir(output, { recursive: true });

const pageCategories = [
  "wall-decoration",
  "living-room",
  "tv-units",
  "kitchen",
  "kitchen",
  "furniture",
  "furniture",
  "tv-units",
  "tv-units",
  "wall-decoration",
  "wall-decoration",
];
const categoryTitles = {
  "living-room": "Living Room",
  "tv-units": "TV Units",
  ceiling: "Ceiling",
  kitchen: "Kitchen",
  "wall-decoration": "Wall Decoration",
  furniture: "Furniture",
  other: "Other Work",
};
const photoCounts = new Map();
const inventory = [
  ["Filename", "Original PDF page", "Assigned category", "Image dimensions"],
];

const document = await pdfjs.getDocument({
  data: new Uint8Array(await readFile(source)),
  useSystemFonts: true,
}).promise;
const pageFiles = [];

for (let pageNumber = 1; pageNumber <= document.numPages; pageNumber += 1) {
  const page = await document.getPage(pageNumber);
  const viewport = page.getViewport({ scale: 2 });
  const canvas = createCanvas(Math.ceil(viewport.width), Math.ceil(viewport.height));
  const context = canvas.getContext("2d");
  await page.render({
    canvasContext: context,
    canvas,
    viewport,
    background: "#ffffff",
  }).promise;

  const filename = path.join(output, `page-${String(pageNumber).padStart(2, "0")}.png`);
  await sharp(canvas.toBuffer("image/png")).png().toFile(filename);
  pageFiles.push(filename);
  const category = pageCategories[pageNumber - 1] ?? "other";
  const photoNumber = (photoCounts.get(category) ?? 0) + 1;
  photoCounts.set(category, photoNumber);

  const categoryFolder = path.join(projectRoot, category);
  await mkdir(categoryFolder, { recursive: true });
  const imageName = `${category}-${String(photoNumber).padStart(2, "0")}.webp`;
  const imagePath = path.join(categoryFolder, imageName);
  await sharp(filename)
    .trim({ background: "#ffffff", threshold: 22 })
    .webp({ quality: 90, effort: 5 })
    .toFile(imagePath);
  const { width, height } = await sharp(imagePath).metadata();
  inventory.push([
    `public/assets/projects/${category}/${imageName}`,
    String(pageNumber),
    categoryTitles[category] ?? "Other Work",
    `${width}x${height}`,
  ]);
  console.log(
    `Page ${pageNumber}: ${categoryTitles[category] ?? "Other Work"} -> ${imageName} (${width}x${height})`,
  );
  page.cleanup();
}

const cellWidth = 250;
const cellHeight = 350;
const columns = 4;
const rows = Math.ceil(pageFiles.length / columns);
const composites = await Promise.all(
  pageFiles.map(async (filename, index) => {
    const image = await sharp(filename)
      .resize(cellWidth - 12, cellHeight - 38, { fit: "contain", background: "#fff" })
      .png()
      .toBuffer();
    const label = Buffer.from(
      `<svg width="${cellWidth}" height="28"><rect width="100%" height="100%" fill="#722f37"/><text x="12" y="20" fill="#ffffff" font-family="Arial" font-size="15" font-weight="700">PDF page ${index + 1}</text></svg>`,
    );
    return {
      input: await sharp({
        create: {
          width: cellWidth,
          height: cellHeight,
          channels: 3,
          background: "#ffffff",
        },
      })
        .composite([
          { input: image, left: 6, top: 28 },
          { input: label, left: 0, top: 0 },
        ])
        .png()
        .toBuffer(),
      left: (index % columns) * cellWidth,
      top: Math.floor(index / columns) * cellHeight,
    };
  }),
);

const contactSheet = path.join(output, "contact-sheet.png");
await sharp({
  create: {
    width: columns * cellWidth,
    height: rows * cellHeight,
    channels: 3,
    background: "#ffffff",
  },
})
  .composite(composites)
  .png()
  .toFile(contactSheet);

console.log(`Contact sheet: ${contactSheet}`);
await writeFile(
  path.join(projectRoot, "project-image-inventory.csv"),
  `${inventory.map((row) => row.map(csvEscape).join(",")).join("\r\n")}\r\n`,
  "utf8",
);
await mkdir(path.resolve("public", "downloads"), { recursive: true });
await copyFile(
  source,
  path.resolve("public", "downloads", "completed-project-work.pdf"),
);
console.log(`Inventory: ${path.join(projectRoot, "project-image-inventory.csv")}`);

function csvEscape(value) {
  return `"${value.replaceAll('"', '""')}"`;
}
