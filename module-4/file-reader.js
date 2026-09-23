const fs = require('fs/promises');
const path = require('path');

async function main() {
  const args = process.argv.slice(2);
  if (args.length === 0) {
    console.log('Usage: node file-reader.js <filename>');
    process.exit(1);
  }

  const filename = args[0];
  const filePath = path.join(__dirname, filename);

  try {
    const content = await fs.readFile(filePath, 'utf-8');
    const stats = await fs.stat(filePath);
    const lineCount = content.split('\n').length;

    console.log('File contents:');
    console.log(content);
    console.log(`File size: ${stats.size} bytes`);
    console.log(`Number of lines: ${lineCount}`);
  } catch (err) {
    console.error('Error reading file:', err.message);
  }
}

main();