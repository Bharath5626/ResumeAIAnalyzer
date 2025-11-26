import pdf from "pdf-poppler";
import path from "path";
import fs from "fs";
import { fileURLToPath } from "url";


// Recreate __dirname
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);


// List of resume PDFs and their output prefixes
const files = [
  { filename: "Classic_Clean.pdf", prefix: "classic" },
  { filename: "Creative Left Sidebar.pdf", prefix: "sidebar" },
  { filename: "Two Column Modern.pdf", prefix: "two-column" },
  { filename: "Corporate Executive.pdf", prefix: "executive" },
  { filename: "Modern Blue Accent.pdf", prefix: "modern-blue" }
];

// Base paths
const inputDir = path.resolve(__dirname, "../public/templates");
const outputDir = path.resolve(__dirname, "../public/thumbnails");

// Ensure output directory exists
if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

// Convert each PDF
files.forEach(({ filename, prefix }) => {
  const filePath = path.join(inputDir, filename);
  const opts = {
    format: "png",
    out_dir: outputDir,
    out_prefix: prefix,
    page: 1
  };

  pdf.convert(filePath, opts)
    .then(() => {
      console.log(`Thumbnail for ${filename} generated successfully!`);
    })
    .catch(err => {
      console.error(`Error generating thumbnail for ${filename}:`, err);
    });
});
