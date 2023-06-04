// Generate a random number between 1 and 100
var randomNumber = Math.floor(Math.random() * 100) + 1;

// Function to check the player's guess
function checkGuess() {
  var guessInput = document.getElementById('guessInput');
  var guess = parseInt(guessInput.value);

  var message = document.getElementById('message');

  if (isNaN(guess) || guess < 1 || guess > 100) {
    message.textContent = 'Lütfen 1 ile 100 arası bir sayı giriniz.';
  } else if (guess === randomNumber) {
    alert('Tebrikler, Bildiniz! ');
  } else if (guess < randomNumber) {
    message.textContent = 'Çok Küçük!';
  } else {
    message.textContent = 'Çok Büyük!';
  }

  guessInput.value = '';
  guessInput.focus();
}
function restart() {
  button = document.getElementById('restart');
  location.reload();
}
