const textInput = document.getElementById('text-input');
const checkBtn = document.getElementById('check-btn');
const result = document.getElementById('result');

checkBtn.addEventListener('click', () => {
  const inputValue = textInput.value;

  if (inputValue === "") {
    alert("Please input a value");
    return;
  }

  const cleanedValue = inputValue.toLowerCase().replace(/[^a-z0-9]/g, "");
  const reversedValue = cleanedValue.split("").reverse().join("");

  if (cleanedValue === reversedValue) {
    result.textContent = `${inputValue} is a palindrome`;
  } else {
    result.textContent = `${inputValue} is not a palindrome`;
  }
});

