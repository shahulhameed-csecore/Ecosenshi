const tips = [
    "Fix leaking taps to save water.",
    "Take shorter showers.",
    "Use a broom instead of a hose to clean driveways.",
    "Water your garden in the early morning or late evening.",
    "Install water-efficient showerheads.",
    "Collect rainwater for watering plants.",
    "Only run the dishwasher and washing machine with full loads.",
    "Use mulch in your garden to retain moisture.",
    "Don’t let the water run while brushing your teeth.",
    "Educate others about the importance of saving water."
];

const tipList = document.getElementById('tipList');
const newTipInput = document.getElementById('newTipInput');
const newTipBtn = document.getElementById('newTipBtn');
const addTipBtn = document.getElementById('addTipBtn');
const waterCalcForm = document.getElementById('waterCalcForm');
const calcResult = document.getElementById('calcResult');

// Load saved tips from local storage
document.addEventListener('DOMContentLoaded', () => {
    const savedTips = JSON.parse(localStorage.getItem('tips')) || [];
    savedTips.forEach(tip => addTipToDOM(tip));
    displayRandomTip();
});

// Display a random tip
function displayRandomTip() {
    const randomIndex = Math.floor(Math.random() * tips.length);
    const tip = tips[randomIndex];
    addTipToDOM(tip);
}

// Add tip to DOM
function addTipToDOM(tip) {
    const li = document.createElement('li');
    li.textContent = tip;
    tipList.appendChild(li);
}

// Add a user-generated tip
addTipBtn.addEventListener('click', () => {
    const userTip = newTipInput.value.trim();
    if (userTip) {
        addTipToDOM(userTip);
        saveTipToLocalStorage(userTip);
        newTipInput.value = '';
    }
});

// Save tip to local storage
function saveTipToLocalStorage(tip) {
    const savedTips = JSON.parse(localStorage.getItem('tips')) || [];
    savedTips.push(tip);
    localStorage.setItem('tips', JSON.stringify(savedTips));
}

// Display a new random tip
newTipBtn.addEventListener('click', () => {
    tipList.innerHTML = ''; // Clear existing tips
    displayRandomTip();
});

// Water usage calculator
waterCalcForm.addEventListener('submit', (event) => {
    event.preventDefault();
    const dailyUsage = parseFloat(document.getElementById('dailyUsage').value);
    const days = parseInt(document.getElementById('days').value);
    const totalUsage = dailyUsage * days;
    calcResult.textContent = `Estimated water usage over ${days} days: ${totalUsage.toFixed(2)} liters`;
    calcResult.classList.remove('hidden');
});
