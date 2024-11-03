const fs = require('fs');
const path = require('path');
const directoryToWatch = './Zadania';
const logFile = 'file-changes.log';
if (!fs.existsSync(directoryToWatch)) {
  fs.mkdirSync(directoryToWatch);
  console.log(`Utworzono katalog: ${directoryToWatch}`);
}
function writeLog(message) {
  fs.appendFile(logFile, `${new Date().toISOString()} - ${message}\n`, err => {
    if (err) console.error('Błąd zapisu logu:', err);
  });
}
fs.watch(directoryToWatch, (eventType, filename) => {
  if (filename) {
    const action = eventType === 'rename' ? (fs.existsSync(path.join(directoryToWatch, filename)) ? 'dodano' : 'usunięto') : 'zmieniono';
    console.log(`${action} plik: ${filename}`);
    writeLog(`${action} plik: ${filename}`);
  }
});
console.log(`Monitoring zmian w katalogu: ${directoryToWatch}`);