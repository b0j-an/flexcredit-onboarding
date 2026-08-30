import { PDFDocument } from 'pdf-lib';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function generatePdf() {
  const pdfDoc = await PDFDocument.create();
  const slidesDir = path.resolve(__dirname, 'public/assets/slides');

  for (let i = 1; i <= 18; i++) {
    const slideNum = String(i).padStart(2, '0');
    const slidePath = path.join(slidesDir, `slide-${slideNum}.png`);

    if (fs.existsSync(slidePath)) {
      const imgBytes = fs.readFileSync(slidePath);
      const pngImage = await pdfDoc.embedPng(imgBytes);
      const { width, height } = pngImage;

      const page = pdfDoc.addPage([width, height]);
      page.drawImage(pngImage, {
        x: 0,
        y: 0,
        width,
        height,
      });
      console.log(`Added slide-${slideNum}.png (${width}x${height})`);
    } else {
      console.warn(`Missing ${slidePath}`);
    }
  }

  const pdfBytes = await pdfDoc.save();
  const outputPath = path.resolve(__dirname, 'public/FlexCredit-Dobrodoslica.pdf');
  fs.writeFileSync(outputPath, pdfBytes);
  console.log(`Successfully generated: ${outputPath} (${(pdfBytes.length / (1024 * 1024)).toFixed(2)} MB)`);
}

generatePdf().catch(console.error);
