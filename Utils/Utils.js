const fs = require('fs/promises');

async function ReadFile(path) {
  const data = await fs.readFile(path, 'utf-8');
  return JSON.parse(data);
}

module.exports = {
    ReadFile,
};