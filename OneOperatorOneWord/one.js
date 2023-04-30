// HTML elementlerini seçme
const letterInput = document.getElementById('letter');
const categorySelect = document.getElementById('category');
const startButton = document.getElementById('start-button');
const outputDiv = document.getElementById('output');
const timerDiv = document.getElementById('timer');

// Harf ve kategori değişkenleri
let letter = '';
let category = '';

// Soru değişkenleri
let wordQuestion = '';
let numbersQuestion = '';

// Cevap değişkenleri
let wordAnswer = '';
let numbersAnswer = '';

// Zamanlayıcı değişkenleri
let countdownTimer;
let timeRemaining;

// Oyunu başlatan fonksiyon
function startGame() {
  // Harf ve kategori değişkenlerini ayarlama
  letter = letterInput.value.toUpperCase();
  category = categorySelect.value;

  // Rastgele kelime ve sayılar seçme
  const words = wordBank[category][letter];
  const numbers = generateNumbers();

  // Soruları oluşturma
  wordQuestion = `Bir ${category} kelimesi bulunuz (${letter}):`;
  numbersQuestion = `Verilen sayılar (${numbers
    .slice(0, 6)
    .join(', ')}) ve hedef sayı (${
    numbers[6]
  }) ile işlem yaparak hedef sayıyı bulunuz:`;

  // Cevapları hesaplama
  wordAnswer = words[Math.floor(Math.random() * words.length)];
  numbersAnswer = calculateNumbersAnswer(numbers);

  // Zamanlayıcıyı başlatma
  timeRemaining = 60;
  countdownTimer = setInterval(updateTimer, 1000);

  // Soruları ekrana yazdırma
  outputDiv.innerHTML = `
    <h2>${wordQuestion}</h2>
    <p>${wordAnswer}</p>
    <h2>${numbersQuestion}</h2>
    <p><input id="numbers-answer" type="number"></input></p>
    <button id="submit-button" onclick="submitAnswer()">Cevabı Gönder</button>
  `;

  // Cevap input elementini seçme
  const numbersAnswerInput = document.getElementById('numbers-answer');

  // Cevap input elementine odaklanma
  numbersAnswerInput.focus();
}

// Cevabı kontrol eden fonksiyon
function submitAnswer() {
  // Cevap input elementini seçme
  const numbersAnswerInput = document.getElementById('numbers-answer');

  // Kullanıcının verdiği cevabı almak
  const userAnswer = parseInt(numbersAnswerInput.value);

  // Cevabın doğruluğunu kontrol etmek
  let message = '';
  if (userAnswer === numbersAnswer) {
    message = 'Tebrikler, cevabınız doğru!';
  } else {
    message = `Maalesef, cevabınız yanlış. Doğru cevap: ${numbersAnswer}`;
  }

  // Mesajı ve tekrar oynamak için butonu ekrana yazdırma
  outputDiv.innerHTML = `
    <h2>${message}</h2>
    <button onclick="startGame()">Tekrar Oyna</button>
  `;

  // Zamanlayıcıyı durdurma
  clearInterval(countdownTimer);
}

// Zamanlayıcıyı güncelleyen
// Game variables
let word = '';
let numbers = [];
let target = 0;
let solutions = [];

// DOM elements
const formEl = document.querySelector('form');
const startButtonEl = document.querySelector('#startButton');
const gameEl = document.querySelector('#game');
const wordInputEl = document.querySelector('#wordInput');
const numberInputsEl = document.querySelectorAll('.numberInput');
const targetInputEl = document.querySelector('#targetInput');
const solutionsEl = document.querySelector('#solutions');

// Event listeners
formEl.addEventListener('submit', handleSubmit);
startButtonEl.addEventListener('click', startGame);

// Event handlers
function handleSubmit(event) {
  event.preventDefault();
  word = wordInputEl.value.toLowerCase();
  numbers = Array.from(numberInputsEl).map((input) => Number(input.value));
  target = Number(targetInputEl.value);
  solutions = [];

  if (isValidInput()) {
    calculateSolutions();
    displaySolutions();
  }
}

function startGame() {
  gameEl.style.display = 'block';
  startButtonEl.style.display = 'none';
}

// Functions
function isValidInput() {
  if (!word || !/^[a-z]+$/.test(word)) {
    alert('Lütfen geçerli bir kelime giriniz.');
    return false;
  }
  if (!category || !/^[a-z]+$/.test(category)) {
    alert('Lütfen geçerli bir kategori seçiniz.');
    return false;
  }
  if (numbers.some((num) => num < 1 || num > 100)) {
    alert('Lütfen 1 ile 100 arasında geçerli sayılar giriniz.');
    return false;
  }
  if (target < 1 || target > 1000) {
    alert('Lütfen 1 ile 1000 arasında geçerli bir hedef sayı giriniz.');
    return false;
  }
  return true;
}

function calculateSolutions() {
  // Your solution calculation logic here
}

function displaySolutions() {
  solutionsEl.innerHTML = solutions.length
    ? solutions.map((sol) => `<li>${sol}</li>`).join('')
    : 'Bu harf ve sayılarla oluşturulacak bir çözüm bulunamadı.';
}
