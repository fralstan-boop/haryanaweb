const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const dir = path.join(__dirname, '../public/images/hayaosint');
const files = ['forestbg', 'leftsoldier', 'rightsoldier'];

(async () => {
  for (const f of files) {
    const pngPath = path.join(dir, f + '.png');
    const webpPath = path.join(dir, f + '.webp');
    if (fs.existsSync(pngPath)) {
      await sharp(pngPath).webp({ quality: 80 }).toFile(webpPath);
      fs.unlinkSync(pngPath);
      console.log(`Converted and removed ${f}.png`);
    } else {
      console.log(`File ${f}.png not found.`);
    }
  }
  console.log('All image conversions complete.');
})();
