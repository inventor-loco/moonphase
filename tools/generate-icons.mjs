#!/usr/bin/env node
import sharp from 'sharp';
import fs from 'fs';
import path from 'path';

const sizes = [192, 512];
const svgPath = path.resolve('./icon.svg');
const outputDir = path.resolve('.');

// Generate regular icons
for (const size of sizes) {
  sharp(svgPath)
    .resize(size, size)
    .png()
    .toFile(path.join(outputDir, `icon-${size}.png`))
    .then(() => console.log(`✓ Generated icon-${size}.png`))
    .catch(err => console.error(`✗ Error generating icon-${size}.png:`, err));
}

// Generate maskable icons (with padding for adaptive icons)
for (const size of sizes) {
  sharp(svgPath)
    .resize(size - 20, size - 20)
    .png()
    .toFile(path.join(outputDir, `icon-maskable-${size}.png`))
    .then(() => console.log(`✓ Generated icon-maskable-${size}.png`))
    .catch(err => console.error(`✗ Error generating icon-maskable-${size}.png:`, err));
}
