const userInput = document.getElementById('user-input');
const checkBtn = document.getElementById('check-btn');
const clearBtn = document.getElementById('clear-btn');
const resultsDiv = document.getElementById('results-div');

checkBtn.addEventListener('click', () => {
  const phoneNumber = userInput.value;

  if (phoneNumber === "") {
    alert("Please provide a phone number");
    return;
  }

  const regex = /^(1\s?)?(\(\d{3}\)|\d{3})[\s\-]?\d{3}[\s\-]?\d{4}$/;
  const isValid = regex.test(phoneNumber);

  if (isValid) {
    resultsDiv.textContent = `Valid US number: ${phoneNumber}`;
  } else {
    resultsDiv.textContent = `Invalid US number: ${phoneNumber}`;
  }
});

clearBtn.addEventListener('click', () => {
  resultsDiv.textContent = "";
  userInput.value = "";
});
