const readline = require('readline');
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});
const askQuestion = (questionText) => new Promise((resolve) => rl.question(questionText, resolve));
function calculateAsync(a, b, operation) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      let result;
      if (operation === 'dodawanie') {
        result = a + b;
      } else if (operation === 'mnożenie') {
        result = a * b;
      } else {
        return reject(new Error('Nieznana operacja matematyczna!'));
      }
      resolve(result);
    }, 1000);
  });
}
(async () => {
  try {
    const num1 = parseFloat(await askQuestion('Podaj pierwszą liczbę: '));
    const num2 = parseFloat(await askQuestion('Podaj drugą liczbę: '));
    const operation = await askQuestion('Wybierz operację (dodawanie/mnożenie): ');
    const result = await calculateAsync(num1, num2, operation);
    console.log(`Wynik operacji ${operation}: ${result}`);
  } catch (error) {
    console.error('Wystąpił błąd:', error.message);
  } finally {
    rl.close();
  }
})();
