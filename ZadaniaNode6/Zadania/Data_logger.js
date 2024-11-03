const fs = require('fs').promises;
const readline = require('readline').createInterface({
  input: process.stdin,
  output: process.stdout
});
const askQuestion = (questionText) => new Promise((resolve) => readline.question(questionText, resolve));
(async () => {
  try {
    const imie = await askQuestion('Podaj imię: ');
    const nazwisko = await askQuestion('Podaj nazwisko: ');
    const wiek = parseInt(await askQuestion('Podaj wiek: '), 10);
    const userData = { imie, nazwisko, wiek };

    await fs.writeFile('dane.json', JSON.stringify(userData, null, 2));
    console.log('Dane zapisane do pliku dane.json.');
    const parsedData = JSON.parse(await fs.readFile('dane.json', 'utf-8'));
    console.log('Odczytane dane:', parsedData);
  } catch (error) {
    console.error('Wystąpił błąd:', error);
  } finally {
    readline.close();
  }
})();
