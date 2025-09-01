// convert-heic.js
const fs = require('fs');
const path = require('path');
const heicConvert = require('heic-convert');

const inputDir = './public/shirts/';
const outputDir = './public/shirts/converted/';

fs.readdirSync(inputDir).forEach(async file => {
  if (file.toLowerCase().endsWith('.heic')) {
    const inputBuffer = fs.readFileSync(path.join(inputDir, file));

    const outputBuffer = await heicConvert({
      buffer: inputBuffer, // the HEIC file buffer
      format: 'JPEG',      // output format
      quality: 1           // best quality
    });

    const outputFile = file.replace('.HEIC', '.jpg');
    fs.writeFileSync(path.join(outputDir, outputFile), outputBuffer);
    console.log(`Converted ${file} ➜ ${outputFile}`);
  }
});
