let myForm = document.getElementById('myForm');
let textInput = document.getElementById('inputNumber');
let errorDiv = document.getElementById('error');
let myUl = document.getElementById('results');
let frmLabel = document.getElementById('formLabel');

function fibonacci(num) {
    if (num == 1) return 1;
    if (num == 2) return 1;
    return fibonacci(num - 1) + fibonacci(num - 2);
}

function isPrime(num) {return num % 2 != 0 || num === 2;}

if (myForm) {
    myForm.addEventListener('submit', (event) => {
    event.preventDefault();
    if (textInput.value.trim()) {
      textInput.classList.remove('inputClass');
      errorDiv.hidden = true;
      frmLabel.classList.remove('error');
      let li = document.createElement('li');
      fibResult = "The Fibonacci of " + textInput.value + " is " + fibonacci(textInput.value);
      if(isPrime(fibonacci(textInput.value))){li.classList.add('is-prime')}else{li.classList.add('not-prime')};
      li.innerHTML = fibResult;
      myUl.appendChild(li);
      myForm.reset();
      textInput.focus();
    } else {
      textInput.value = '';
      errorDiv.hidden = false;
      errorDiv.innerHTML = 'You must enter a value';
      frmLabel.classList.add('error');
      textInput.classList.add('inputClass');
    }
  });
}